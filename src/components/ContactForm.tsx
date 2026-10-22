"use client";

import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  CONTACT_TOPICS,
  ContactInput,
  ContactValues,
  MESSAGE_MAX,
  TOPIC_LABELS,
  contactSchema,
  type ContactTopic,
} from "@/lib/contact-schema";
import { CheckCircle, CircleNotch, Handshake, Lightbulb, LinkBreak, PaperPlaneTilt, ChatCircleDots, type Icon } from "@/components/icons";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TOPIC_ICONS: Record<ContactTopic, Icon> = {
  resource: Lightbulb,
  "broken-link": LinkBreak,
  partnership: Handshake,
  other: ChatCircleDots,
};

const invalidClass = "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/40";
const fieldClass = `h-11 rounded-lg bg-background text-base sm:text-sm ${invalidClass}`;

function ContactForm() {
  const honeypotRef = useRef<HTMLInputElement>(null);
  const form = useForm<ContactInput, unknown, ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { topic: "resource", name: "", email: "", message: "" },
  });
  const { isSubmitting, isSubmitSuccessful } = form.formState;
  const messageLength = form.watch("message")?.length ?? 0;

  const onSubmit = async (values: ContactValues) => {
    let res: Response;
    try {
      res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypotRef.current?.value ?? "" }),
      });
    } catch {
      toast.error("Network error. Check your connection and try again.");
      throw new Error("network");
    }
    if (res.ok) return;

    if (res.status === 400) {
      // The server runs the same schema; surface its field errors next to the inputs.
      const data = (await res.json().catch(() => null)) as { fields?: Partial<Record<keyof ContactInput, string[]>> } | null;
      Object.entries(data?.fields ?? {}).forEach(([field, messages]) => {
        if (messages?.[0]) form.setError(field as keyof ContactInput, { message: messages[0] });
      });
    }
    toast.error(
      res.status === 429
        ? "Too many messages sent. Please try again in a few minutes."
        : res.status === 400
          ? "Please fix the highlighted fields."
          : "Your message could not be sent. Please try again."
    );
    // Keep the form editable so the user can retry.
    throw new Error("contact submission failed");
  };

  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border bg-card p-6 sm:p-8" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle size={28} weight="duotone" />
        </span>
        <div>
          <h2 className="text-xl font-bold">Message sent, thank you!</h2>
          <p className="mt-1 text-muted-foreground">We read every message. If we need more details we’ll reply by email.</p>
        </div>
        <Button
          variant="outline"
          onClick={() => form.reset({ topic: form.getValues("topic"), name: form.getValues("name"), email: form.getValues("email"), message: "" })}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={(e) => form.handleSubmit(onSubmit)(e).catch(() => undefined)}
        className="relative flex flex-col gap-6 rounded-2xl border bg-card p-5 sm:p-7"
      >
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <fieldset>
                <legend className="mb-2.5 text-sm font-medium">What is it about?</legend>
                <div className="grid grid-cols-2 gap-2">
                  {CONTACT_TOPICS.map((topic) => {
                    const TopicIcon = TOPIC_ICONS[topic];
                    const checked = field.value === topic;
                    return (
                      <label
                        key={topic}
                        className={cn(
                          "flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                          checked ? "border-primary bg-primary/[0.06] text-primary" : "hover:border-primary/40 hover:bg-accent"
                        )}
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={topic}
                          checked={checked}
                          onChange={() => field.onChange(topic)}
                          onBlur={field.onBlur}
                          className="sr-only"
                        />
                        <TopicIcon size={18} weight={checked ? "fill" : "duotone"} aria-hidden className="shrink-0" />
                        <span className="leading-tight">{TOPIC_LABELS[topic]}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" placeholder="Your name" className={fieldClass} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" inputMode="email" autoComplete="email" placeholder="name@example.com" className={fieldClass} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-baseline justify-between gap-3">
                <FormLabel>Message</FormLabel>
                <span
                  aria-live="polite"
                  className={cn("text-xs tabular-nums text-muted-foreground", messageLength > MESSAGE_MAX && "font-semibold text-destructive")}
                >
                  {messageLength} / {MESSAGE_MAX}
                </span>
              </div>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Which module, which link, what should we add…"
                  className={`min-h-[9rem] resize-y rounded-lg bg-background text-base leading-relaxed sm:text-sm ${invalidClass}`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input ref={honeypotRef} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <Button type="submit" disabled={isSubmitting} className="h-11 gap-2 rounded-lg text-base sm:w-fit sm:px-6">
          {isSubmitting ? (
            <CircleNotch size={18} weight="bold" className="animate-spin" aria-hidden />
          ) : (
            <PaperPlaneTilt size={18} weight="duotone" aria-hidden />
          )}
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>
      </form>
    </Form>
  );
}

export default ContactForm;

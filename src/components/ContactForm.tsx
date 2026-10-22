"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ContactValues, contactSchema } from "@/lib/contact-schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

type Props = {};

function ContactForm({}: Props) {
  const honeypotRef = useRef<HTMLInputElement>(null);
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const onSubmit = async (values: ContactValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, website: honeypotRef.current?.value ?? "" }),
      });
      if (res.ok) {
        toast.success("Message sent, thank you!");
        return;
      }
      const message =
        res.status === 429 ? "Too many messages sent. Please try again in a few minutes." : "Your message could not be sent. Please try again.";
      toast.error(message);
    } catch {
      toast.error("Network error. Check your connection and try again.");
    }
    // Keep the form editable so the user can retry.
    throw new Error("contact submission failed");
  };

  return (
    <section className="w-full  h-full grid  lg:grid-cols-2">
      <Form {...form}>
        <form onSubmit={(e) => form.handleSubmit(onSubmit)(e).catch(() => undefined)} className="relative space-y-8 max-w-xl  h-full w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" placeholder="your name" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
                  <Input type="email" autoComplete="email" placeholder="your email" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Leave us a message.." {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display Message.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="website">Website</label>
            <input ref={honeypotRef} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <Button disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful} className={`${form.formState.isSubmitSuccessful ? "bg-green-600 hover:bg-green-500 dark:text-white" : "disabled:cursor-not-allowed"} gap-x-6 `} size={"full"} variant={`default`} type="submit">
            Submit
            <div className={`h-4 w-4 border-l border-t rounded-full animate-spin ${form.formState.isSubmitting ? "block" :" hidden"}`}></div>
          </Button>
        </form>
      </Form>
      <img className="lg:w-[80%] " src="/contact.svg" alt="" loading="lazy" />
    </section>
  );
}

export default ContactForm;

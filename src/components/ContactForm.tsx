"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  message: z.string().min(20, {
    message: "message must be at least 20 characters.",
  }),
  email: z.string().email(),
});

type Props = {};

function ContactForm({}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, action: "addContact" }),
    });
  };

  return (
    <section className="w-full  h-full grid  lg:grid-cols-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-xl  h-full w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="your name" {...field} />
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
                  <Input placeholder="your email" {...field} />
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
          <Button disabled={form.formState.isSubmitSuccessful} className={`${form.formState.isSubmitSuccessful ? "bg-green-600 dark:text-white disabled:cursor-not-allowed" : ""} `} size={"full"} variant={`default`} type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <img className="lg:w-[80%] " src="/contact.svg" />
    </section>
  );
}

export default ContactForm;

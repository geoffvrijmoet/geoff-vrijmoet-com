"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendEmail } from "@/app/actions/send-email"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export function ContactForm() {
  const [sending, setSending] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setSending(true)
      const result = await sendEmail(values)
      
      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Message sent successfully! I'll get back to you soon.",
        })
        form.reset()
      } else {
        setSubmitStatus({
          success: false,
          message: result.error || "Failed to send message. Please try again.",
        })
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send message'
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-xl mx-auto">
        <h2 className="font-heading text-3xl text-center mb-12">Get in Touch</h2>
        {submitStatus.message && (
          <div
            className={`mb-6 p-4 rounded-md font-light ${
              submitStatus.success
                ? "bg-green-50 text-green-900 dark:bg-green-900/10 dark:text-green-100"
                : "bg-red-50 text-red-900 dark:bg-red-900/10 dark:text-red-100"
            }`}
          >
            {submitStatus.message}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-light">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" className="font-light" {...field} />
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
                  <FormLabel className="font-light">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" type="email" className="font-light" {...field} />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-light">Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell me about your project..."
                      className="min-h-[150px] font-light"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={sending}
            >
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
} 
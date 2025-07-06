"use client"

import { useState, useTransition } from "react"
import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send } from "lucide-react"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  senderEmail: z.string().email({ message: "Please enter a valid email address." }),
  inquiryType: z.enum(["Job Opportunity", "Project Proposal", "Collaboration", "General Question"]).optional(),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters long." })
    .max(100, { message: "Subject must be less than 100 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(1000, { message: "Message must be less than 1000 characters." }),
  website: z.string().max(0, { message: "This field must be empty." }).optional(), // Honeypot field
})

type ContactFormInputs = z.infer<typeof contactFormSchema>

async function postContactForm(data: ContactFormInputs) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  const json = await res.json()

  if (!res.ok || !json.success) {
    throw new Error(json.error || "Failed to send message.")
  }
}

export function ContactForm() {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    setFormError(null)
    startTransition(async () => {
      try {
        await postContactForm(data)
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        })
        reset()
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
        setFormError(errorMessage)
        toast({
          title: "Error Sending Message",
          description: errorMessage,
          variant: "destructive",
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 sm:p-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className={errors.name ? "border-destructive" : ""}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="senderEmail">Your Email</Label>
          <Input
            id="senderEmail"
            type="email"
            placeholder="you@example.com"
            {...register("senderEmail")}
            className={errors.senderEmail ? "border-destructive" : ""}
            aria-invalid={errors.senderEmail ? "true" : "false"}
          />
          {errors.senderEmail && <p className="mt-1 text-sm text-destructive">{errors.senderEmail.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="inquiryType">Inquiry Type (Optional)</Label>
        <Controller
          name="inquiryType"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger id="inquiryType" className={errors.inquiryType ? "border-destructive" : ""}>
                <SelectValue placeholder="Select a reason for your inquiry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Job Opportunity">Job Opportunity</SelectItem>
                <SelectItem value="Project Proposal">Project Proposal</SelectItem>
                <SelectItem value="Collaboration">Collaboration</SelectItem>
                <SelectItem value="General Question">General Question</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.inquiryType && <p className="mt-1 text-sm text-destructive">{errors.inquiryType.message}</p>}
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          type="text"
          placeholder="Project Inquiry"
          {...register("subject")}
          className={errors.subject ? "border-destructive" : ""}
          aria-invalid={errors.subject ? "true" : "false"}
        />
        {errors.subject && <p className="mt-1 text-sm text-destructive">{errors.subject.message}</p>}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Hi Chris, I'd like to discuss..."
          rows={6}
          {...register("message")}
          className={errors.message ? "border-destructive" : ""}
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
      </div>

      {/* Honeypot Field */}
      <div className="sr-only" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input id="website" type="text" {...register("website")} tabIndex={-1} autoComplete="off" />
      </div>

      {formError && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{formError}</p>}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}

'use server'

import nodemailer from 'nodemailer'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  recaptchaToken: z.string(),
})

type FormData = z.infer<typeof formSchema>

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not set')
    return false
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    return data.success === true && data.score >= 0.5
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error)
    return false
  }
}

export async function sendEmail(formData: FormData) {
  try {
    // Validate input data
    const validatedData = formSchema.parse(formData)

    // Verify reCAPTCHA token
    const isValidRecaptcha = await verifyRecaptcha(validatedData.recaptchaToken)
    if (!isValidRecaptcha) {
      return { success: false, error: 'reCAPTCHA verification failed. Please try again.' }
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: validatedData.email,
      subject: `Contact Form Message from ${validatedData.name}`,
      text: validatedData.message,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error: 'Failed to send email. Please try again.' }
  }
} 
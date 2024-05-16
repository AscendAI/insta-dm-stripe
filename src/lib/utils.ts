import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Resend } from 'resend'
import { WelcomeEmail } from '../../emails'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/'}${path}`
}

export async function sendEmail({ email }: { email: string }) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const nameFromEmail = email.split('@')[0]
  console.log('nameFromEmail', nameFromEmail)

  try {
    await resend.emails.send({
      from: 'InstaDM <talent@instadm.ai>',
      to: [email],
      subject: 'Welcome to InstaDM 🎉',
      react: WelcomeEmail({ name: nameFromEmail }) as React.ReactElement,
    })

    console.log('Email sent')
  } catch (e) {
    console.log('func called')
    console.log(e)
  }
}

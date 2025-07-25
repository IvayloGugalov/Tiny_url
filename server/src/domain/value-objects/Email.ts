import { z } from 'zod'
import { InvalidEmailError } from '../errors'

export const EmailSchema = z.string()
  .min(1)
  .max(254)
  .refine((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }, 'Invalid email format')

export type Email = z.infer<typeof EmailSchema>

export const EmailDomain = {
  create: (value: string): Email => {
    try {
      return EmailSchema.parse(value)
    } catch {
      throw new InvalidEmailError(value)
    }
  },

  equals: (email1: Email, email2: Email): boolean => {
    return email1 === email2
  },

  toString: (email: Email): string => {
    return email
  },
}

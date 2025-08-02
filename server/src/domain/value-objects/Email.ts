import { InvalidEmailError } from '../errors'
import { EmailSchema, Email } from 'shared'

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

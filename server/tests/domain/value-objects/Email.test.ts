import { describe, it, expect } from 'vitest'
import { EmailDomain } from '@/domain/value-objects/Email'

describe('EmailDomain', () => {
  const validEmails = [
    'test@example.com',
    'user@domain.org',
    'admin@company.co.uk',
  ]

  const invalidEmails = [
    '',
    'invalid',
    '@domain.com',
    'user@',
    'user@domain',
    'user.domain.com',
    'a'.repeat(255) + '@domain.com', // too long
  ]

  describe('create', () => {
    validEmails.forEach((email) => {
      it(`should create valid email: ${email}`, () => {
        const result = EmailDomain.create(email)
        expect(result).toBe(email)
      })
    })

    invalidEmails.forEach((email) => {
      it(`should reject invalid email: ${email}`, () => {
        expect(() => EmailDomain.create(email)).toThrow()
      })
    })
  })

  describe('equals', () => {
    it('should return true for identical emails', () => {
      const email1 = EmailDomain.create('test@example.com')
      const email2 = EmailDomain.create('test@example.com')

      expect(EmailDomain.equals(email1, email2)).toBe(true)
    })

    it('should return false for different emails', () => {
      const email1 = EmailDomain.create('test@example.com')
      const email2 = EmailDomain.create('other@example.com')

      expect(EmailDomain.equals(email1, email2)).toBe(false)
    })
  })

  describe('toString', () => {
    it('should return the email string', () => {
      const email = EmailDomain.create('test@example.com')
      expect(EmailDomain.toString(email)).toBe('test@example.com')
    })
  })
})

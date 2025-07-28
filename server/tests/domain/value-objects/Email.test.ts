import { describe, it, expect } from 'vitest'
import { EmailDomain } from 'domain/value-objects/Email'
import { TestData } from '../../utils'

describe('EmailDomain', () => {
  describe('create', () => {
    it('should create valid email addresses', () => {
      TestData.validEmails.forEach(email => {
        const result = EmailDomain.create(email)
        expect(result).toBe(email)
      })
    })

    it('should throw InvalidEmailError for invalid email addresses', () => {
      TestData.invalidEmails.forEach(email => {
        expect(() => EmailDomain.create(email)).toThrow()

        try {
          EmailDomain.create(email)
        } catch (error) {
          expect(error).toBeInstanceOf(Error)
          expect((error as any).code).toBe('INVALID_EMAIL')
          expect((error as Error).message).toContain(email)
        }
      })
    })

    it('should handle edge cases', () => {
      // Valid edge cases
      expect(EmailDomain.create('a@b.co')).toBe('a@b.co')
      expect(EmailDomain.create('test+tag@example.com')).toBe('test+tag@example.com')
      expect(EmailDomain.create('user.name@example.com')).toBe('user.name@example.com')
      expect(EmailDomain.create('.user@domain.com')).toBe('.user@domain.com') // This is actually valid by our regex

      // Invalid edge cases that should fail
      expect(() => EmailDomain.create('user@')).toThrow()
      expect(() => EmailDomain.create('@domain.com')).toThrow()
      expect(() => EmailDomain.create('user@domain')).toThrow() // No TLD
    })
  })

  describe('equals', () => {
    it('should return true for identical emails', () => {
      const email1 = EmailDomain.create('test@example.com')
      const email2 = EmailDomain.create('test@example.com')
      expect(EmailDomain.equals(email1, email2)).toBe(true)
    })

    it('should return false for different emails', () => {
      const email1 = EmailDomain.create('test1@example.com')
      const email2 = EmailDomain.create('test2@example.com')
      expect(EmailDomain.equals(email1, email2)).toBe(false)
    })

    it('should be case sensitive', () => {
      const email1 = EmailDomain.create('test@example.com')
      const email2 = EmailDomain.create('Test@example.com')
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

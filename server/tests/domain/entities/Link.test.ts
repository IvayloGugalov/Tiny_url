import { describe, it, expect, beforeEach } from 'vitest'
import { LinkDomain } from 'domain/entities/Link'
import { LinkExpiredError } from 'domain/errors'
import { TestData, TestHelpers } from '../../utils'

describe('LinkDomain', () => {
  describe('create', () => {
    it('should create a valid link', () => {
      const link = LinkDomain.create('test01', 'https://example.com')

      expect(link.id).toBe('test01')
      expect(link.target).toBe('https://example.com')
      expect(link.clicks).toBe(0)
      TestHelpers.expectDateToBeRecent(link.createdAt)
    })

    it('should validate link ID format', () => {
      TestHelpers.expectError(() =>
        LinkDomain.create('invalid@id', 'https://example.com')
      )
    })

    it('should validate URL format', async () => {
      await TestHelpers.expectDomainError(() =>
        LinkDomain.create('test01', 'invalid-url'),
        'INVALID_URL'
      )
    })
  })

  describe('fromPersistence', () => {
    it('should create link from valid persistence data', () => {
      const data = {
        id: 'test01',
        target: 'https://example.com',
        clicks: 5,
        createdAt: new Date('2024-01-01T00:00:00Z')
      }

      const link = LinkDomain.fromPersistence(data)

      expect(link.id).toBe('test01')
      expect(link.target).toBe('https://example.com')
      expect(link.clicks).toBe(5)
      expect(link.createdAt).toEqual(new Date('2024-01-01T00:00:00Z'))
    })

    it('should throw error for invalid persistence data', () => {
      const invalidData = {
        id: 'test01',
        target: 'invalid-url',
        clicks: 5,
        createdAt: new Date()
      }

      TestHelpers.expectError(() => LinkDomain.fromPersistence(invalidData))
    })
  })

  describe('incrementClicks', () => {
    it('should increment clicks by 1', () => {
      const link = TestData.createLink({ clicks: 5 })
      const updatedLink = LinkDomain.incrementClicks(link)

      expect(updatedLink.clicks).toBe(6)
      expect(updatedLink.id).toBe(link.id)
      expect(updatedLink.target).toBe(link.target)
      expect(updatedLink.createdAt).toEqual(link.createdAt)
    })

    it('should not mutate the original link', () => {
      const link = TestData.createLink({ clicks: 5 })
      const updatedLink = LinkDomain.incrementClicks(link)

      expect(link.clicks).toBe(5)
      expect(updatedLink.clicks).toBe(6)
      expect(link).not.toBe(updatedLink)
    })
  })

  describe('isExpired', () => {
    beforeEach(() => {
      TestHelpers.freezeTime(new Date('2024-01-15T00:00:00Z'))
    })

    it('should return false for non-expired links', () => {
      const link = TestData.createLink({
        createdAt: new Date('2024-01-10T00:00:00Z')
      })

      expect(LinkDomain.isExpired(link, 7)).toBe(false)
    })

    it('should return true for expired links', () => {
      const link = TestData.createLink({
        createdAt: new Date('2024-01-01T00:00:00Z')
      })

      expect(LinkDomain.isExpired(link, 7)).toBe(true)
    })

    it('should handle edge case of exactly expired link', () => {
      const link = TestData.createLink({
        createdAt: new Date('2024-01-08T00:00:00Z')
      })

      expect(LinkDomain.isExpired(link, 7)).toBe(false)
    })
  })

  describe('validateNotExpired', () => {
    beforeEach(() => {
      TestHelpers.freezeTime(new Date('2024-01-15T00:00:00Z'))
    })

    it('should not throw for non-expired links', () => {
      const link = TestData.createLink({
        createdAt: new Date('2024-01-10T00:00:00Z')
      })

      expect(() => LinkDomain.validateNotExpired(link, 7)).not.toThrow()
    })

    it('should throw LinkExpiredError for expired links', () => {
      const link = TestData.createLink({
        id: 'expired01',
        createdAt: new Date('2024-01-01T00:00:00Z')
      })

      TestHelpers.expectDomainError(
        () => LinkDomain.validateNotExpired(link, 7),
        'LINK_EXPIRED',
        'expired01'
      )
    })
  })
})

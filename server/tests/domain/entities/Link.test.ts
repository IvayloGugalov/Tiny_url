import { describe, it, expect } from 'vitest'
import { LinkDomain } from 'domain/entities/Link'
import { createMockLink } from 'tests/utils/test-data'

describe('LinkDomain', () => {
  describe('create', () => {
    it('should create a link with valid data', () => {
      const id = 'test-link-1'
      const target = 'https://example.com'
      const userId = 'test-user-1'

      const link = LinkDomain.create(id, target, userId)

      expect(link.id).toBe(id)
      expect(link.target).toBe(target)
      expect(link.userId).toBe(userId)
      expect(link.clicks).toBe(0)
      expect(link.createdAt).toBeInstanceOf(Date)
    })

    it('should create a link without userId', () => {
      const id = 'test-link-1'
      const target = 'https://example.com'

      const link = LinkDomain.create(id, target)

      expect(link.id).toBe(id)
      expect(link.target).toBe(target)
      expect(link.userId).toBeUndefined()
      expect(link.clicks).toBe(0)
      expect(link.createdAt).toBeInstanceOf(Date)
    })
  })

  describe('fromPersistence', () => {
    it('should create link from persistence data', () => {
      const mockData = createMockLink()

      const link = LinkDomain.fromPersistence(mockData)

      expect(link.id).toBe(mockData.id)
      expect(link.target).toBe(mockData.target)
      expect(link.userId).toBe(mockData.userId)
      expect(link.clicks).toBe(mockData.clicks)
      expect(link.createdAt).toEqual(mockData.createdAt)
    })
  })

  describe('incrementClicks', () => {
    it('should increment clicks count', () => {
      const link = createMockLink({ clicks: 5 })

      const updatedLink = LinkDomain.incrementClicks(link)

      expect(updatedLink.clicks).toBe(6)
      expect(updatedLink.id).toBe(link.id)
      expect(updatedLink.target).toBe(link.target)
    })
  })

  describe('isExpired', () => {
    it('should return true for expired link', () => {
      const oldDate = new Date('2020-01-01T00:00:00Z')
      const link = createMockLink({ createdAt: oldDate })

      const isExpired = LinkDomain.isExpired(link, 30)

      expect(isExpired).toBe(true)
    })

    it('should return false for non-expired link', () => {
      const recentDate = new Date()
      const link = createMockLink({ createdAt: recentDate })

      const isExpired = LinkDomain.isExpired(link, 30)

      expect(isExpired).toBe(false)
    })
  })

  describe('validateNotExpired', () => {
    it('should not throw for non-expired link', () => {
      const recentDate = new Date()
      const link = createMockLink({ createdAt: recentDate })

      expect(() => LinkDomain.validateNotExpired(link, 30)).not.toThrow()
    })

    it('should throw for expired link', () => {
      const oldDate = new Date('2020-01-01T00:00:00Z')
      const link = createMockLink({ createdAt: oldDate })

      expect(() => LinkDomain.validateNotExpired(link, 30)).toThrow()
    })
  })

  describe('calculateExpirationDate', () => {
    it('should calculate correct expiration date', () => {
      const createdAt = new Date('2023-01-01T00:00:00Z')
      const link = createMockLink({ createdAt })
      const ttlDays = 30

      const expirationDate = LinkDomain.calculateExpirationDate(link, ttlDays)

      const expectedDate = new Date(createdAt)
      expectedDate.setDate(expectedDate.getDate() + ttlDays)
      expect(expirationDate).toEqual(expectedDate)
    })
  })
})

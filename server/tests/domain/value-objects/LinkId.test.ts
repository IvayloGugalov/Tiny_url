import { describe, it, expect } from 'vitest'
import { LinkIdDomain } from 'domain/value-objects/LinkId'
import { TestData, TestHelpers } from '../../utils'

describe('LinkIdDomain', () => {
  describe('create', () => {
    it('should create valid link IDs', () => {
      TestData.validLinkIds.forEach(id => {
        const result = LinkIdDomain.create(id)
        expect(result).toBe(id)
      })
    })

    it('should throw error for invalid link IDs', () => {
      TestData.invalidLinkIds.forEach(id => {
        TestHelpers.expectError(() => LinkIdDomain.create(id))
      })
    })

    it('should accept alphanumeric characters, underscores, and hyphens', () => {
      expect(LinkIdDomain.create('abc123')).toBe('abc123')
      expect(LinkIdDomain.create('test_id')).toBe('test_id')
      expect(LinkIdDomain.create('test-id')).toBe('test-id')
      expect(LinkIdDomain.create('ABC123')).toBe('ABC123')
    })

    it('should enforce minimum length of 3 characters', () => {
      TestHelpers.expectError(() => LinkIdDomain.create('ab'))
      expect(LinkIdDomain.create('abc')).toBe('abc')
    })

    it('should enforce maximum length of 50 characters', () => {
      const validId = 'a'.repeat(50)
      const invalidId = 'a'.repeat(51)

      expect(LinkIdDomain.create(validId)).toBe(validId)
      TestHelpers.expectError(() => LinkIdDomain.create(invalidId))
    })
  })

  describe('equals', () => {
    it('should return true for identical IDs', () => {
      const id1 = LinkIdDomain.create('test123')
      const id2 = LinkIdDomain.create('test123')
      expect(LinkIdDomain.equals(id1, id2)).toBe(true)
    })

    it('should return false for different IDs', () => {
      const id1 = LinkIdDomain.create('test123')
      const id2 = LinkIdDomain.create('test456')
      expect(LinkIdDomain.equals(id1, id2)).toBe(false)
    })

    it('should be case sensitive', () => {
      const id1 = LinkIdDomain.create('test123')
      const id2 = LinkIdDomain.create('TEST123')
      expect(LinkIdDomain.equals(id1, id2)).toBe(false)
    })
  })

  describe('toString', () => {
    it('should return the ID string', () => {
      const id = LinkIdDomain.create('test123')
      expect(LinkIdDomain.toString(id)).toBe('test123')
    })
  })
})

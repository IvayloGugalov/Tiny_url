import { describe, it, expect } from 'vitest'
import { UserIdDomain } from 'domain/value-objects/UserId'
import { TestData, TestHelpers } from '../../utils'

describe('UserIdDomain', () => {
  describe('create', () => {
    it('should create valid user IDs', () => {
      TestData.validUserIds.forEach(id => {
        const result = UserIdDomain.create(id)
        expect(result).toBe(id)
      })
    })

    it('should throw error for invalid user IDs', () => {
      TestData.invalidUserIds.forEach(id => {
        TestHelpers.expectError(() => UserIdDomain.create(id))
      })
    })

    it('should accept alphanumeric characters, underscores, and hyphens', () => {
      expect(UserIdDomain.create('user123')).toBe('user123')
      expect(UserIdDomain.create('test_user')).toBe('test_user')
      expect(UserIdDomain.create('test-user')).toBe('test-user')
      expect(UserIdDomain.create('USER123')).toBe('USER123')
    })

    it('should enforce minimum length of 3 characters', () => {
      TestHelpers.expectError(() => UserIdDomain.create('ab'))
      expect(UserIdDomain.create('abc')).toBe('abc')
    })

    it('should enforce maximum length of 50 characters', () => {
      const validId = 'a'.repeat(50)
      const invalidId = 'a'.repeat(51)

      expect(UserIdDomain.create(validId)).toBe(validId)
      TestHelpers.expectError(() => UserIdDomain.create(invalidId))
    })
  })

  describe('equals', () => {
    it('should return true for identical IDs', () => {
      const id1 = UserIdDomain.create('user123')
      const id2 = UserIdDomain.create('user123')
      expect(UserIdDomain.equals(id1, id2)).toBe(true)
    })

    it('should return false for different IDs', () => {
      const id1 = UserIdDomain.create('user123')
      const id2 = UserIdDomain.create('user456')
      expect(UserIdDomain.equals(id1, id2)).toBe(false)
    })

    it('should be case sensitive', () => {
      const id1 = UserIdDomain.create('user123')
      const id2 = UserIdDomain.create('USER123')
      expect(UserIdDomain.equals(id1, id2)).toBe(false)
    })
  })

  describe('toString', () => {
    it('should return the ID string', () => {
      const id = UserIdDomain.create('user123')
      expect(UserIdDomain.toString(id)).toBe('user123')
    })
  })
})

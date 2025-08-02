import { describe, it, expect } from 'vitest'
import { UserIdDomain } from 'domain/value-objects/UserId'

describe('UserIdDomain', () => {
  const validUserIds = ['user123', 'admin', 'test_user', 'user-456']

  const invalidUserIds = [
    '',
    'ab', // too short
    'a'.repeat(51), // too long
    'invalid@id',
    'id with spaces',
    'id#with$special%chars',
  ]

  describe('create', () => {
    validUserIds.forEach((id) => {
      it(`should create valid user ID: ${id}`, () => {
        const result = UserIdDomain.create(id)
        expect(result).toBe(id)
      })
    })

    invalidUserIds.forEach((id) => {
      it(`should reject invalid user ID: ${id}`, () => {
        expect(() => UserIdDomain.create(id)).toThrow()
      })
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
  })

  describe('toString', () => {
    it('should return the ID string', () => {
      const id = UserIdDomain.create('user123')
      expect(UserIdDomain.toString(id)).toBe('user123')
    })
  })
})

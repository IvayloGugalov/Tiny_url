import { describe, it, expect } from 'vitest'
import { UserDomain } from 'domain/entities/User'
import { TestData, TestHelpers } from '../../utils'

describe('UserDomain', () => {
  describe('create', () => {
    it('should create a valid user with all fields', () => {
      const user = UserDomain.create('user123', 'test@example.com', 'Test User')

      expect(user.id).toBe('user123')
      expect(user.email).toBe('test@example.com')
      expect(user.name).toBe('Test User')
      TestHelpers.expectDateToBeRecent(user.createdAt)
    })

    it('should create a valid user without name', () => {
      const user = UserDomain.create('user123', 'test@example.com')

      expect(user.id).toBe('user123')
      expect(user.email).toBe('test@example.com')
      expect(user.name).toBeUndefined()
      TestHelpers.expectDateToBeRecent(user.createdAt)
    })

    it('should trim whitespace from name', () => {
      const user = UserDomain.create('user123', 'test@example.com', '  Test User  ')
      expect(user.name).toBe('Test User')
    })

    it('should set name to undefined for empty string', () => {
      const user = UserDomain.create('user123', 'test@example.com', '')
      expect(user.name).toBeUndefined()
    })

    it('should set name to undefined for whitespace-only string', () => {
      const user = UserDomain.create('user123', 'test@example.com', '   ')
      expect(user.name).toBeUndefined()
    })

    it('should validate user ID format', () => {
      TestHelpers.expectError(() =>
        UserDomain.create('invalid@id', 'test@example.com')
      )
    })

    it('should validate email format', async () => {
      await TestHelpers.expectDomainError(() =>
        UserDomain.create('user123', 'invalid-email'),
        'INVALID_EMAIL'
      )
    })
  })

  describe('fromPersistence', () => {
    it('should create user from valid persistence data', () => {
      const data = {
        id: 'user123',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date('2024-01-01T00:00:00Z')
      }

      const user = UserDomain.fromPersistence(data)

      expect(user.id).toBe('user123')
      expect(user.email).toBe('test@example.com')
      expect(user.name).toBe('Test User')
      expect(user.createdAt).toEqual(new Date('2024-01-01T00:00:00Z'))
    })

    it('should create user from persistence data without name', () => {
      const data = {
        id: 'user123',
        email: 'test@example.com',
        createdAt: new Date('2024-01-01T00:00:00Z')
      }

      const user = UserDomain.fromPersistence(data)

      expect(user.id).toBe('user123')
      expect(user.email).toBe('test@example.com')
      expect(user.name).toBeUndefined()
      expect(user.createdAt).toEqual(new Date('2024-01-01T00:00:00Z'))
    })

    it('should throw error for invalid persistence data', () => {
      const invalidData = {
        id: 'user123',
        email: 'invalid-email',
        name: 'Test User',
        createdAt: new Date()
      }

      TestHelpers.expectError(() => UserDomain.fromPersistence(invalidData))
    })
  })

  describe('updateName', () => {
    it('should update user name', () => {
      const user = TestData.createUser({ name: 'Old Name' })
      const updatedUser = UserDomain.updateName(user, 'New Name')

      expect(updatedUser.name).toBe('New Name')
      expect(updatedUser.id).toBe(user.id)
      expect(updatedUser.email).toBe(user.email)
      expect(updatedUser.createdAt).toEqual(user.createdAt)
    })

    it('should trim whitespace from new name', () => {
      const user = TestData.createUser()
      const updatedUser = UserDomain.updateName(user, '  New Name  ')

      expect(updatedUser.name).toBe('New Name')
    })

    it('should set name to undefined for empty string', () => {
      const user = TestData.createUser({ name: 'Old Name' })
      const updatedUser = UserDomain.updateName(user, '')

      expect(updatedUser.name).toBeUndefined()
    })

    it('should set name to undefined for whitespace-only string', () => {
      const user = TestData.createUser({ name: 'Old Name' })
      const updatedUser = UserDomain.updateName(user, '   ')

      expect(updatedUser.name).toBeUndefined()
    })

    it('should not mutate the original user', () => {
      const user = TestData.createUser({ name: 'Old Name' })
      const updatedUser = UserDomain.updateName(user, 'New Name')

      expect(user.name).toBe('Old Name')
      expect(updatedUser.name).toBe('New Name')
      expect(user).not.toBe(updatedUser)
    })
  })
})

import { describe, it, expect } from 'vitest'
import { UserDomain } from '@/domain/entities/User'
import { createMockUser } from 'tests/utils/test-data'

describe('UserDomain', () => {
  describe('create', () => {
    it('should create a user with valid data', () => {
      const id = 'test-user-1'
      const email = 'test@example.com'
      const name = 'Test User'

      const user = UserDomain.create(id, email, name)

      expect(user.id).toBe(id)
      expect(user.email).toBe(email)
      expect(user.name).toBe(name)
      expect(user.createdAt).toBeInstanceOf(Date)
    })

    it('should create a user without name', () => {
      const id = 'test-user-1'
      const email = 'test@example.com'

      const user = UserDomain.create(id, email)

      expect(user.id).toBe(id)
      expect(user.email).toBe(email)
      expect(user.name).toBeUndefined()
      expect(user.createdAt).toBeInstanceOf(Date)
    })

    it('should trim whitespace from name', () => {
      const id = 'test-user-1'
      const email = 'test@example.com'
      const name = '  Test User  '

      const user = UserDomain.create(id, email, name)

      expect(user.name).toBe('Test User')
    })
  })

  describe('fromPersistence', () => {
    it('should create user from persistence data', () => {
      const mockData = createMockUser()

      const user = UserDomain.fromPersistence(mockData)

      expect(user.id).toBe(mockData.id)
      expect(user.email).toBe(mockData.email)
      expect(user.name).toBe(mockData.name)
      expect(user.createdAt).toEqual(mockData.createdAt)
    })
  })

  describe('updateName', () => {
    it('should update user name', () => {
      const user = createMockUser({ name: 'Old Name' })
      const newName = 'New Name'

      const updatedUser = UserDomain.updateName(user, newName)

      expect(updatedUser.name).toBe(newName)
      expect(updatedUser.id).toBe(user.id)
      expect(updatedUser.email).toBe(user.email)
    })

    it('should remove name when new name is undefined', () => {
      const user = createMockUser({ name: 'Old Name' })

      const updatedUser = UserDomain.updateName(user, undefined)

      expect(updatedUser.name).toBeUndefined()
    })

    it('should trim whitespace from new name', () => {
      const user = createMockUser({ name: 'Old Name' })
      const newName = '  New Name  '

      const updatedUser = UserDomain.updateName(user, newName)

      expect(updatedUser.name).toBe('New Name')
    })
  })
})

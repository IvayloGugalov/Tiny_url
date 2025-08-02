import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateUserUseCase } from 'application/use-cases/AuthenticateUserUseCase'
import { MockUserRepository } from 'tests/application/mocks/repositories/MockUserRepository'
import { MockAuthService } from 'tests/application/mocks/services/MockAuthService'
import { createMockUser } from 'tests/utils/test-data'

describe('AuthenticateUserUseCase', () => {
  let useCase: AuthenticateUserUseCase
  let mockUserRepository: MockUserRepository
  let mockAuthService: MockAuthService

  beforeEach(() => {
    mockUserRepository = new MockUserRepository()
    mockAuthService = new MockAuthService()
    useCase = new AuthenticateUserUseCase(mockAuthService, mockUserRepository)
  })

  describe('execute', () => {
    it('should authenticate user with valid credentials', async () => {
      const user = createMockUser({
        id: 'user1',
        email: 'test@example.com',
        name: 'Test User',
      })

      await mockUserRepository.create(user)

      const result = await useCase.execute('test@example.com', 'validpassword')

      expect(result).toBeDefined()
      expect(result.token).toBe('mock-token')
      expect(result.user).toEqual({
        id: 'user1',
        email: 'test@example.com',
        name: 'Test User',
      })
    })

    it('should throw error for non-existent user', async () => {
      await expect(
        useCase.execute('nonexistent@example.com', 'password'),
      ).rejects.toThrow()
    })

    it('should handle different email formats', async () => {
      const validEmails = [
        'test@example.com',
        'user@domain.org',
        'admin@company.co.uk',
      ]

      for (const email of validEmails) {
        const user = createMockUser({
          id: 'user1',
          email,
          name: 'Test User',
        })

        await mockUserRepository.create(user)

        const result = await useCase.execute(email, 'validpassword')

        expect(result).toBeDefined()
        expect(result.user.email).toBe(email)

        mockUserRepository.clear()
      }
    })

    it('should handle users without names', async () => {
      const user = createMockUser({
        id: 'user1',
        email: 'test@example.com',
        name: undefined,
      })

      await mockUserRepository.create(user)

      const result = await useCase.execute('test@example.com', 'validpassword')

      expect(result).toBeDefined()
      expect(result.user.name).toBeUndefined()
    })

    it('should handle users with names', async () => {
      const user = createMockUser({
        id: 'user1',
        email: 'test@example.com',
        name: 'John Doe',
      })

      await mockUserRepository.create(user)

      const result = await useCase.execute('test@example.com', 'validpassword')

      expect(result).toBeDefined()
      expect(result.user.name).toBe('John Doe')
    })

    it('should handle case-sensitive email matching', async () => {
      const user = createMockUser({
        id: 'user1',
        email: 'Test@Example.com',
        name: 'Test User',
      })

      await mockUserRepository.create(user)

      const result = await useCase.execute('Test@Example.com', 'validpassword')

      expect(result).toBeDefined()
      expect(result.user.email).toBe('Test@Example.com')
    })

    it('should handle long email addresses', async () => {
      const longEmail = 'a'.repeat(50) + '@example.com'
      const user = createMockUser({
        id: 'user1',
        email: longEmail,
        name: 'Test User',
      })

      await mockUserRepository.create(user)

      const result = await useCase.execute(longEmail, 'validpassword')

      expect(result).toBeDefined()
      expect(result.user.email).toBe(longEmail)
    })

    it('should handle special characters in email', async () => {
      const specialEmail = 'user+tag@example.com'
      const user = createMockUser({
        id: 'user1',
        email: specialEmail,
        name: 'Test User',
      })

      await mockUserRepository.create(user)

      const result = await useCase.execute(specialEmail, 'validpassword')

      expect(result).toBeDefined()
      expect(result.user.email).toBe(specialEmail)
    })
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUserUseCase } from 'application/use-cases/RegisterUserUseCase'
import { MockUserRepository } from 'tests/application/mocks/repositories/MockUserRepository'
import { MockAuthService } from 'tests/application/mocks/services/MockAuthService'
import { createMockUser } from 'tests/utils/test-data'

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase
  let mockUserRepository: MockUserRepository
  let mockAuthService: MockAuthService

  beforeEach(() => {
    mockUserRepository = new MockUserRepository()
    mockAuthService = new MockAuthService()
    useCase = new RegisterUserUseCase(mockUserRepository, mockAuthService)
  })

  describe('execute', () => {
    it('should register new user successfully', async () => {
      const request = {
        email: 'newuser@example.com',
        name: 'New User',
      }

      const result = await useCase.execute(request)

      expect(result).toBeDefined()
      expect(result.token).toBe('mock-token')
      expect(result.user).toBeDefined()
      expect(result.user.email).toBe('newuser@example.com')
      expect(result.user.name).toBe('New User')
    })

    it('should register user without name', async () => {
      const request = {
        email: 'newuser@example.com',
      }

      const result = await useCase.execute(request)

      expect(result).toBeDefined()
      expect(result.user.email).toBe('newuser@example.com')
      expect(result.user.name).toBeUndefined()
    })

    it('should throw error for duplicate email', async () => {
      const existingUser = createMockUser({ email: 'test@example.com' })
      await mockUserRepository.create(existingUser)

      const request = {
        email: 'test@example.com',
        name: 'New User',
      }

      await expect(useCase.execute(request)).rejects.toThrow()
    })

    it('should handle different email formats', async () => {
      const validEmails = [
        'test@example.com',
        'user@domain.org',
        'admin@company.co.uk',
      ]

      for (const email of validEmails) {
        const request = {
          email,
          name: 'Test User',
        }

        const result = await useCase.execute(request)

        expect(result).toBeDefined()
        expect(result.user.email).toBe(email)

        mockUserRepository.clear()
      }
    })

    it('should handle users with names', async () => {
      const request = {
        email: 'test@example.com',
        name: 'John Doe',
      }

      const result = await useCase.execute(request)

      expect(result).toBeDefined()
      expect(result.user.name).toBe('John Doe')
    })

    it('should handle users without names', async () => {
      const request = {
        email: 'test@example.com',
      }

      const result = await useCase.execute(request)

      expect(result).toBeDefined()
      expect(result.user.name).toBeUndefined()
    })

    it('should handle case-sensitive email matching', async () => {
      const existingUser = createMockUser({ email: 'Test@Example.com' })
      await mockUserRepository.create(existingUser)

      const request = {
        email: 'Test@Example.com',
        name: 'New User',
      }

      await expect(useCase.execute(request)).rejects.toThrow()
    })

    it('should handle special characters in email', async () => {
      const specialEmail = 'user+tag@example.com'
      const request = {
        email: specialEmail,
        name: 'Test User',
      }

      const result = await useCase.execute(request)

      expect(result).toBeDefined()
      expect(result.user.email).toBe(specialEmail)
    })

    it('should handle long email addresses', async () => {
      const longEmail = 'a'.repeat(50) + '@example.com'
      const request = {
        email: longEmail,
        name: 'Test User',
      }

      const result = await useCase.execute(request)

      expect(result).toBeDefined()
      expect(result.user.email).toBe(longEmail)
    })
  })
})

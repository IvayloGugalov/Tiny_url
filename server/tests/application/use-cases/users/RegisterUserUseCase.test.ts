import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUserUseCase } from 'application/use-cases/RegisterUserUseCase'
import { MockUserRepository, MockAuthService } from '../../mocks'
import { TestData, TestHelpers } from '../../../utils'

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
    it('should register user successfully with name', async () => {
      const request = {
        email: 'test@example.com',
        name: 'Test User'
      }

      const result = await useCase.execute(request)

      expect(result.token).toBeDefined()
      expect(result.user.email).toBe('test@example.com')
      expect(result.user.name).toBe('Test User')
      expect(result.user.id).toBeDefined()
      expect(typeof result.user.id).toBe('string')

      // Verify user was saved
      const savedUser = await mockUserRepository.findByEmail('test@example.com')
      expect(savedUser).toBeDefined()
      expect(savedUser!.email).toBe('test@example.com')
      expect(savedUser!.name).toBe('Test User')
    })

    it('should register user successfully without name', async () => {
      const request = {
        email: 'test@example.com'
      }

      const result = await useCase.execute(request)

      expect(result.token).toBeDefined()
      expect(result.user.email).toBe('test@example.com')
      expect(result.user.name).toBeNull()
      expect(result.user.id).toBeDefined()

      // Verify user was saved
      const savedUser = await mockUserRepository.findByEmail('test@example.com')
      expect(savedUser).toBeDefined()
      expect(savedUser!.name).toBeUndefined()
    })

    it('should throw DuplicateEmailError for existing email', async () => {
      const existingUser = TestData.createUser({ email: 'test@example.com' })
      await mockUserRepository.save(existingUser)

      const request = {
        email: 'test@example.com',
        name: 'New User'
      }

      await TestHelpers.expectDomainError(
        () => useCase.execute(request),
        'DUPLICATE_EMAIL',
        'test@example.com'
      )
    })

    it('should validate email format', async () => {
      const request = {
        email: 'invalid-email',
        name: 'Test User'
      }

      await TestHelpers.expectDomainError(
        () => useCase.execute(request),
        'INVALID_EMAIL',
        'invalid-email'
      )
    })

    it('should generate unique user IDs', async () => {
      const requests = [
        { email: 'user1@example.com', name: 'User 1' },
        { email: 'user2@example.com', name: 'User 2' },
        { email: 'user3@example.com', name: 'User 3' }
      ]

      const userIds = new Set<string>()

      for (const request of requests) {
        const result = await useCase.execute(request)
        userIds.add(result.user.id)
      }

      expect(userIds.size).toBe(3) // All IDs should be unique
    })

    it('should generate valid user IDs', async () => {
      const request = {
        email: 'test@example.com',
        name: 'Test User'
      }

      const result = await useCase.execute(request)

      // User ID should be 10 characters long and contain only valid characters
      expect(result.user.id).toHaveLength(10)
      expect(/^[a-zA-Z0-9]+$/.test(result.user.id)).toBe(true)
    })

    it('should trim whitespace from name', async () => {
      const request = {
        email: 'test@example.com',
        name: '  Test User  '
      }

      const result = await useCase.execute(request)

      expect(result.user.name).toBe('Test User')

      const savedUser = await mockUserRepository.findByEmail('test@example.com')
      expect(savedUser!.name).toBe('Test User')
    })

    it('should handle empty name as null', async () => {
      const request = {
        email: 'test@example.com',
        name: ''
      }

      const result = await useCase.execute(request)

      expect(result.user.name).toBeNull()

      const savedUser = await mockUserRepository.findByEmail('test@example.com')
      expect(savedUser!.name).toBeUndefined()
    })

    it('should handle whitespace-only name as null', async () => {
      const request = {
        email: 'test@example.com',
        name: '   '
      }

      const result = await useCase.execute(request)

      expect(result.user.name).toBeNull()

      const savedUser = await mockUserRepository.findByEmail('test@example.com')
      expect(savedUser!.name).toBeUndefined()
    })

    it('should generate token with correct user data', async () => {
      const request = {
        email: 'test@example.com',
        name: 'Test User'
      }

      const result = await useCase.execute(request)

      // Verify token contains correct data
      const tokenData = await mockAuthService.verifyToken(result.token)
      expect(tokenData.userId).toBe(result.user.id)
      expect(tokenData.email).toBe('test@example.com')
    })

    it('should set creation timestamp', async () => {
      const request = {
        email: 'test@example.com',
        name: 'Test User'
      }

      await useCase.execute(request)

      const savedUser = await mockUserRepository.findByEmail('test@example.com')
      TestHelpers.expectDateToBeRecent(savedUser!.createdAt)
    })

    it('should handle various valid email formats', async () => {
      const validEmails = TestData.validEmails.slice(0, 3) // Test a few to avoid too many iterations

      for (let i = 0; i < validEmails.length; i++) {
        const email = validEmails[i]!
        const request = {
          email,
          name: `User ${i + 1}`
        }

        const result = await useCase.execute(request)
        expect(result.user.email).toBe(email)

        const savedUser = await mockUserRepository.findByEmail(email)
        expect(savedUser).toBeDefined()
      }
    })

    it('should handle long names', async () => {
      const longName = 'A'.repeat(100)
      const request = {
        email: 'test@example.com',
        name: longName
      }

      const result = await useCase.execute(request)

      expect(result.user.name).toBe(longName)

      const savedUser = await mockUserRepository.findByEmail('test@example.com')
      expect(savedUser!.name).toBe(longName)
    })

    it('should handle special characters in name', async () => {
      const specialName = 'José María O\'Connor-Smith'
      const request = {
        email: 'test@example.com',
        name: specialName
      }

      const result = await useCase.execute(request)

      expect(result.user.name).toBe(specialName)

      const savedUser = await mockUserRepository.findByEmail('test@example.com')
      expect(savedUser!.name).toBe(specialName)
    })
  })
})

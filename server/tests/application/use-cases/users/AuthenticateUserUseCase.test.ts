import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateUserUseCase } from 'application/use-cases/AuthenticateUserUseCase'
import { MockAuthService, MockUserRepository } from '../../mocks'
import { TestData, TestHelpers } from '../../../utils'

describe('AuthenticateUserUseCase', () => {
  let useCase: AuthenticateUserUseCase
  let mockAuthService: MockAuthService
  let mockUserRepository: MockUserRepository

  beforeEach(() => {
    mockAuthService = new MockAuthService()
    mockUserRepository = new MockUserRepository()
    mockUserRepository.clear()
    useCase = new AuthenticateUserUseCase(mockAuthService, mockUserRepository)
  })

  describe('execute', () => {
    it('should authenticate user with valid credentials', async () => {
      const request = {
        email: 'test@example.com',
        password: 'validpassword'
      }

      const user = TestData.createUser({
        id: 'user123',
        email: 'test@example.com'
      })
      await mockUserRepository.save(user)

      mockAuthService.setValidCredentials('test@example.com', 'validpassword')

      const result = await useCase.execute(request)

      expect(result.token).toBeDefined()
      expect(typeof result.token).toBe('string')
      expect(result.token).toContain('mock-token-user123-')
    })

    it('should throw InvalidCredentialsError for invalid password', async () => {
      const request = {
        email: 'test@example.com',
        password: 'wrongpassword'
      }

      mockAuthService.setValidCredentials('test@example.com', 'correctpassword')

      await TestHelpers.expectDomainError(
        () => useCase.execute(request),
        'INVALID_CREDENTIALS',
        'Invalid email or password'
      )
    })

    it('should throw InvalidCredentialsError for non-existent user', async () => {
      const request = {
        email: 'nonexistent@example.com',
        password: 'anypassword'
      }

      // Don't set any valid credentials

      await TestHelpers.expectDomainError(
        () => useCase.execute(request),
        'INVALID_CREDENTIALS'
      )
    })

    it('should validate email format', async () => {
      const request = {
        email: 'invalid-email',
        password: 'validpassword'
      }

      await TestHelpers.expectDomainError(
        () => useCase.execute(request),
        'INVALID_EMAIL',
        'invalid-email'
      )
    })

    it('should handle various valid email formats', async () => {
      const validEmails = TestData.validEmails

      for (const email of validEmails) {
        const request = {
          email,
          password: 'validpassword'
        }

        const user = TestData.createUser({
          id: `user-${email.replace(/[^a-zA-Z0-9]/g, '')}`,
          email
        })
        await mockUserRepository.save(user)

        mockAuthService.clear()
        mockAuthService.setValidCredentials(email, 'validpassword')

        const result = await useCase.execute(request)
        expect(result.token).toBeDefined()
      }
    })

    it('should generate token with correct user ID', async () => {
      const request = {
        email: 'test@example.com',
        password: 'validpassword'
      }

      const user = TestData.createUser({
        id: 'testuser456',
        email: 'test@example.com'
      })
      await mockUserRepository.save(user)

      mockAuthService.setValidCredentials('test@example.com', 'validpassword')

      const result = await useCase.execute(request)

      // Verify token was generated with correct parameters
      const tokenData = await mockAuthService.verifyToken(result.token)
      expect(tokenData.userId).toBe('testuser456')
      expect(tokenData.email).toBe('test@example.com')
    })

    it('should handle empty password', async () => {
      const request = {
        email: 'test@example.com',
        password: ''
      }

      await TestHelpers.expectDomainError(
        () => useCase.execute(request),
        'INVALID_CREDENTIALS'
      )
    })

    it('should handle case-sensitive passwords', async () => {
      const request1 = {
        email: 'test@example.com',
        password: 'Password123'
      }
      const request2 = {
        email: 'test@example.com',
        password: 'password123'
      }

      const user = TestData.createUser({
        id: 'caseuser',
        email: 'test@example.com'
      })
      await mockUserRepository.save(user)

      mockAuthService.setValidCredentials('test@example.com', 'Password123')

      // Correct case should work
      const result1 = await useCase.execute(request1)
      expect(result1.token).toBeDefined()

      // Wrong case should fail
      await TestHelpers.expectDomainError(
        () => useCase.execute(request2),
        'INVALID_CREDENTIALS'
      )
    })

    it('should handle special characters in password', async () => {
      const request = {
        email: 'test@example.com',
        password: 'P@ssw0rd!#$%^&*()'
      }

      const user = TestData.createUser({
        id: 'specialuser',
        email: 'test@example.com'
      })
      await mockUserRepository.save(user)

      mockAuthService.setValidCredentials('test@example.com', 'P@ssw0rd!#$%^&*()')

      const result = await useCase.execute(request)
      expect(result.token).toBeDefined()
    })

    it('should handle long passwords', async () => {
      const longPassword = 'a'.repeat(1000)
      const request = {
        email: 'test@example.com',
        password: longPassword
      }

      const user = TestData.createUser({
        id: 'longuser',
        email: 'test@example.com'
      })
      await mockUserRepository.save(user)

      mockAuthService.setValidCredentials('test@example.com', longPassword)

      const result = await useCase.execute(request)
      expect(result.token).toBeDefined()
    })

    it('should handle auth service failures gracefully', async () => {
      const request = {
        email: 'test@example.com',
        password: 'validpassword'
      }

      // Set auth service to always fail validation
      mockAuthService.setShouldValidateCredentials(false)

      await TestHelpers.expectDomainError(
        () => useCase.execute(request),
        'INVALID_CREDENTIALS'
      )
    })
  })
})

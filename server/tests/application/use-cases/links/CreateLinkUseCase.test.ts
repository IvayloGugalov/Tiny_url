import { describe, it, expect, beforeEach } from 'vitest'
import { CreateLinkUseCase } from 'application/use-cases/CreateLinkUseCase'
import { MockLinkRepository, MockLinkIdGenerator } from '../../mocks'
import { TestData, TestHelpers } from '../../../utils'

describe('CreateLinkUseCase', () => {
  let useCase: CreateLinkUseCase
  let mockRepository: MockLinkRepository
  let mockGenerator: MockLinkIdGenerator

  beforeEach(() => {
    mockRepository = new MockLinkRepository()
    mockGenerator = new MockLinkIdGenerator()
    useCase = new CreateLinkUseCase(mockRepository, mockGenerator)
  })

  describe('execute', () => {
    it('should create a link successfully', async () => {
      const request = { target: 'https://example.com' }
      const baseUrl = 'http://localhost:3000/api/links'

      mockGenerator.setGeneratedIds(['test01'])

      const result = await useCase.execute(request, baseUrl)

      expect(result.id).toBe('test01')
      expect(result.shortUrl).toBe('http://localhost:3000/test01')

      // Verify link was saved
      const savedLink = await mockRepository.findById('test01')
      expect(savedLink).toBeDefined()
      expect(savedLink!.target).toBe('https://example.com')
      expect(savedLink!.clicks).toBe(0)
    })

    it('should handle collision by generating new ID', async () => {
      const request = { target: 'https://example.com' }
      const baseUrl = 'http://localhost:3000/api/links'

      // Pre-populate repository with first ID
      const existingLink = TestData.createLink({ id: 'test01' })
      await mockRepository.save(existingLink)

      // Set generator to produce collision then unique ID
      mockGenerator.setGeneratedIds(['test01', 'test02'])

      const result = await useCase.execute(request, baseUrl)

      expect(result.id).toBe('test02')
      expect(result.shortUrl).toBe('http://localhost:3000/test02')

      // Verify new link was saved
      const savedLink = await mockRepository.findById('test02')
      expect(savedLink).toBeDefined()
      expect(savedLink!.target).toBe('https://example.com')
    })

    it('should handle multiple collisions', async () => {
      const request = { target: 'https://example.com' }
      const baseUrl = 'http://localhost:3000/api/links'

      // Pre-populate repository with multiple IDs
      for (let i = 1; i <= 3; i++) {
        const link = TestData.createLink({ id: `test0${i}` })
        await mockRepository.save(link)
      }

      // Set generator to produce multiple collisions then unique ID
      mockGenerator.setGeneratedIds(['test01', 'test02', 'test03', 'test04'])

      const result = await useCase.execute(request, baseUrl)

      expect(result.id).toBe('test04')
      expect(mockGenerator.getGeneratedCount()).toBe(4)
    })

    it('should throw error after max collision attempts', async () => {
      const request = { target: 'https://example.com' }
      const baseUrl = 'http://localhost:3000/api/links'

      // Pre-populate repository with many IDs
      for (let i = 1; i <= 15; i++) {
        const link = TestData.createLink({ id: `test${i.toString().padStart(2, '0')}` })
        await mockRepository.save(link)
      }

      // Set generator to always produce collisions
      mockGenerator.setShouldGenerateUnique(false)

      await TestHelpers.expectError(
        () => useCase.execute(request, baseUrl),
        'Failed to generate unique link ID'
      )
    })

    it('should validate target URL', async () => {
      const request = { target: 'invalid-url' }
      const baseUrl = 'http://localhost:3000/api/links'

      await TestHelpers.expectDomainError(
        () => useCase.execute(request, baseUrl),
        'INVALID_URL'
      )
    })

    it('should handle different base URL formats', async () => {
      const request = { target: 'https://example.com' }
      mockGenerator.setGeneratedIds(['test01'])

      const testCases = [
        {
          baseUrl: 'http://localhost:3000/api/links',
          expected: 'http://localhost:3000/test01'
        },
        {
          baseUrl: 'https://myapp.com/api/links',
          expected: 'https://myapp.com/test01'
        },
        {
          baseUrl: 'http://localhost:8080/api/links',
          expected: 'http://localhost:8080/test01'
        }
      ]

      for (const testCase of testCases) {
        mockRepository.clear()
        const result = await useCase.execute(request, testCase.baseUrl)
        expect(result.shortUrl).toBe(testCase.expected)
      }
    })

    it('should trim whitespace from target URL', async () => {
      const request = { target: '  https://example.com  ' }
      const baseUrl = 'http://localhost:3000/api/links'

      mockGenerator.setGeneratedIds(['test01'])

      await useCase.execute(request, baseUrl)

      const savedLink = await mockRepository.findById('test01')
      expect(savedLink!.target).toBe('https://example.com')
    })

    it('should create link with current timestamp', async () => {
      const request = { target: 'https://example.com' }
      const baseUrl = 'http://localhost:3000/api/links'

      mockGenerator.setGeneratedIds(['test01'])

      await useCase.execute(request, baseUrl)

      const savedLink = await mockRepository.findById('test01')
      TestHelpers.expectDateToBeRecent(savedLink!.createdAt)
    })
  })
})

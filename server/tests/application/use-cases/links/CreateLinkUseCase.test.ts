import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CreateLinkUseCase } from 'application/use-cases/CreateLinkUseCase'
import { MockLinkRepository } from 'tests/application/mocks/repositories/MockLinkRepository'
import { MockLinkIdGenerator } from 'tests/application/mocks/services/MockLinkIdGenerator'
import { createMockLink } from 'tests/utils/test-data'

describe('CreateLinkUseCase', () => {
  let useCase: CreateLinkUseCase
  let mockRepository: MockLinkRepository
  let mockGenerator: MockLinkIdGenerator

  beforeEach(() => {
    mockRepository = new MockLinkRepository()
    mockGenerator = new MockLinkIdGenerator()
    useCase = new CreateLinkUseCase(mockRepository, mockGenerator)
  })

  it('should create a new link successfully', async () => {
    const target = 'https://example.com'
    const userId = 'test-user-1'

    const result = await useCase.execute(target, userId)

    expect(result).toBeDefined()
    expect(result.target).toBe(target)
    expect(result.userId).toBe(userId)
    expect(result.clicks).toBe(0)
    expect(result.createdAt).toBeInstanceOf(Date)
  })

  it('should generate a unique link ID', async () => {
    const target = 'https://example.com'
    const userId = 'test-user-1'

    const result1 = await useCase.execute(target, userId)
    const result2 = await useCase.execute(target, userId)

    expect(result1.id).not.toBe(result2.id)
  })

  it('should save the link to the repository', async () => {
    const target = 'https://example.com'
    const userId = 'test-user-1'

    await useCase.execute(target, userId)

    const savedLinks = await mockRepository.findAll()
    expect(savedLinks).toHaveLength(1)
    expect(savedLinks[0]!.target).toBe(target)
    expect(savedLinks[0]!.userId).toBe(userId)
  })

  it('should handle links without userId', async () => {
    const target = 'https://example.com'

    const result = await useCase.execute(target)

    expect(result).toBeDefined()
    expect(result.target).toBe(target)
    expect(result.userId).toBeUndefined()
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { CleanupExpiredLinksUseCase } from 'application/use-cases/CleanupExpiredLinksUseCase'
import { MockLinkRepository } from 'tests/application/mocks/repositories/MockLinkRepository'
import { createMockLink } from 'tests/utils/test-data'

describe('CleanupExpiredLinksUseCase', () => {
  let useCase: CleanupExpiredLinksUseCase
  let mockRepository: MockLinkRepository

  beforeEach(() => {
    mockRepository = new MockLinkRepository()
    useCase = new CleanupExpiredLinksUseCase(mockRepository)
  })

  describe('execute', () => {
    it('should delete expired links and return count', async () => {
      const ttlDays = 7
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - ttlDays)

      const expiredLink1 = createMockLink({
        id: 'expired1',
        createdAt: new Date(cutoffDate.getTime() - 24 * 60 * 60 * 1000), // 1 day before cutoff
      })
      const expiredLink2 = createMockLink({
        id: 'expired2',
        createdAt: new Date(cutoffDate.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days before cutoff
      })
      const validLink = createMockLink({
        id: 'valid1',
        createdAt: new Date(cutoffDate.getTime() + 24 * 60 * 60 * 1000), // 1 day after cutoff
      })

      await mockRepository.create(expiredLink1)
      await mockRepository.create(expiredLink2)
      await mockRepository.create(validLink)

      const deletedCount = await useCase.execute(ttlDays)

      expect(deletedCount).toBe(2)

      const remainingLinks = await mockRepository.findAll()
      expect(remainingLinks).toHaveLength(1)
      expect(remainingLinks[0]!.id).toBe('valid1')
    })

    it('should handle no expired links', async () => {
      const ttlDays = 7
      const validLink1 = createMockLink({
        id: 'valid1',
        createdAt: new Date(),
      })
      const validLink2 = createMockLink({
        id: 'valid2',
        createdAt: new Date(),
      })

      await mockRepository.create(validLink1)
      await mockRepository.create(validLink2)

      const deletedCount = await useCase.execute(ttlDays)

      expect(deletedCount).toBe(0)

      const remainingLinks = await mockRepository.findAll()
      expect(remainingLinks).toHaveLength(2)
    })

    it('should handle empty repository', async () => {
      const ttlDays = 7

      const deletedCount = await useCase.execute(ttlDays)

      expect(deletedCount).toBe(0)
    })

    it('should handle all links expired', async () => {
      const ttlDays = 7
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - ttlDays)

      const expiredLink1 = createMockLink({
        id: 'expired1',
        createdAt: new Date(cutoffDate.getTime() - 24 * 60 * 60 * 1000),
      })
      const expiredLink2 = createMockLink({
        id: 'expired2',
        createdAt: new Date(cutoffDate.getTime() - 2 * 24 * 60 * 60 * 1000),
      })

      await mockRepository.create(expiredLink1)
      await mockRepository.create(expiredLink2)

      const deletedCount = await useCase.execute(ttlDays)

      expect(deletedCount).toBe(2)

      const remainingLinks = await mockRepository.findAll()
      expect(remainingLinks).toHaveLength(0)
    })

    it('should handle different TTL values', async () => {
      const link = createMockLink({
        id: 'test1',
        createdAt: new Date(),
      })

      await mockRepository.create(link)

      // With 30 day TTL (link created today, should not be expired)
      const deletedCount30 = await useCase.execute(30)
      expect(deletedCount30).toBe(0)

      mockRepository.clear()
      await mockRepository.create(link)

      // With 0 day TTL (link should be expired)
      const deletedCount0 = await useCase.execute(0)
      expect(deletedCount0).toBe(1)
    })

    it('should handle links with different properties', async () => {
      const ttlDays = 7
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - ttlDays)

      const expiredLink = createMockLink({
        id: 'expired1',
        target: 'https://example.com',
        clicks: 5,
        createdAt: new Date(cutoffDate.getTime() - 24 * 60 * 60 * 1000),
      })

      await mockRepository.create(expiredLink)

      const deletedCount = await useCase.execute(ttlDays)

      expect(deletedCount).toBe(1)
    })

    it('should handle multiple cleanup operations', async () => {
      const ttlDays = 7
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - ttlDays)

      const expiredLink1 = createMockLink({
        id: 'expired1',
        createdAt: new Date(cutoffDate.getTime() - 24 * 60 * 60 * 1000),
      })
      const expiredLink2 = createMockLink({
        id: 'expired2',
        createdAt: new Date(cutoffDate.getTime() - 2 * 24 * 60 * 60 * 1000),
      })
      const expiredLink3 = createMockLink({
        id: 'expired3',
        createdAt: new Date(cutoffDate.getTime() - 3 * 24 * 60 * 60 * 1000),
      })

      await mockRepository.create(expiredLink1)
      await mockRepository.create(expiredLink2)
      await mockRepository.create(expiredLink3)

      const deletedCount = await useCase.execute(ttlDays)

      expect(deletedCount).toBe(3)

      const remainingLinks = await mockRepository.findAll()
      expect(remainingLinks).toHaveLength(0)
    })
  })
})

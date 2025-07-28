import { describe, it, expect, beforeEach } from 'vitest'
import { CleanupExpiredLinksUseCase } from 'application/use-cases/CleanupExpiredLinksUseCase'
import { MockLinkRepository } from '../../mocks'
import { TestData, TestHelpers } from '../../../utils'

describe('CleanupExpiredLinksUseCase', () => {
  let useCase: CleanupExpiredLinksUseCase
  let mockRepository: MockLinkRepository

  beforeEach(() => {
    mockRepository = new MockLinkRepository()
    useCase = new CleanupExpiredLinksUseCase(mockRepository)
  })

  describe('execute', () => {
    it('should return 0 when no links exist', async () => {
      const result = await useCase.execute(7)

      expect(result).toBe(0)
    })

    it('should return 0 when no links are expired', async () => {
      TestHelpers.freezeTime(new Date('2024-01-15T00:00:00Z'))

      const recentLinks = [
        TestData.createLink({
          id: 'recent1',
          createdAt: new Date('2024-01-10T00:00:00Z') // 5 days ago
        }),
        TestData.createLink({
          id: 'recent2',
          createdAt: new Date('2024-01-14T00:00:00Z') // 1 day ago
        }),
        TestData.createLink({
          id: 'recent3',
          createdAt: new Date('2024-01-15T00:00:00Z') // Today
        })
      ]

      for (const link of recentLinks) {
        await mockRepository.save(link)
      }

      const result = await useCase.execute(7) // 7 day TTL

      expect(result).toBe(0)
      expect(mockRepository.size()).toBe(3) // All links should remain

      TestHelpers.restoreTime()
    })

    it('should delete expired links and return count', async () => {
      TestHelpers.freezeTime(new Date('2024-01-15T00:00:00Z'))

      const links = [
        TestData.createLink({
          id: 'expired1',
          createdAt: new Date('2024-01-01T00:00:00Z') // 14 days ago
        }),
        TestData.createLink({
          id: 'expired2',
          createdAt: new Date('2024-01-05T00:00:00Z') // 10 days ago
        }),
        TestData.createLink({
          id: 'valid1',
          createdAt: new Date('2024-01-10T00:00:00Z') // 5 days ago
        }),
        TestData.createLink({
          id: 'valid2',
          createdAt: new Date('2024-01-14T00:00:00Z') // 1 day ago
        })
      ]

      for (const link of links) {
        await mockRepository.save(link)
      }

      const result = await useCase.execute(7) // 7 day TTL

      expect(result).toBe(2) // 2 expired links deleted
      expect(mockRepository.size()).toBe(2) // 2 valid links remain

      // Verify correct links remain
      expect(await mockRepository.findById('valid1')).toBeDefined()
      expect(await mockRepository.findById('valid2')).toBeDefined()
      expect(await mockRepository.findById('expired1')).toBeNull()
      expect(await mockRepository.findById('expired2')).toBeNull()

      TestHelpers.restoreTime()
    })

    it('should handle different TTL values', async () => {
      TestHelpers.freezeTime(new Date('2024-01-15T00:00:00Z'))

      const links = [
        TestData.createLink({
          id: 'old',
          createdAt: new Date('2024-01-01T00:00:00Z') // 14 days ago
        }),
        TestData.createLink({
          id: 'medium',
          createdAt: new Date('2024-01-10T00:00:00Z') // 5 days ago
        }),
        TestData.createLink({
          id: 'recent',
          createdAt: new Date('2024-01-14T00:00:00Z') // 1 day ago
        })
      ]

      for (const link of links) {
        await mockRepository.save(link)
      }

      // Test with 3 day TTL - should delete 2 links
      const result1 = await useCase.execute(3)
      expect(result1).toBe(2)
      expect(mockRepository.size()).toBe(1)
      expect(await mockRepository.findById('recent')).toBeDefined()

      TestHelpers.restoreTime()
    })

    it('should handle edge case of exactly expired link', async () => {
      TestHelpers.freezeTime(new Date('2024-01-08T00:00:00Z'))

      const links = [
        TestData.createLink({
          id: 'exactly',
          createdAt: new Date('2024-01-01T00:00:00Z') // Exactly 7 days ago
        }),
        TestData.createLink({
          id: 'justOver',
          createdAt: new Date('2023-12-31T23:59:59Z') // Just over 7 days ago
        })
      ]

      for (const link of links) {
        await mockRepository.save(link)
      }

      const result = await useCase.execute(7)

      expect(result).toBe(1) // Only the "just over" link should be deleted
      expect(await mockRepository.findById('exactly')).toBeDefined()
      expect(await mockRepository.findById('justOver')).toBeNull()

      TestHelpers.restoreTime()
    })

    it('should calculate cutoff date correctly', async () => {
      TestHelpers.freezeTime(new Date('2024-01-15T12:30:45Z'))

      const link = TestData.createLink({
        id: 'test',
        createdAt: new Date('2024-01-08T12:30:44Z') // 1 second before cutoff
      })

      await mockRepository.save(link)

      const result = await useCase.execute(7)

      expect(result).toBe(1) // Should be deleted
      expect(await mockRepository.findById('test')).toBeNull()

      TestHelpers.restoreTime()
    })

    it('should handle large numbers of expired links', async () => {
      TestHelpers.freezeTime(new Date('2024-01-15T00:00:00Z'))

      // Create 100 expired links
      for (let i = 0; i < 100; i++) {
        const link = TestData.createLink({
          id: `expired${i}`,
          createdAt: new Date('2024-01-01T00:00:00Z')
        })
        await mockRepository.save(link)
      }

      // Create 10 valid links
      for (let i = 0; i < 10; i++) {
        const link = TestData.createLink({
          id: `valid${i}`,
          createdAt: new Date('2024-01-14T00:00:00Z')
        })
        await mockRepository.save(link)
      }

      const result = await useCase.execute(7)

      expect(result).toBe(100)
      expect(mockRepository.size()).toBe(10)

      TestHelpers.restoreTime()
    })

    it('should handle zero TTL (delete all links)', async () => {
      const links = [
        TestData.createLink({ id: 'link1' }),
        TestData.createLink({ id: 'link2' }),
        TestData.createLink({ id: 'link3' })
      ]

      for (const link of links) {
        await mockRepository.save(link)
      }

      const result = await useCase.execute(0)

      expect(result).toBe(3)
      expect(mockRepository.size()).toBe(0)
    })
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { RedirectToTargetUseCase } from 'application/use-cases/RedirectToTargetUseCase'
import { MockLinkRepository } from '../../mocks'
import { TestData, TestHelpers } from '../../../utils'

describe('RedirectToTargetUseCase', () => {
  let useCase: RedirectToTargetUseCase
  let mockRepository: MockLinkRepository

  beforeEach(() => {
    mockRepository = new MockLinkRepository()
    useCase = new RedirectToTargetUseCase(mockRepository)
  })

  describe('execute', () => {
    it('should return target URL and increment clicks for valid link', async () => {
      const recentDate = new Date()
      recentDate.setDate(recentDate.getDate() - 1) // 1 day ago

      const link = TestData.createLink({
        id: 'test01',
        target: 'https://example.com',
        clicks: 5,
        createdAt: recentDate
      })

      await mockRepository.save(link)

      const result = await useCase.execute('test01', 30)

      expect(result).toBe('https://example.com')

      // Verify clicks were incremented
      const updatedLink = await mockRepository.findById('test01')
      expect(updatedLink!.clicks).toBe(6)
    })

    it('should throw LinkNotFoundError for non-existent link', async () => {
      await TestHelpers.expectDomainError(
        () => useCase.execute('nonexistent', 30),
        'LINK_NOT_FOUND',
        'nonexistent'
      )
    })

    it('should throw LinkExpiredError for expired link', async () => {
      TestHelpers.freezeTime(new Date('2024-01-15T00:00:00Z'))

      const expiredLink = TestData.createLink({
        id: 'expired01',
        target: 'https://example.com',
        createdAt: new Date('2024-01-01T00:00:00Z') // 14 days ago
      })

      await mockRepository.save(expiredLink)

      await TestHelpers.expectDomainError(
        () => useCase.execute('expired01', 7), // 7 day TTL
        'LINK_EXPIRED',
        'expired01'
      )

      TestHelpers.restoreTime()
    })

    it('should handle link that expires exactly at TTL boundary', async () => {
      TestHelpers.freezeTime(new Date('2024-01-08T00:00:00Z'))

      const link = TestData.createLink({
        id: 'boundary01',
        target: 'https://example.com',
        createdAt: new Date('2024-01-01T00:00:00Z') // Exactly 7 days ago
      })

      await mockRepository.save(link)

      // Should still be valid (not expired)
      const result = await useCase.execute('boundary01', 7)
      expect(result).toBe('https://example.com')

      TestHelpers.restoreTime()
    })

    it('should validate link ID format', async () => {
      await TestHelpers.expectError(
        () => useCase.execute('invalid@id', 30)
      )
    })

    it('should handle different TTL values', async () => {
      TestHelpers.freezeTime(new Date('2024-01-15T00:00:00Z'))

      const link = TestData.createLink({
        id: 'test01',
        target: 'https://example.com',
        createdAt: new Date('2024-01-10T00:00:00Z') // 5 days ago
      })

      await mockRepository.save(link)

      // Should be valid with 7 day TTL
      const result1 = await useCase.execute('test01', 7)
      expect(result1).toBe('https://example.com')

      // Should be expired with 3 day TTL
      await TestHelpers.expectDomainError(
        () => useCase.execute('test01', 3),
        'LINK_EXPIRED'
      )

      TestHelpers.restoreTime()
    })

    it('should increment clicks even for links with high click counts', async () => {
      const recentDate = new Date()
      recentDate.setDate(recentDate.getDate() - 1) // 1 day ago

      const link = TestData.createLink({
        id: 'popular01',
        target: 'https://example.com',
        clicks: 9999,
        createdAt: recentDate
      })

      await mockRepository.save(link)

      const result = await useCase.execute('popular01', 30)

      expect(result).toBe('https://example.com')

      const updatedLink = await mockRepository.findById('popular01')
      expect(updatedLink!.clicks).toBe(10000)
    })

    it('should handle links with zero clicks', async () => {
      const recentDate = new Date()
      recentDate.setDate(recentDate.getDate() - 1) // 1 day ago

      const link = TestData.createLink({
        id: 'new01',
        target: 'https://example.com',
        clicks: 0,
        createdAt: recentDate
      })

      await mockRepository.save(link)

      const result = await useCase.execute('new01', 30)

      expect(result).toBe('https://example.com')

      const updatedLink = await mockRepository.findById('new01')
      expect(updatedLink!.clicks).toBe(1)
    })

    it('should preserve all other link properties when updating clicks', async () => {
      const recentDate = new Date()
      recentDate.setDate(recentDate.getDate() - 1) // 1 day ago

      const originalLink = TestData.createLink({
        id: 'preserve01',
        target: 'https://example.com',
        clicks: 42,
        createdAt: recentDate
      })

      await mockRepository.save(originalLink)

      await useCase.execute('preserve01', 30)

      const updatedLink = await mockRepository.findById('preserve01')
      expect(updatedLink!.id).toBe('preserve01')
      expect(updatedLink!.target).toBe('https://example.com')
      expect(updatedLink!.clicks).toBe(43)
      expect(updatedLink!.createdAt).toEqual(recentDate)
    })
  })
})

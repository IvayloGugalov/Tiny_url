import { describe, it, expect, beforeEach } from 'vitest'
import { RedirectToTargetUseCase } from 'application/use-cases/RedirectToTargetUseCase'
import { MockLinkRepository } from 'tests/application/mocks/repositories/MockLinkRepository'
import { createMockLink } from 'tests/utils/test-data'

describe('RedirectToTargetUseCase', () => {
  let useCase: RedirectToTargetUseCase
  let mockRepository: MockLinkRepository

  beforeEach(() => {
    mockRepository = new MockLinkRepository()
    useCase = new RedirectToTargetUseCase(mockRepository)
  })

  describe('execute', () => {
    it('should return target URL for valid link ID', async () => {
      const link = createMockLink({
        id: 'test01',
        target: 'https://example.com',
        clicks: 5,
      })

      await mockRepository.create(link)

      const result = await useCase.execute('test01', 30)

      expect(result).toBe('https://example.com')
    })

    it('should increment clicks when redirecting', async () => {
      const link = createMockLink({
        id: 'test01',
        target: 'https://example.com',
        clicks: 5,
      })

      await mockRepository.create(link)

      await useCase.execute('test01', 30)

      const updatedLink = await mockRepository.findById('test01')
      expect(updatedLink!.clicks).toBe(6)
    })

    it('should throw error for non-existent link', async () => {
      await expect(useCase.execute('nonexistent', 30)).rejects.toThrow()
    })

    it('should throw error for expired link', async () => {
      const expiredLink = createMockLink({
        id: 'expired01',
        target: 'https://example.com',
        createdAt: new Date('2020-01-01T00:00:00Z'),
      })

      await mockRepository.create(expiredLink)

      await expect(useCase.execute('expired01', 30)).rejects.toThrow()
    })

    it('should handle links with zero clicks', async () => {
      const link = createMockLink({
        id: 'test01',
        target: 'https://example.com',
        clicks: 0,
      })

      await mockRepository.create(link)

      const result = await useCase.execute('test01', 30)

      expect(result).toBe('https://example.com')
    })

    it('should handle links with high click counts', async () => {
      const link = createMockLink({
        id: 'test01',
        target: 'https://example.com',
        clicks: 9999,
      })

      await mockRepository.create(link)

      const result = await useCase.execute('test01', 30)

      expect(result).toBe('https://example.com')
    })

    it('should handle links with complex URLs', async () => {
      const link = createMockLink({
        id: 'test01',
        target: 'https://www.google.com/search?q=test&param=value',
        clicks: 0,
      })

      await mockRepository.create(link)

      const result = await useCase.execute('test01', 30)

      expect(result).toBe('https://www.google.com/search?q=test&param=value')
    })

    it('should handle links with different domains', async () => {
      const link = createMockLink({
        id: 'test01',
        target: 'https://github.com/user/repo',
        clicks: 0,
      })

      await mockRepository.create(link)

      const result = await useCase.execute('test01', 30)

      expect(result).toBe('https://github.com/user/repo')
    })

    it('should not modify other links when redirecting', async () => {
      const originalLink = createMockLink({
        id: 'other01',
        target: 'https://other.com',
        clicks: 10,
      })

      const targetLink = createMockLink({
        id: 'test01',
        target: 'https://example.com',
        clicks: 5,
      })

      await mockRepository.create(originalLink)
      await mockRepository.create(targetLink)

      await useCase.execute('test01', 30)

      const otherLink = await mockRepository.findById('other01')
      expect(otherLink!.clicks).toBe(10)
    })
  })
})

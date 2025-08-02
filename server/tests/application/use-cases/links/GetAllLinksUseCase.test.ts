import { describe, it, expect, beforeEach } from 'vitest'
import { GetAllLinksUseCase } from 'application/use-cases/GetAllLinksUseCase'
import { MockLinkRepository } from 'tests/application/mocks/repositories/MockLinkRepository'
import { createMockLink } from 'tests/utils/test-data'

describe('GetAllLinksUseCase', () => {
  let useCase: GetAllLinksUseCase
  let mockRepository: MockLinkRepository

  beforeEach(() => {
    mockRepository = new MockLinkRepository()
    useCase = new GetAllLinksUseCase(mockRepository)
  })

  describe('execute', () => {
    it('should return all links from repository', async () => {
      const link1 = createMockLink({ id: 'link1', target: 'https://first.com' })
      const link2 = createMockLink({
        id: 'link2',
        target: 'https://second.com',
      })
      const link3 = createMockLink({ id: 'link3', target: 'https://third.com' })

      await mockRepository.create(link1)
      await mockRepository.create(link2)
      await mockRepository.create(link3)

      const result = await useCase.execute()

      expect(result).toHaveLength(3)
      expect(result).toEqual(expect.arrayContaining([link1, link2, link3]))
    })

    it('should return empty array when no links exist', async () => {
      const result = await useCase.execute()

      expect(result).toEqual([])
    })

    it('should return links in repository order', async () => {
      const links = [
        createMockLink({ id: 'first', target: 'https://first.com' }),
        createMockLink({ id: 'second', target: 'https://second.com' }),
        createMockLink({ id: 'third', target: 'https://third.com' }),
      ]

      for (const link of links) {
        await mockRepository.create(link)
      }

      const result = await useCase.execute()

      expect(result).toHaveLength(3)
      expect(result[0]!.id).toBe('first')
      expect(result[1]!.id).toBe('second')
      expect(result[2]!.id).toBe('third')
    })

    it('should handle links with different click counts', async () => {
      const originalLink = createMockLink({ clicks: 5 })
      await mockRepository.create(originalLink)

      const result = await useCase.execute()

      expect(result).toHaveLength(1)
      expect(result[0]!.clicks).toBe(5)
    })

    it('should handle links with different creation dates', async () => {
      const oldLink = createMockLink({
        createdAt: new Date('2023-01-01T00:00:00Z'),
      })
      const newLink = createMockLink({
        createdAt: new Date('2024-01-01T00:00:00Z'),
      })

      await mockRepository.create(oldLink)
      await mockRepository.create(newLink)

      const result = await useCase.execute()

      expect(result).toHaveLength(2)
      expect(result).toEqual(expect.arrayContaining([oldLink, newLink]))
    })

    it('should handle links with various click counts', async () => {
      const links = [
        createMockLink({ id: 'zero', clicks: 0 }),
        createMockLink({ id: 'low', clicks: 1 }),
        createMockLink({ id: 'medium', clicks: 100 }),
        createMockLink({ id: 'high', clicks: 9999 }),
      ]

      for (const link of links) {
        await mockRepository.create(link)
      }

      const result = await useCase.execute()

      expect(result).toHaveLength(4)
      const clickCounts = result.map((link) => link.clicks)
      expect(clickCounts).toEqual(expect.arrayContaining([0, 1, 100, 9999]))
    })
  })
})

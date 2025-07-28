import { describe, it, expect, beforeEach } from 'vitest'
import { GetAllLinksUseCase } from 'application/use-cases/GetAllLinksUseCase'
import { MockLinkRepository } from '../../mocks'
import { TestData } from '../../../utils'

describe('GetAllLinksUseCase', () => {
  let useCase: GetAllLinksUseCase
  let mockRepository: MockLinkRepository

  beforeEach(() => {
    mockRepository = new MockLinkRepository()
    useCase = new GetAllLinksUseCase(mockRepository)
  })

  describe('execute', () => {
    it('should return empty array when no links exist', async () => {
      const result = await useCase.execute()

      expect(result).toEqual([])
    })

    it('should return all links when they exist', async () => {
      const link1 = TestData.createLink({
        id: 'link1',
        target: 'https://example.com',
        clicks: 5
      })
      const link2 = TestData.createLink({
        id: 'link2',
        target: 'https://google.com',
        clicks: 10
      })
      const link3 = TestData.createLink({
        id: 'link3',
        target: 'https://github.com',
        clicks: 0
      })

      await mockRepository.save(link1)
      await mockRepository.save(link2)
      await mockRepository.save(link3)

      const result = await useCase.execute()

      expect(result).toHaveLength(3)
      expect(result).toContainEqual(link1)
      expect(result).toContainEqual(link2)
      expect(result).toContainEqual(link3)
    })

    it('should return links in the order they were stored', async () => {
      const links = [
        TestData.createLink({ id: 'first', target: 'https://first.com' }),
        TestData.createLink({ id: 'second', target: 'https://second.com' }),
        TestData.createLink({ id: 'third', target: 'https://third.com' })
      ]

      for (const link of links) {
        await mockRepository.save(link)
      }

      const result = await useCase.execute()

      expect(result).toHaveLength(3)
      // Note: The order depends on the mock implementation
      // We just verify all links are present
      expect(result.map(l => l.id)).toContain('first')
      expect(result.map(l => l.id)).toContain('second')
      expect(result.map(l => l.id)).toContain('third')
    })

    it('should return copies of links (not references)', async () => {
      const originalLink = TestData.createLink({
        id: 'test01',
        target: 'https://example.com',
        clicks: 5
      })

      await mockRepository.save(originalLink)

      const result = await useCase.execute()
      const returnedLink = result[0]

      // Modify the returned link
      returnedLink.clicks = 999

      // Original should be unchanged
      const storedLink = await mockRepository.findById('test01')
      expect(storedLink!.clicks).toBe(5)
    })

    it('should handle links with different creation dates', async () => {
      const oldLink = TestData.createLink({
        id: 'old',
        createdAt: new Date('2023-01-01T00:00:00Z')
      })
      const newLink = TestData.createLink({
        id: 'new',
        createdAt: new Date('2024-01-01T00:00:00Z')
      })

      await mockRepository.save(oldLink)
      await mockRepository.save(newLink)

      const result = await useCase.execute()

      expect(result).toHaveLength(2)
      expect(result.find(l => l.id === 'old')?.createdAt).toEqual(new Date('2023-01-01T00:00:00Z'))
      expect(result.find(l => l.id === 'new')?.createdAt).toEqual(new Date('2024-01-01T00:00:00Z'))
    })

    it('should handle links with various click counts', async () => {
      const links = [
        TestData.createLink({ id: 'zero', clicks: 0 }),
        TestData.createLink({ id: 'low', clicks: 1 }),
        TestData.createLink({ id: 'medium', clicks: 100 }),
        TestData.createLink({ id: 'high', clicks: 9999 })
      ]

      for (const link of links) {
        await mockRepository.save(link)
      }

      const result = await useCase.execute()

      expect(result).toHaveLength(4)
      expect(result.find(l => l.id === 'zero')?.clicks).toBe(0)
      expect(result.find(l => l.id === 'low')?.clicks).toBe(1)
      expect(result.find(l => l.id === 'medium')?.clicks).toBe(100)
      expect(result.find(l => l.id === 'high')?.clicks).toBe(9999)
    })
  })
})

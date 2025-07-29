import { describe, it, expect, beforeEach } from 'vitest'
import { GetUserLinksUseCase } from 'application/use-cases/GetUserLinksUseCase'
import { MockLinkRepository } from '../../mocks'
import { TestData } from '../../../utils'

describe('GetUserLinksUseCase', () => {
  let useCase: GetUserLinksUseCase
  let mockRepository: MockLinkRepository

  beforeEach(() => {
    mockRepository = new MockLinkRepository()
    useCase = new GetUserLinksUseCase(mockRepository)
  })

  describe('execute', () => {
    it('should return empty array when user has no links', async () => {
      const result = await useCase.execute('user123')

      expect(result).toEqual([])
    })

    it('should return only links belonging to the specified user', async () => {
      // Create links for different users
      const user1Link1 = TestData.createLink({
        id: 'link1',
        target: 'https://example1.com',
        userId: 'user1'
      })
      const user1Link2 = TestData.createLink({
        id: 'link2',
        target: 'https://example2.com',
        userId: 'user1'
      })
      const user2Link = TestData.createLink({
        id: 'link3',
        target: 'https://example3.com',
        userId: 'user2'
      })
      const anonymousLink = TestData.createLink({
        id: 'link4',
        target: 'https://example4.com',
        userId: undefined
      })

      await mockRepository.save(user1Link1)
      await mockRepository.save(user1Link2)
      await mockRepository.save(user2Link)
      await mockRepository.save(anonymousLink)

      const result = await useCase.execute('user1')

      expect(result).toHaveLength(2)
      expect(result.map(link => link.id)).toEqual(['link1', 'link2'])
      expect(result.every(link => link.userId === 'user1')).toBe(true)
    })

    it('should not return links from other users', async () => {
      const user1Link = TestData.createLink({
        id: 'user1link',
        target: 'https://user1.com',
        userId: 'user1'
      })
      const user2Link = TestData.createLink({
        id: 'user2link',
        target: 'https://user2.com',
        userId: 'user2'
      })

      await mockRepository.save(user1Link)
      await mockRepository.save(user2Link)

      const result = await useCase.execute('user1')

      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('user1link')
      expect(result[0].userId).toBe('user1')
    })

    it('should not return anonymous links (userId = null)', async () => {
      const userLink = TestData.createLink({
        id: 'userlink',
        target: 'https://user.com',
        userId: 'user1'
      })
      const anonymousLink = TestData.createLink({
        id: 'anonlink',
        target: 'https://anon.com',
        userId: undefined
      })

      await mockRepository.save(userLink)
      await mockRepository.save(anonymousLink)

      const result = await useCase.execute('user1')

      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('userlink')
      expect(result[0].userId).toBe('user1')
    })

    it('should return links with all properties intact', async () => {
      const link = TestData.createLink({
        id: 'testlink',
        target: 'https://test.com',
        clicks: 5,
        userId: 'user1',
        createdAt: new Date('2024-01-01')
      })

      await mockRepository.save(link)

      const result = await useCase.execute('user1')

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'testlink',
        target: 'https://test.com',
        clicks: 5,
        userId: 'user1',
        createdAt: new Date('2024-01-01')
      })
    })

    it('should handle multiple links with different click counts', async () => {
      const link1 = TestData.createLink({
        id: 'popular',
        target: 'https://popular.com',
        clicks: 100,
        userId: 'user1'
      })
      const link2 = TestData.createLink({
        id: 'new',
        target: 'https://new.com',
        clicks: 0,
        userId: 'user1'
      })

      await mockRepository.save(link1)
      await mockRepository.save(link2)

      const result = await useCase.execute('user1')

      expect(result).toHaveLength(2)
      const popularLink = result.find(link => link.id === 'popular')
      const newLink = result.find(link => link.id === 'new')
      
      expect(popularLink?.clicks).toBe(100)
      expect(newLink?.clicks).toBe(0)
    })
  })
})

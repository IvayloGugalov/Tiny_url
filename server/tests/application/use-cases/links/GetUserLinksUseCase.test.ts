import { describe, it, expect, beforeEach } from 'vitest'
import { GetUserLinksUseCase } from 'application/use-cases/GetUserLinksUseCase'
import { MockLinkRepository } from 'tests/application/mocks/repositories/MockLinkRepository'
import { createMockLink } from 'tests/utils/test-data'

describe('GetUserLinksUseCase', () => {
  let useCase: GetUserLinksUseCase
  let mockRepository: MockLinkRepository

  beforeEach(() => {
    mockRepository = new MockLinkRepository()
    useCase = new GetUserLinksUseCase(mockRepository)
  })

  describe('execute', () => {
    it('should return links for specific user', async () => {
      const userId = 'user1'
      const user1Link1 = createMockLink({ id: 'link1', userId })
      const user1Link2 = createMockLink({ id: 'link2', userId })
      const user2Link = createMockLink({ id: 'link3', userId: 'user2' })
      const anonymousLink = createMockLink({ id: 'link4', userId: undefined })

      await mockRepository.create(user1Link1)
      await mockRepository.create(user1Link2)
      await mockRepository.create(user2Link)
      await mockRepository.create(anonymousLink)

      const result = await useCase.execute(userId)

      expect(result).toHaveLength(2)
      expect(result).toEqual(expect.arrayContaining([user1Link1, user1Link2]))
    })

    it('should return empty array when user has no links', async () => {
      const userId = 'user1'
      const otherUserLink = createMockLink({ id: 'link1', userId: 'user2' })
      const anonymousLink = createMockLink({ id: 'link2', userId: undefined })

      await mockRepository.create(otherUserLink)
      await mockRepository.create(anonymousLink)

      const result = await useCase.execute(userId)

      expect(result).toEqual([])
    })

    it('should handle user with single link', async () => {
      const userId = 'user1'
      const userLink = createMockLink({ id: 'link1', userId })
      const anonymousLink = createMockLink({ id: 'link2', userId: undefined })

      await mockRepository.create(userLink)
      await mockRepository.create(anonymousLink)

      const result = await useCase.execute(userId)

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual(userLink)
    })

    it('should handle multiple users with links', async () => {
      const user1Id = 'user1'
      const user2Id = 'user2'
      const link1 = createMockLink({ id: 'link1', userId: user1Id })
      const link2 = createMockLink({ id: 'link2', userId: user2Id })

      await mockRepository.create(link1)
      await mockRepository.create(link2)

      const user1Result = await useCase.execute(user1Id)
      const user2Result = await useCase.execute(user2Id)

      expect(user1Result).toHaveLength(1)
      expect(user1Result[0]).toEqual(link1)
      expect(user2Result).toHaveLength(1)
      expect(user2Result[0]).toEqual(link2)
    })

    it('should handle links with different properties', async () => {
      const userId = 'user1'
      const link = createMockLink({
        id: 'link1',
        userId,
        target: 'https://example.com',
        clicks: 5,
      })

      await mockRepository.create(link)

      const result = await useCase.execute(userId)

      expect(result).toHaveLength(1)
      expect(result[0]!.target).toBe('https://example.com')
      expect(result[0]!.clicks).toBe(5)
    })

    it('should return links in repository order', async () => {
      const userId = 'user1'
      const link1 = createMockLink({ id: 'link1', userId })
      const link2 = createMockLink({ id: 'link2', userId })

      await mockRepository.create(link1)
      await mockRepository.create(link2)

      const result = await useCase.execute(userId)

      expect(result).toHaveLength(2)
      expect(result[0]!.id).toBe('link1')
      expect(result[1]!.id).toBe('link2')
    })
  })
})

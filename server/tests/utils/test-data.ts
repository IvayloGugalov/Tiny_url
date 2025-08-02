import type { Link, User } from 'shared'

export const createMockLink = (overrides: Partial<Link> = {}): Link => ({
  id: 'test-link-1',
  target: 'https://example.com',
  clicks: 0,
  userId: 'test-user-1',
  createdAt: new Date(),
  ...overrides,
})

export const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: 'test-user-1',
  email: 'test@example.com',
  name: 'Test User',
  createdAt: new Date('2024-01-01T00:00:00Z'),
  ...overrides,
})

export const createMockLinks = (count: number): Link[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockLink({
      id: `test-link-${index + 1}`,
      target: `https://example${index + 1}.com`,
      clicks: index * 10,
    }),
  )
}

export const createMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockUser({
      id: `test-user-${index + 1}`,
      email: `test${index + 1}@example.com`,
      name: `Test User ${index + 1}`,
    }),
  )
}

import type { Link } from 'domain/entities/Link'
import type { User } from 'domain/entities/User'
import { LinkDomain } from 'domain/entities/Link'
import { UserDomain } from 'domain/entities/User'

export const TestData = {
  // Valid test data
  validEmails: [
    'test@example.com',
    'user@domain.org',
    'admin@company.co.uk'
  ],

  validUrls: [
    'https://example.com',
    'http://test.org',
    'https://www.google.com/search?q=test',
    'https://subdomain.example.com/path/to/resource'
  ],

  validLinkIds: [
    'abc123',
    'test01',
    'link_1',
    'short-url'
  ],

  validUserIds: [
    'user123',
    'admin',
    'test_user',
    'user-456'
  ],

  // Invalid test data
  invalidEmails: [
    '',
    'invalid',
    '@domain.com',
    'user@',
    'user@domain',
    'user.domain.com',
    'a'.repeat(255) + '@domain.com' // too long
  ],

  invalidUrls: [
    '',
    'invalid-url',
    'ftp://example.com',
    'javascript:alert(1)',
    'http://',
    'https://',
    'not-a-url',
    'a'.repeat(2050) // too long
  ],

  invalidLinkIds: [
    '',
    'ab', // too short
    'a'.repeat(51), // too long
    'invalid@id',
    'id with spaces',
    'id#with$special%chars'
  ],

  invalidUserIds: [
    '',
    'ab', // too short
    'a'.repeat(51), // too long
    'invalid@id',
    'id with spaces',
    'id#with$special%chars'
  ],

  // Factory methods for creating test entities
  createLink: (overrides: Partial<Link> = {}): Link => {
    const defaults = {
      id: 'test01',
      target: 'https://example.com',
      clicks: 0,
      createdAt: new Date('2024-01-01T00:00:00Z')
    }
    return LinkDomain.fromPersistence({ ...defaults, ...overrides })
  },

  createUser: (overrides: Partial<User> = {}): User => {
    const defaults = {
      id: 'user123',
      email: 'test@example.com',
      name: 'Test User',
      createdAt: new Date('2024-01-01T00:00:00Z')
    }
    return UserDomain.fromPersistence({ ...defaults, ...overrides })
  },

  // Date helpers
  dates: {
    past: new Date('2023-01-01T00:00:00Z'),
    now: new Date('2024-01-01T00:00:00Z'),
    future: new Date('2025-01-01T00:00:00Z'),

    daysAgo: (days: number): Date => {
      const date = new Date()
      date.setDate(date.getDate() - days)
      return date
    },

    daysFromNow: (days: number): Date => {
      const date = new Date()
      date.setDate(date.getDate() + days)
      return date
    }
  }
}

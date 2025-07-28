import { describe, it, expect, beforeEach } from 'vitest'
import { ShortLinkIdGenerator } from 'domain/services/LinkIdGenerator'
import { LinkIdDomain } from 'domain/value-objects/LinkId'

describe('ShortLinkIdGenerator', () => {
  let generator: ShortLinkIdGenerator

  beforeEach(() => {
    generator = new ShortLinkIdGenerator()
  })

  describe('generate', () => {
    it('should generate a valid LinkId with default length', () => {
      const id = generator.generate()

      expect(id).toBeDefined()
      expect(typeof id).toBe('string')
      expect(id.length).toBe(6)

      // Should be a valid LinkId
      expect(() => LinkIdDomain.create(id)).not.toThrow()
    })

    it('should generate a valid LinkId with custom length', () => {
      const lengths = [3, 8, 10, 15]

      lengths.forEach(length => {
        const id = generator.generate(length)

        expect(id).toBeDefined()
        expect(typeof id).toBe('string')
        expect(id.length).toBe(length)

        // Should be a valid LinkId
        expect(() => LinkIdDomain.create(id)).not.toThrow()
      })
    })

    it('should generate IDs using only valid characters', () => {
      const validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

      for (let i = 0; i < 100; i++) {
        const id = generator.generate()

        for (const char of id) {
          expect(validChars.includes(char)).toBe(true)
        }
      }
    })

    it('should generate different IDs on subsequent calls', () => {
      const ids = new Set<string>()
      const iterations = 1000

      for (let i = 0; i < iterations; i++) {
        const id = generator.generate()
        ids.add(id)
      }

      // With 62 possible characters and 6 character length,
      // we should get mostly unique IDs in 1000 iterations
      expect(ids.size).toBeGreaterThan(iterations * 0.95)
    })

    it('should handle minimum valid length', () => {
      const id = generator.generate(3)

      expect(id.length).toBe(3)
      expect(() => LinkIdDomain.create(id)).not.toThrow()
    })

    it('should handle maximum valid length', () => {
      const id = generator.generate(50)

      expect(id.length).toBe(50)
      expect(() => LinkIdDomain.create(id)).not.toThrow()
    })

    it('should generate IDs that match LinkId regex pattern', () => {
      const linkIdRegex = /^[a-zA-Z0-9_-]+$/

      for (let i = 0; i < 100; i++) {
        const id = generator.generate()
        expect(linkIdRegex.test(id)).toBe(true)
      }
    })

    it('should have good distribution of characters', () => {
      const charCounts = new Map<string, number>()
      const iterations = 10000

      for (let i = 0; i < iterations; i++) {
        const id = generator.generate(3) // Use minimum valid length
        // Count each character in the ID
        for (const char of id) {
          charCounts.set(char, (charCounts.get(char) || 0) + 1)
        }
      }

      // Should have used a reasonable variety of characters
      expect(charCounts.size).toBeGreaterThan(50) // Out of 62 possible

      // No character should be overly dominant
      const maxCount = Math.max(...charCounts.values())
      const expectedAverage = (iterations * 3) / 62 // 3 chars per ID
      expect(maxCount).toBeLessThan(expectedAverage * 2)
    })
  })
})

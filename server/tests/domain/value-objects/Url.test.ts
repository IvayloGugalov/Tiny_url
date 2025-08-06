import { describe, it, expect } from 'vitest'
import { UrlDomain } from '@/domain/value-objects/Url'

describe('UrlDomain', () => {
  const validUrls = [
    'https://example.com',
    'http://test.org',
    'https://www.google.com/search?q=test',
    'https://subdomain.example.com/path/to/resource',
  ]

  const invalidUrls = [
    '',
    'invalid-url',
    'ftp://example.com',
    'javascript:alert(1)',
    'http://',
    'https://',
    'not-a-url',
    'a'.repeat(2050), // too long
  ]

  describe('create', () => {
    validUrls.forEach((url) => {
      it(`should create valid URL: ${url}`, () => {
        const result = UrlDomain.create(url)
        expect(result).toBe(url)
      })
    })

    invalidUrls.forEach((url) => {
      it(`should reject invalid URL: ${url}`, () => {
        expect(() => UrlDomain.create(url)).toThrow()
      })
    })
  })

  describe('equals', () => {
    it('should return true for identical URLs', () => {
      const url1 = UrlDomain.create('https://example.com')
      const url2 = UrlDomain.create('https://example.com')

      expect(UrlDomain.equals(url1, url2)).toBe(true)
    })

    it('should return false for different URLs', () => {
      const url1 = UrlDomain.create('https://example.com')
      const url2 = UrlDomain.create('https://other.com')

      expect(UrlDomain.equals(url1, url2)).toBe(false)
    })
  })

  describe('toString', () => {
    it('should return the URL string', () => {
      const url = UrlDomain.create('https://example.com')
      expect(UrlDomain.toString(url)).toBe('https://example.com')
    })
  })

  describe('getDomain', () => {
    it('should extract domain from URL', () => {
      const url = UrlDomain.create('https://www.example.com/path')
      const domain = UrlDomain.getDomain(url)
      expect(domain).toBe('www.example.com')
    })

    it('should handle URLs without path', () => {
      const url = UrlDomain.create('https://example.com')
      const domain = UrlDomain.getDomain(url)
      expect(domain).toBe('example.com')
    })

    it('should handle URLs with query parameters', () => {
      const url = UrlDomain.create('https://example.com?param=value')
      const domain = UrlDomain.getDomain(url)
      expect(domain).toBe('example.com')
    })
  })
})

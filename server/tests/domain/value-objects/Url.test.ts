import { describe, it, expect } from 'vitest'
import { UrlDomain } from 'domain/value-objects/Url'
import { TestData, TestHelpers } from '../../utils'

describe('UrlDomain', () => {
  describe('create', () => {
    it('should create valid URLs', () => {
      TestData.validUrls.forEach(url => {
        const result = UrlDomain.create(url)
        expect(result).toBe(url)
      })
    })

    it('should throw InvalidUrlError for invalid URLs', () => {
      TestData.invalidUrls.forEach(url => {
        expect(() => UrlDomain.create(url)).toThrow()
      })
    })

    it('should trim whitespace', () => {
      const url = '  https://example.com  '
      const result = UrlDomain.create(url)
      expect(result).toBe('https://example.com')
    })

    it('should accept both HTTP and HTTPS protocols', () => {
      expect(UrlDomain.create('http://example.com')).toBe('http://example.com')
      expect(UrlDomain.create('https://example.com')).toBe('https://example.com')
    })

    it('should reject other protocols', () => {
      expect(() => UrlDomain.create('ftp://example.com')).toThrow()
      expect(() => UrlDomain.create('file://example.com')).toThrow()
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
      const url2 = UrlDomain.create('https://google.com')
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
      expect(UrlDomain.getDomain('https://example.com')).toBe('example.com')
      expect(UrlDomain.getDomain('http://subdomain.example.com/path')).toBe('subdomain.example.com')
      expect(UrlDomain.getDomain('https://www.google.com/search?q=test')).toBe('www.google.com')
    })

    it('should throw InvalidUrlError for invalid URLs', () => {
      TestHelpers.expectDomainError(
        () => UrlDomain.getDomain('invalid-url'),
        'INVALID_URL'
      )
    })
  })
})

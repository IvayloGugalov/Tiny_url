import { ValidationError } from './errors'

export const validateEmail = (email: string): void => {
  if (!email) {
    throw new ValidationError('Email is required')
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format')
  }
}

export const validateUrl = (url: string): void => {
  if (!url || typeof url !== 'string') {
    throw new ValidationError('URL is required and must be a string')
  }
  
  try {
    new URL(url)
  } catch {
    throw new ValidationError('Invalid URL format')
  }
}

export const validateRequired = (value: any, fieldName: string): void => {
  if (value === undefined || value === null || value === '') {
    throw new ValidationError(`${fieldName} is required`)
  }
}

export const validateString = (value: any, fieldName: string, minLength?: number, maxLength?: number): void => {
  validateRequired(value, fieldName)
  
  if (typeof value !== 'string') {
    throw new ValidationError(`${fieldName} must be a string`)
  }
  
  if (minLength && value.length < minLength) {
    throw new ValidationError(`${fieldName} must be at least ${minLength} characters long`)
  }
  
  if (maxLength && value.length > maxLength) {
    throw new ValidationError(`${fieldName} must be no more than ${maxLength} characters long`)
  }
}

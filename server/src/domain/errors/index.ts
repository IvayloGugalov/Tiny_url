// Domain-specific errors - no external dependencies
export abstract class DomainError extends Error {
  abstract readonly code: string
  
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}

export class InvalidUrlError extends DomainError {
  readonly code = 'INVALID_URL'
  
  constructor(url: string) {
    super(`Invalid URL: ${url}`)
  }
}

export class InvalidEmailError extends DomainError {
  readonly code = 'INVALID_EMAIL'
  
  constructor(email: string) {
    super(`Invalid email address: ${email}`)
  }
}

export class LinkNotFoundError extends DomainError {
  readonly code = 'LINK_NOT_FOUND'
  
  constructor(id: string) {
    super(`Link not found: ${id}`)
  }
}

export class UserNotFoundError extends DomainError {
  readonly code = 'USER_NOT_FOUND'
  
  constructor(identifier: string) {
    super(`User not found: ${identifier}`)
  }
}

export class DuplicateEmailError extends DomainError {
  readonly code = 'DUPLICATE_EMAIL'
  
  constructor(email: string) {
    super(`Email already exists: ${email}`)
  }
}

export class InvalidCredentialsError extends DomainError {
  readonly code = 'INVALID_CREDENTIALS'
  
  constructor() {
    super('Invalid email or password')
  }
}

export class LinkExpiredError extends DomainError {
  readonly code = 'LINK_EXPIRED'
  
  constructor(id: string) {
    super(`Link has expired: ${id}`)
  }
}

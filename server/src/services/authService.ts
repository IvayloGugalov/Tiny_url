import { SignJWT, jwtVerify } from 'jose'
import { config } from '../config'
import { UserRepository } from '../repositories/userRepository'
import { UnauthorizedError, ConflictError } from '../utils/errors'
import { validateEmail, validateRequired } from '../utils/validation'
import { logger } from './logger'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  name?: string
}

export interface AuthResult {
  token: string
  user: {
    id: string
    email: string
    name: string | null
  }
}

export interface JWTPayload {
  email: string
  userId?: string
  [propName: string]: any
}

export class AuthService {
  private readonly jwtSecretKey: Uint8Array

  constructor(private userRepository: UserRepository) {
    this.jwtSecretKey = new TextEncoder().encode(config.auth.jwtSecret)
  }

  async login(credentials: LoginCredentials): Promise<{ token: string }> {
    validateRequired(credentials.email, 'email')
    validateRequired(credentials.password, 'password')

    // For now, using hardcoded credentials as in original code
    if (credentials.email !== config.auth.defaultEmail ||
        credentials.password !== config.auth.defaultPassword) {
      logger.warn('Login attempt with invalid credentials', {
        email: credentials.email,
      })
      throw new UnauthorizedError('Invalid email or password')
    }

    const token = await this.generateToken({ email: credentials.email })

    logger.info('Successful login', { email: credentials.email })
    return { token }
  }

  async register(data: RegisterData): Promise<AuthResult> {
    validateEmail(data.email)

    const existingUser = await this.userRepository.existsByEmail(data.email)
    if (existingUser) {
      throw new ConflictError('User with this email already exists')
    }

    const user = await this.userRepository.create({
      email: data.email,
      name: data.name,
    })

    const token = await this.generateToken({
      email: user.email,
      userId: user.id
    })

    logger.info('Successful registration', { email: user.email, userId: user.id })

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  }

  async verifyToken(token: string): Promise<JWTPayload> {
    try {
      const { payload } = await jwtVerify(token, this.jwtSecretKey)
      return payload as JWTPayload
    } catch (error) {
      throw new UnauthorizedError('Invalid token')
    }
  }

  async validateUser(userId: string): Promise<{ id: string; email: string; name: string | null }> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new UnauthorizedError('User not found')
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  }

  private async generateToken(payload: JWTPayload): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(this.jwtSecretKey)
  }
}

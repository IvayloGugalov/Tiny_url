import { z } from 'zod'

export const EmailSchema = z.email().min(1).max(254)
export const UrlSchema = z
  .string()
  .min(1)
  .max(2048)
  .transform((val) => val.trim())
  .refine(
    (val) => {
      try {
        const url = new URL(val)
        return ['http:', 'https:'].includes(url.protocol)
      } catch {
        return false
      }
    },
    { message: 'Invalid URL format' },
  )
export const LinkIdSchema = z
  .string()
  .min(3)
  .max(50)
  .regex(/^[a-zA-Z0-9_-]+$/)
export const UserIdSchema = z
  .string()
  .min(3)
  .max(50)
  .regex(/^[a-zA-Z0-9_-]+$/)
export const NameSchema = z.string().max(100).optional()

export const LinkSchema = z.object({
  id: LinkIdSchema,
  target: UrlSchema,
  clicks: z.number().int().min(0),
  userId: UserIdSchema.optional(),
  createdAt: z.date(),
})

export const UserSchema = z.object({
  id: UserIdSchema,
  email: EmailSchema,
  name: NameSchema,
  createdAt: z.date(),
})

export type Link = z.infer<typeof LinkSchema>
export type User = z.infer<typeof UserSchema>
export type Email = z.infer<typeof EmailSchema>
export type Url = z.infer<typeof UrlSchema>
export type LinkId = z.infer<typeof LinkIdSchema>
export type UserId = z.infer<typeof UserIdSchema>

export const CreateLinkRequestSchema = z.object({ target: UrlSchema })
export const CreateLinkResponseSchema = z.object({
  id: LinkIdSchema,
  shortUrl: UrlSchema,
})
export const LoginRequestSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1).max(128),
})
export const LoginResponseSchema = z.object({ token: z.string() })
export const RegisterRequestSchema = z.object({
  email: EmailSchema,
  name: NameSchema,
})
export const RegisterResponseSchema = z.object({
  token: z.string(),
  user: UserSchema,
})
export const HealthResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
})

export type CreateLinkRequest = z.infer<typeof CreateLinkRequestSchema>
export type CreateLinkResponse = z.infer<typeof CreateLinkResponseSchema>
export type LoginRequest = z.infer<typeof LoginRequestSchema>
export type LoginResponse = z.infer<typeof LoginResponseSchema>
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>
export type HealthResponse = z.infer<typeof HealthResponseSchema>

export const ClientUserSchema = UserSchema.pick({
  id: true,
  email: true,
}).extend({
  name: z.string().nullable(),
})
export const ClientRegisterResponseSchema = RegisterResponseSchema.pick({
  token: true,
  user: true,
}).extend({
  user: ClientUserSchema,
})

export type ClientUser = z.infer<typeof ClientUserSchema>
export type ClientRegisterResponse = z.infer<
  typeof ClientRegisterResponseSchema
>

export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export const API_ENDPOINTS = {
  health: '/api/health',
  links: '/api/links',
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
} as const

export const ERROR_CODES = {
  INVALID_URL: 'INVALID_URL',
  INVALID_EMAIL: 'INVALID_EMAIL',
  LINK_NOT_FOUND: 'LINK_NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  DUPLICATE_EMAIL: 'DUPLICATE_EMAIL',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  LINK_EXPIRED: 'LINK_EXPIRED',
  AUTHENTICATION_REQUIRED: 'AUTHENTICATION_REQUIRED',
} as const

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES]

import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { ApiResponse } from './api'

// Mock fetch global
const mockFetch = vi.fn()
global.fetch = mockFetch

// Mock react-cookie - must be before any imports that use it
const mockCookies = {
  get: vi.fn(),
  set: vi.fn(),
  remove: vi.fn(),
  getAll: vi.fn(),
  addChangeListener: vi.fn(),
  removeChangeListener: vi.fn(),
}

vi.mock('react-cookie', () => ({
  Cookies: vi.fn(() => mockCookies),
}))

// Dynamic import after mock is set up
const { api, setApiToken } = await import('./api')

describe('API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:8000/api/v1')
    setApiToken(null)
  })

  describe('setApiToken', () => {
    it('should store token in memory and cookie', () => {
      setApiToken('test-token-123')
      expect(mockCookies.set).toHaveBeenCalledWith('auth_token', 'test-token-123', expect.any(Object))
    })

    it('should remove token when null is passed', () => {
      setApiToken(null)
      expect(mockCookies.remove).toHaveBeenCalledWith('auth_token', { path: '/' })
    })
  })

  describe('request helpers', () => {
    it('should make GET request', async () => {
      const mockResponse: ApiResponse<{ id: number }> = {
        status: 200,
        body: { id: 1 },
        statusText: 'OK',
        total: 1,
      }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: { get: () => 'application/json' },
        json: async () => ({ id: 1 }),
      })

      const result = await api.get<{ id: number }>('/users/1')
      expect(result).toEqual(mockResponse)
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/users/1',
        expect.objectContaining({ method: 'GET' })
      )
    })

    it('should make POST request with body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        statusText: 'Created',
        headers: { get: () => 'application/json' },
        json: async () => ({ id: 2, name: 'Test' }),
      })

      const result = await api.post('/users', { name: 'Test' })
      expect(result.status).toBe(201)
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/users',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ name: 'Test' }),
        })
      )
    })

    it('should throw ApiErrorResponse on 400', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Validation Error',
        headers: { get: () => 'application/json' },
        json: async () => ({ email: 'Email inválido' }),
      })

      await expect(api.post('/users', { email: 'invalid' })).rejects.toMatchObject({
        status: 400,
        body: { email: 'Email inválido' },
        statusText: 'Validation Error',
        total: 0,
      })
    })

    it('should throw ApiErrorResponse on 401', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        headers: { get: () => 'application/json' },
        json: async () => null,
      })

      await expect(api.get('/protected')).rejects.toMatchObject({
        status: 401,
        body: null,
        statusText: 'Unauthorized',
        total: 0,
      })
    })

    it('should throw ApiErrorResponse on 403', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        headers: { get: () => 'application/json' },
        json: async () => null,
      })

      await expect(api.get('/admin')).rejects.toMatchObject({
        status: 403,
        body: null,
        statusText: 'Forbidden',
        total: 0,
      })
    })

    it('should throw ApiErrorResponse on 404', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: { get: () => 'application/json' },
        json: async () => null,
      })

      await expect(api.get('/users/999')).rejects.toMatchObject({
        status: 404,
        body: null,
        statusText: 'Not Found',
        total: 0,
      })
    })

    it('should throw ApiErrorResponse on 500', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: { get: () => 'application/json' },
        json: async () => null,
      })

      await expect(api.get('/error')).rejects.toMatchObject({
        status: 500,
        body: null,
        statusText: 'Internal Server Error',
        total: 0,
      })
    })

    it('should throw ApiErrorResponse on 503 (OfflineMode)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'OfflineMode',
        headers: { get: () => 'application/json' },
        json: async () => null,
      })

      await expect(api.get('/offline')).rejects.toMatchObject({
        status: 503,
        body: null,
        statusText: 'OfflineMode',
        total: 0,
      })
    })

    it('should include Authorization header when token is set', async () => {
      setApiToken('bearer-token-123')
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: { get: () => 'application/json' },
        json: async () => ({ data: 'ok' }),
      })

      await api.get('/protected')
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer bearer-token-123',
          }),
        })
      )
    })

    it('should throw if VITE_API_BASE_URL is not set', async () => {
      vi.stubEnv('VITE_API_BASE_URL', '')
      await expect(api.get('/test')).rejects.toThrow('VITE_API_BASE_URL no está configurado')
    })
  })
})
import { Cookies } from 'react-cookie'

// Tipos de respuesta estándar (contrato API)
export interface ApiResponse<T> {
  status: number
  body: T
  statusText: string
  total: number | null
}

export interface ApiErrorResponse extends ApiResponse<Record<string, string> | null> {
  status: 400 | 401 | 403 | 404 | 500 | 503
}

// Instancia de cookies lazy (se crea al primer uso)
let cookiesInstance: Cookies | null = null

function getCookies(): Cookies {
  if (!cookiesInstance) {
    cookiesInstance = new Cookies()
  }
  return cookiesInstance
}

// Token de autenticación de usuario (JWT en cookie)
let authToken: string | null = null

function getAuthToken(): string | null {
  if (authToken) return authToken
  // Intentar leer de cookie
  const cookieToken = getCookies().get('auth_token')
  if (cookieToken) {
    authToken = cookieToken
    return authToken
  }
  return null
}

export function setApiToken(token: string | null): void {
  authToken = token
  if (token) {
    getCookies().set('auth_token', token, {
      path: '/',
      secure: window.location.protocol === 'https:',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    })
  } else {
    getCookies().remove('auth_token', { path: '/' })
  }
}

// Token de API compartido (para autenticación frontend-backend)
let apiToken: string | null = null

function getApiToken(): string | null {
  if (apiToken) return apiToken
  // Leer de variable de entorno
  const envToken = import.meta.env.VITE_API_TOKEN
  if (envToken) {
    apiToken = envToken
    return apiToken
  }
  return null
}

// Rutas que requieren el token de API compartido
const API_TOKEN_PATHS = ['/sugerencias', '/contacto']

function requiresApiToken(path: string): boolean {
  return API_TOKEN_PATHS.some(p => path.startsWith(p))
}

function getBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  if (!baseUrl) {
    throw new Error('VITE_API_BASE_URL no está configurado')
  }
  return baseUrl.replace(/\/+$/, '')
}

async function request<T>(
  method: string,
  path: string,
  options: { body?: unknown; headers?: Record<string, string> } = {}
): Promise<ApiResponse<T>> {
  const url = `${getBaseUrl()}${path}`
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  // 1. Token de autenticación de usuario (JWT) - para endpoints que lo requieran
  const userToken = getAuthToken()
  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`
  }

  // 2. Token de API compartido (para endpoints protegidos del backend)
  if (requiresApiToken(path)) {
    const token = getApiToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  const response = await fetch(url, {
    method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  let data: unknown = null
  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    try {
      data = await response.json()
    } catch {
      data = null
    }
  }

  if (!response.ok) {
    const errorBody = data as Record<string, string> | null
    const error: ApiErrorResponse = {
      status: response.status as 400 | 401 | 403 | 404 | 500 | 503,
      body: errorBody,
      statusText: response.statusText || getStatusText(response.status),
      total: 0,
    }
    throw error
  }

  return {
    status: response.status,
    body: data as T,
    statusText: response.statusText || 'OK',
    total: Array.isArray(data) ? data.length : 1,
  }
}

function getStatusText(status: number): string {
  switch (status) {
    case 200:
      return 'OK'
    case 201:
      return 'Created'
    case 400:
      return 'Validation Error'
    case 401:
      return 'Unauthorized'
    case 403:
      return 'Forbidden'
    case 404:
      return 'Not Found'
    case 500:
      return 'Internal Server Error'
    case 503:
      return 'OfflineMode'
    default:
      return 'Error'
  }
}

export const api = {
  get: <T>(path: string, headers?: Record<string, string>) =>
    request<T>('GET', path, { headers }),

  post: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>('POST', path, { body, headers }),

  put: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>('PUT', path, { body, headers }),

  patch: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>('PATCH', path, { body, headers }),

  delete: <T>(path: string, headers?: Record<string, string>) =>
    request<T>('DELETE', path, { headers }),
}

// Inicializar token desde cookie al cargar (solo en browser)
if (typeof window !== 'undefined') {
  const storedToken = getCookies().get('auth_token')
  if (storedToken) {
    authToken = storedToken
  }
}
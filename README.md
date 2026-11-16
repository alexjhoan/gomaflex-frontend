# gomaflex-frontend

Frontend SPA para gomaflex - Plataforma de gestión para talleres mecánicos.

## Stack Tecnológico

- **Framework**: React 18 + TypeScript 5 + Vite 5
- **Routing**: React Router v6 (SPA mode)
- **UI**: shadcn/ui (Radix UI + Tailwind CSS)
- **State Management**: TanStack Query v5 (React Query)
- **Styling**: Tailwind CSS 3
- **Testing**: Vitest + @testing-library/react
- **Linting**: ESLint (flat config) + Prettier
- **Container**: Docker multi-stage (Node 20 Alpine → Nginx Alpine)

## Requisitos Previos

- Node.js 20+
- npm 10+
- Docker (para build de producción)

## Instalación

```bash
# Clonar el repositorio
cd gomaflex-frontend

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Editar .env con tus valores
# VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo en http://localhost:5173 con HMR |
| `npm run build` | Compila para producción en `dist/` (typecheck + vite build) |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | Ejecuta ESLint (0 warnings/errors) |
| `npm run typecheck` | Verifica tipos TypeScript (0 errores) |
| `npm run test` | Ejecuta tests unitarios con Vitest |

## Variables de Entorno

| Variable | Requerida | Descripción | Ejemplo |
|----------|-----------|-------------|---------|
| `VITE_API_BASE_URL` | Sí | URL base de la API backend | `http://localhost:8000/api/v1` |
| `VITE_APP_ORIGIN` | No | Origen de la app para CORS | `http://localhost:5173` |
| `VITE_APP_NAME` | No | Nombre de la aplicación | `gomaflex` |

> **Nota**: `VITE_API_BASE_URL` es obligatoria en build de producción. El build fallará si no está configurada.

## Estructura del Proyecto

```
src/
├── components/
│   ├── ui/           # Componentes shadcn/ui (Button, Input, Card, Dialog, etc.)
│   └── layout/       # Layout components (Header, Main, Footer, Layout)
├── hooks/            # Custom hooks (useAuth, useApi, etc.)
├── pages/            # Páginas (Home, Login, Dashboard)
├── services/
│   └── api.ts        # Cliente API + tipos + setApiToken
├── utils/
│   └── cn.ts         # Utility clsx + tailwind-merge
├── App.tsx           # Root component con Routes
├── main.tsx          # Entry point (QueryClientProvider + BrowserRouter)
├── routes.tsx        # Definición de rutas
├── index.css         # Tailwind imports + CSS variables
└── vite-env.d.ts     # Tipos de variables de entorno Vite
```

## Rutas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | Home | Landing page con Hero + Features |
| `/login` | Login | Formulario de login (placeholder) |
| `/dashboard` | Dashboard | Área protegida con stats (placeholder) |

## API Client

El cliente API (`src/services/api.ts`) expone:

```typescript
import { api, setApiToken } from '@/services/api'

// Configurar token JWT (se guarda en cookie)
setApiToken('eyJhbGciOiJIUzI1NiIs...')

// Métodos HTTP tipados
const users = await api.get<User[]>('/users/')
const user = await api.post<User>('/users/', { name: 'Juan' })
const updated = await api.patch<User>('/users/1', { name: 'Juan Updated' })
await api.delete('/users/1')
```

### Manejo de Errores

El cliente lanza `ApiErrorResponse` con códigos estándar:

| Código | statusText | Acción |
|--------|------------|--------|
| 400 | Validation Error | Mostrar errores de campo |
| 401 | Unauthorized | Redirect a `/login` |
| 403 | Forbidden | Toast "Sin permisos" |
| 404 | Not Found | Toast "No encontrado" |
| 500 | Internal Server Error | Toast "Error del servidor" |
| 503 | OfflineMode | Encolar en LocalForage (futuro) |

## Desarrollo

### Agregar componentes shadcn/ui

```bash
npx shadcn@latest add [component-name]
```

### Ejecutar tests

```bash
npm run test           # Modo watch
npm run test -- --run  # Una sola ejecución (CI)
```

## Build y Deploy con Docker

```bash
# Build imagen (requiere VITE_API_BASE_URL)
docker build --build-arg VITE_API_BASE_URL=https://api.tu-dominio.com/api/v1 -t gomaflex-frontend .

# Run container
docker run -d -p 80:80 gomaflex-frontend

# La app estará disponible en http://localhost
```

### Docker Multi-stage

La imagen final usa Nginx Alpine (~25MB) y sirve archivos estáticos con:
- SPA routing (`try_files $uri /index.html`)
- Gzip compression
- Cache headers para assets hasheados
- Security headers

## Convenciones de Código

- **TypeScript strict mode** + `noUncheckedIndexedAccess`
- **ESLint flat config** + Prettier
- **Path aliases**: `@/*` → `src/*`
- **snake_case** en payloads API (coincide con backend)
- **Componentes autocontenidos**: interfaces dentro del componente

## Licencia

Privado - gomaflex
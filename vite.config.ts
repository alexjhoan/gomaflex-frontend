import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const srcPath = resolve(__dirname, './src')

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, 'VITE_')

  // Validar VITE_API_BASE_URL en build
  if (mode === 'production' && !env.VITE_API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL es requerido en producción. Configúralo en .env')
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': srcPath,
      },
    },
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL || ''),
    },
  }
})
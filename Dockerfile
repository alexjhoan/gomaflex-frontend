# Etapa 1: Construcción (Build)
FROM node:20-alpine AS builder

WORKDIR /app

# Argumento para VITE_API_BASE_URL (requerido en build)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Copiar archivos de dependencias
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el resto del código y compilar con Vite
COPY . .
RUN npm run build

# Etapa 2: Servidor web ligero para servir los archivos estáticos (Nginx)
FROM nginx:alpine

# Copiar los archivos compilados de Vite al directorio público de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de Nginx para SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto web
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# Dockerfile.frontend
# Etapa 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Recibir variables de build (IMPORTANTE: antes de COPY y RUN npm run build)
ARG VITE_API_BASE_URL
ARG VITE_API_TOKEN
ARG VITE_APP_ORIGIN
ARG VITE_APP_NAME

# Hacerlas disponibles en build time para Vite
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_TOKEN=$VITE_API_TOKEN
ENV VITE_APP_ORIGIN=$VITE_APP_ORIGIN
ENV VITE_APP_NAME=$VITE_APP_NAME

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar código y compilar
COPY . .
RUN npm run build

# Etapa 2: Nginx
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
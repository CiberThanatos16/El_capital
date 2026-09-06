FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Desarrollo ----
FROM base AS dev
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---- Producción ----
FROM base AS prod
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
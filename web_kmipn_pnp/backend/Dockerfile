FROM node:20-alpine3.20 AS builder

# Set work directory dalam container
WORKDIR /app

# Install system dependencies untuk Prisma
RUN apk add --no-cache openssl

# Copy file package.json dan package-lock.json (biar dependency caching lebih efisien)
COPY package*.json ./

COPY prisma ./prisma
RUN npx prisma generate

# Copy seluruh kode proyek ke dalam container
COPY . .
RUN npm run build

# Non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup
USER appuser

# Expose port yang dipakai Express.js
EXPOSE 2003

# Perintah untuk menjalankan aplikasi
CMD ["npm", "run", "dev"]

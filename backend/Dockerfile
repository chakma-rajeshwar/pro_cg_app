# Stage 1: Node.js setup
FROM node:18-alpine AS node-builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all backend files
COPY . .

# Generate Prisma client (instead of build)
RUN npx prisma generate

# Stage 2: Python setup
FROM python:3.11-slim AS python-builder
WORKDIR /app

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py ./

# Stage 3: Final image
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y curl build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy from previous stages
COPY --from=node-builder /app /app
COPY --from=python-builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=python-builder /app/requirements.txt .

# Install PM2
RUN npm install -g pm2

# Copy ecosystem file
COPY ecosystem.config.js .

# Create uploads directory
RUN mkdir -p /app/uploads/profiles

# Expose ports
EXPOSE 3000 5000

# Start applications
CMD ["pm2-runtime", "ecosystem.config.js"]
# Stage 1: Node.js setup
FROM node:18-alpine AS node-builder
WORKDIR /app

# Install Node.js dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all files
COPY . .

# Build if needed (uncomment if you have a build step)
# RUN npm run build

# Install Prisma and generate client
RUN npx prisma generate

# Stage 2: Python setup
FROM python:3.11-slim AS python-builder
WORKDIR /app

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Stage 3: Final image
FROM python:3.11-slim
WORKDIR /app

# Install Node.js
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Copy from Node.js stage
COPY --from=node-builder /app /app/node
# Copy from Python stage
COPY --from=python-builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=python-builder /app/requirements.txt .

# Install PM2 process manager
RUN npm install -g pm2

# Copy the combined ecosystem file
COPY ecosystem.config.js .

# Expose ports
EXPOSE 3000 5000

# Start applications
CMD ["pm2-runtime", "ecosystem.config.js"]
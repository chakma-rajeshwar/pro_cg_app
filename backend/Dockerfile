FROM python:3.11-alpine

# Install Node.js and PM2
RUN apk add --update --no-cache nodejs npm && \
    npm install -g pm2

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json .
COPY requirements.txt .

# Install dependencies
RUN npm install && \
    pip install --no-cache-dir -r requirements.txt

# Copy all files
COPY . .

# Expose ports
EXPOSE 3000 5000

# Start applications
CMD ["pm2-runtime", "ecosystem.config.js"]

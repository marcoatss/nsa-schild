FROM node:18.10.0-alpine

# Install build dependencies for native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    postgresql-client

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy application code
COPY . .

# Build admin panel
RUN npm run build || true

# Expose port
EXPOSE 1337

# Start Strapi in development mode
CMD ["npm", "run", "develop"]


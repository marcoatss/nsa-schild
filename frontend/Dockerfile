FROM node:18.10.0-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]


FROM node:20-alpine

WORKDIR /app

# Copy package files from backend
COPY backend/package*.json backend/yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application files from backend
COPY backend/ .

# Build the application
RUN NODE_ENV=production yarn build

# Expose port
EXPOSE 8080

# Start the application
CMD ["yarn", "start"]

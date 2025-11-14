FROM node:20-alpine

# Set environment variable
ENV NODE_ENV=production

WORKDIR /app

# Copy package files
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application files
COPY . .

# Build the application
RUN yarn build

# Set environment variables for runtime
ENV HOST=0.0.0.0
ENV PORT=8080

# Expose port
EXPOSE 8080

# Start the application
CMD ["yarn", "start"]

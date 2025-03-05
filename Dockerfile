# Stage 1: Build stage
FROM node:18-alpine AS build

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Stage 2: Production stage
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Create a non-root user and switch to it
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Copy only production dependencies from build stage
COPY --from=build --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules

# Copy app source
COPY --chown=nodejs:nodejs . .

# Set proper permissions
RUN chmod 755 .

# Switch to non-root user
USER nodejs

# Expose the port
EXPOSE 8080

# Command to run the application
CMD ["node", "index.js"]
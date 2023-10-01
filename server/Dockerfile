# Development Dockerfile
# This Dockerfile is intended for development use and includes development dependencies and tools.

# Use a Node.js base image with development tools
FROM node:16.0.0 AS development

# Create a directory where the application will be built
WORKDIR /app

# Copy over the dependency manifests, both the package.json
# and the package-lock.json are copied over
COPY package*.json ./

# Install packages and their dependencies
RUN npm install


# Copy over the prisma schema
COPY prisma/schema.prisma ./prisma/

# Generate the prisma client based on the schema
RUN npm run prisma:generate

# Copy over the code base
COPY . .

RUN npx prisma db push
# Create the bundle of the application
RUN npm run build

# Expose a specific port on the Docker container for development purposes
ENV PORT=3000
EXPOSE ${PORT}

# Start the development server using the previously built application
CMD ["npm", "start"]

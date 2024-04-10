#syntax=docker/dockerfile:1.4
FROM node:16-buster AS src_builder
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY apps/mockingbird/frontend/package*.json ./

# Install any needed packages
RUN npm ci

# Copy the rest of the application code into the container
COPY apps/mockingbird/frontend/ ./

# Build the React app for production
RUN npm run build --nomaps

ENV NODE_ENV=production

EXPOSE 3010

CMD ["node", "/app/node_modules/.bin/serve", "-s", "/app/build", "-l", "3010"]

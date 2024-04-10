#syntax=docker/dockerfile:1.4
FROM node:16-buster AS src_builder
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY ./frontend/package*.json ./

# Install any needed packages
RUN npm ci

COPY ./frontend/ ./

# Build the React app for production
RUN npm run build --nomaps

ENV NODE_ENV=production

EXPOSE 3010

CMD ["node", "/app/node_modules/.bin/serve", "-s", "/app/build", "-l", "3010"]

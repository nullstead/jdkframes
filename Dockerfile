# Base image: Node runtime
FROM node:20-alpine

# Container working directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

# Application code
COPY . .

# App port
EXPOSE 3000

# Run App
CMD ["node", "app.js"]
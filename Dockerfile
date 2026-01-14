# 1. Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependencies first (for caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the production-ready app
RUN npm run build

# 2. Production stage
FROM nginx:stable-alpine

# Copy built app to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


# # Build docker image
# docker build -t test-vite-site .

# # Run container
# docker run -p 8080:80 test-vite-site
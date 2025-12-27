# Stage 1: Build the Angular application
FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the application
RUN npm run build --configuration=production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy built application
COPY --from=build /app/dist/client/browser /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 based on default nginx config
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

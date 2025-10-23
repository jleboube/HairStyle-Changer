FROM node:20-alpine

# Set working directory
WORKDIR /app

# Accept API_KEY as a build argument
ARG API_KEY
ENV API_KEY=${API_KEY}

# Install nginx
RUN apk add --no-cache nginx

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Create directory for nginx pid
RUN mkdir -p /run/nginx

# Expose port 80
EXPOSE 80

# Start script that runs both esbuild watch and nginx
CMD sh -c "npm run build && \
    (npx esbuild index.tsx --bundle --outfile=dist/bundle.js --define:process.env.API_KEY='\"'$API_KEY'\"' --loader:.tsx=tsx --jsx=automatic --watch=forever &) && \
    nginx -g 'daemon off;'"

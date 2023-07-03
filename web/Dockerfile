# Stage 1: Build the Angular application
FROM node:20.2.0 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . /app

RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:1.23.4-alpine

COPY --from=build /app/dist/* /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

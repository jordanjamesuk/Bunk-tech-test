# ---- Base Node ----
FROM node:20.2.0 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install


# ---- Production ----
FROM node:20.2.0 AS release
WORKDIR /app
COPY . .
RUN npm install
ENV DOCKER=true

EXPOSE 8080
CMD ["npm", "start"]

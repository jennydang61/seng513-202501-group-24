# gos_backend/Dockerfile
FROM node:22

WORKDIR /app

# copy and install dependencies
COPY package*.json ./

RUN npm install

# copy rest of backend
COPY . .

EXPOSE 4004

# start dev server
CMD ["npm", "run", "dev"]
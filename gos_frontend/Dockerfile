# gos_frontend/Dockerfile
FROM node:22

WORKDIR /usr/src/app

# copy only package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy rest of frontend
COPY . .

EXPOSE 5173

# start dev server
CMD ["npm", "run", "dev"] 

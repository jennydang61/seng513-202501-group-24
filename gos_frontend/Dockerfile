FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

EXPOSE 80

# Start the app
CMD ["npm", "run", "dev"] 

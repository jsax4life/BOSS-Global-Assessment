# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install the project dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application (for production)
RUN npm run build

# Expose the port the app will run on (default NestJS port)
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "start:prod"]

# Use the official Node.js 16.8.1 image as the base image
FROM node:16.8.1

# Create and set the working directory in the container
WORKDIR /app

# Copy the application files to the container
COPY . .

# Install the dependencies in the container
RUN npm install

# Expose the port that the app listens on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

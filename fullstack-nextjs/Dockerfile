# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /home/seer/wearable-devices-monitoring/fullstack-nextjs/

# Copy your application files into the container
COPY . .

# Install your application's dependencies
RUN npm install

# Expose the port your application will run on
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "run", "dev"]

WORKDIR fullstack-nextjs/prisma

CMD ["npx", "prisma", "studio"]

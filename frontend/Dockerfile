# Base image
FROM node

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . /app/

RUN npm ci 

# # Build the app
RUN npm run build

# Expose port to access server
EXPOSE 3000

# # Command to run our app
CMD [ "npm", "start" ]

# # ==== PROD =======

# # Set the env to "production"
# ENV NODE_ENV production
# # Start the app
# CMD [ "npx", "serve", "build" ]
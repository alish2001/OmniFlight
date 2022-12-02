FROM node:16

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . /app/

RUN npm ci 

# # Build the app
RUN npm run build

# Expose port to access server
EXPOSE 3000

# Command to run our app
# CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true

# ==== PROD =======

# Set the env to "production"
ENV NODE_ENV production

# Start the app
CMD [ "npx", "serve", "build" ]

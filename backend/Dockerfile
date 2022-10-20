FROM node:16

# Create app directory
# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . /app/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8000
CMD [ "npm", "start" ]
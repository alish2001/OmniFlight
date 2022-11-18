FROM node:16

# Copy app files
COPY . .

# RUN npm install

# If you are building your code for production
RUN npm ci --only=production
ENV NODE_ENV production

EXPOSE 9000

# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait
USER node

CMD /wait && npm start
#CMD [ "npm", "start" ]
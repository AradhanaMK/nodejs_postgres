#FROM public.ecr.aws/bitnami/node:16-prod

FROM node:18.16.0

# Create app directory
WORKDIR /usr/src/app



# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .
#EXPOSE 8084
//CMD [ "node", "server.js" ]

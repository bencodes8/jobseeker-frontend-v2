# parent image
FROM node:18

# set working directory in the container
WORKDIR /app

# copy package.json and package-lock.json files
COPY package*.json ./

# install dependencies
RUN npm install

# Copy the rest of nextjs app into container
COPY . .

# expose 3000 port the nextjs app will run on
EXPOSE 3000

# build and start nextjs app
CMD ["npm", "run", "start"]

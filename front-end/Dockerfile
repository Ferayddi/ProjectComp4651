FROM node:20.12.2-buster

WORKDIR /user/src/app
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
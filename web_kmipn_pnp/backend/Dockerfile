FROM node:latest

WORKDIR /app

COPY package*.json ./
COPY prisma ./
RUN npm install
COPY . .

RUN npx prisma generate

EXPOSE 2003

CMD [ "npm", "run", "dev" ]

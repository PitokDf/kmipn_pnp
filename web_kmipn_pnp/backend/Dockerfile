FROM node:lts-alpine3.20

WORKDIR /app

COPY package*.json ./
COPY prisma ./
COPY .env.production ./
RUN npm install
COPY . .

RUN npx prisma generate
RUN npm run build
EXPOSE 2003

CMD [ "npm", "run", "start" ]

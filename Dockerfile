FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


FROM node:22-alpine AS production

WORKDIR /app

RUN mkdir -p uploads/users uploads/shipments log

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./
COPY . .

EXPOSE 8080

CMD ["npm", "start"]
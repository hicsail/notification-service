FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy over the source
COPY ../.. .

RUN npm run build

FROM node:18-alpine as production

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy over build
COPY --from=builder /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN npm install -g pnpm

RUN pnpm run build

CMD [ "pnpm", "run", "start:dev" ]

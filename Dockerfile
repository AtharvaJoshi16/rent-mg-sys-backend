FROM node:22.11.0-alpine

ENV DATABASE_URL="postgresql://neondb_owner:nEcVKp9x1dNm@ep-black-glade-a5uerd6v.us-east-2.aws.neon.tech/rentmgsystem?sslmode=require"
ENV PORT=8080
ENV EMAIL="aj.test.user@hotmail.com"
ENV PASS="Atharva@123"
ENV JWT_SECRET="8ebbc8919581a816559d6"

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma migrate deploy

RUN npx prisma generate --schema=./prisma/schema.prisma

RUN npm run build

EXPOSE 8080

ENTRYPOINT [ "node", "build/src/index.js" ]
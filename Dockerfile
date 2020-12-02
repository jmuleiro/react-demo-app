FROM node:12.16.1

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install react-scripts@4.0.1 -g

COPY . .

EXPOSE 3001

CMD ["/app/npm", "start"]
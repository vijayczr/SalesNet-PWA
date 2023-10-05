FROM node:18.17.1-alpine as nodework
ENV NODE_ENV development
WORKDIR /app

# COPY package.json .

# RUN npm install --force

COPY . .


# CMD [ "NODE_OPTIONS="--max-old-space-size=10096" npm run build"]


#nginx block

FROM nginx:1.25.2-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=nodework /app/build .
ENTRYPOINT [ "nginx","-g","daemon off;" ]
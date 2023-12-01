# FROM node:18.17.1-alpine as nodework
# # ENV NODE_ENV development
# WORKDIR /app

# # COPY package.json .
# #copy the files from the host to the container.
# COPY package.json ./
# # COPY package-lock.json ./


# RUN npm install --force
# COPY . ./


# # CMD [ "NODE_OPTIONS="--max-old-space-size=10096" npm run build"]
# RUN npm run build 

# #nginx block

# FROM nginx:1.25.2-alpine
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=nodework /app/build .
# ENTRYPOINT [ "nginx","-g","daemon off;" ]



# FROM node:18.17.1-alpine as build
# # ENV NODE_ENV development
# WORKDIR /app

# # COPY package.json .
# #copy the files from the host to the container.
# COPY . /app/
# # COPY package-lock.json ./


# RUN npm install --force
# COPY . ./


# # CMD [ "NODE_OPTIONS="--max-old-space-size=10096" npm run build"]
# RUN npm run build 

# #nginx block

# FROM nginx:1.25.2-alpine
# # WORKDIR /usr/share/nginx/html
# # RUN rm -rf ./*
# COPY --from=build /app/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY ./nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# ENTRYPOINT [ "nginx","-g","daemon off;" ]



FROM node:alpine3.16 as nodework

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .

RUN npm run build

# CMD [ "NODE_OPTIONS="--max-old-space-size=10096" npm run build"]


#nginx block

FROM nginx:1.25.2-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=nodework /app/build /usr/share/nginx/html
ENTRYPOINT [ "nginx","-g","daemon off;" ]
FROM node:12-alpine
LABEL maintainer="paul@pcraig3.ca"

ENV PORT 3000

# Add GITHUB_SHA_ARG if it exists
ARG GITHUB_SHA_ARG
ENV NEXT_PUBLIC_GITHUB_SHA=$GITHUB_SHA_ARG

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Installing dependencies
COPY package*.json /app/
COPY . /app/

# Installing dependencies

RUN npm install --production --silent

# Copying source files

# Building app
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

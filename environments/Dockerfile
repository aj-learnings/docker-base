FROM node:16-alpine

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package.json .
RUN if [ "$NODE_ENV" = "production" ] ; then \
        npm ci --only=production || npm install --only=production ; \
    else \
        npm install ; \
    fi

COPY . .

RUN if [ "$NODE_ENV" = "production" ] ; then \
        echo "Building for production" ; \
    else \
        echo "Skipping build in development mode" ; \
    fi

EXPOSE 3001

CMD ["node", "index.js"]

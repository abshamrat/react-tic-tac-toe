FROM node:12

RUN mkdir /app
WORKDIR /app
ADD . /app

# ENV PATH /app/node_modules/.bin:$PATH
# RUN npm i -g @nestjs/cli

CMD ["npm run start:dev"]
ENTRYPOINT [ "sh", "-c" ]
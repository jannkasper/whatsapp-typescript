## Whatsapp Clone
- Live: http://whatsapp-jannkasper.vercel.app/ (be patient, server is sleeping)

[![Product Name Screen Shot][product-screenshot]](https://github.com/jannkasper/whatsapp-react-clone/blob/master/images/video.gif)

## :rocket: Tech Stack

- Typescript
- ReactJs
- @emotion/styled
- Redux
- Socket.io
- NodeJs
- Axios
- Express
- MongoDB
- Mongoose
- Testing Library
- Jest

## :warning: Prerequisite

- node
- npm
- mongodb

## :cd: How to run local

```bash
# Clone this repository
$ git clone https://github.com/jannkasper/whatsapp-typescript

# Go into server
$ cd whatsapp-typescript/server

# Create configuration file
$ echo 'DATABASE_URL=<mongodb-url>' > .env

# Install dependencies
$ npm install

# Start the backend server
$ npm run dev

# On another terminal, go to the client folder
$ cd whatsapp-typescript/client

# Create configuration file
$ echo 'REACT_APP_SITE_NAME=<server-host>' > .env

# Install dependencies
$ npm install

# Start the frontend client
$ npm run start
```

## :mag_right: Testing

Make sure mongodb is running before testing the server.

```bash
$ cd whatsapp-typescript/server
$ #Create configuration file
$ echo 'TEST_DATABASE_URL=<mongodb-url>' > .env
$ npm run test
$
$ cd ../client
$ npm run test
```

## :globe_with_meridians: Deploy

#### Deploying Server App on Heroku

-  You will need to have setup a [MongoDB Atlas account and database](https://docs.atlas.mongodb.com/getting-started/).
- Make sure that the cluster has allowlisted connections from anywhere.
- Create a [Heroku](https://dashboard.heroku.com/new-app) new app.
- Go to app settings
- Add the following enviroments.
    - DATABASE_URL (to use your MongoDB connection string)
- Add Nodejs to buildpacks

-
      # Go into the repository
      $ cd whatsapp-typescript

      # Heroku Setup
      $ npm install -g heroku
      $ heroku login
      $ heroku git:remote -a your-app-name

      # push subdirectory repository with subtree
      $ git subtree push --prefix server heroku master

#### Deploying Client App on Vercel

- [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fjannkasper%2Fwhatsapp-typescript&env=REACT_APP_SITE_NAME)
- Select client directory
- Add heroku api url to REACT_APP_SITE_NAME enviorement
- Finally deploy client application


## :book: Directory Structure

```
├── app/
│   ├── client/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── __tests__/
│   │   │   ├── actions/
│   │   │   ├── components/
│   │   │   ├── img/
│   │   │   ├── reducers/
│   │   │   ├── store/
│   │   │   ├── util/
│   │   │   ├── index.css
│   │   │   ├── index.js
│   │   │   └── setupTests.js
│   │   │
│   │   ├── .env
│   │   ├── global.d.ts
│   │   ├── jest.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── server/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── utils/
│   │   │   ├── app.js
│   │   │   ├── config.js
│   │   │   ├── index.js
│   │   │   ├── routes.js
│   │   │   └── socket.js
│   │   │
│   │   ├── tests/
│   │   ├── .env
│   │   ├── .global.d.ts
│   │   ├── jest.config.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tslint.json
│   │
```

## :memo: License

This project is made available under the MIT License.





<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: images/video.gif

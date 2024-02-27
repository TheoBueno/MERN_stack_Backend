# Project Title: BBW Bank - the MERN Stack BigBadWolf Bank

This project's frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and is availble for forking at the [Frontend_Repo](https://github.com/TheoBueno/MERN_stack_Frontend), while it's backend was created with [Node](https://nodejs.org/en) & [Nodemon](https://nodemon.io/), and is available for forking at the [Backend_Repo] (https://github.com/TheoBueno/MERN_stack_Backend).

## Table of Contents:
1. [Motivation](#motive)
2. [Installation Guidelines](#inst)
    A. [Database](#database)
    B. [Backend](#backend-dev)
    C. [Frontend](#frontend-dev)
3. [Screenshots](#Screenshots)
4. [Technology](#Technology)
5. [Features](#Features)
6. [License](#License) 

## Motivation <a name="motive"></a>


## <a name="inst"></a> Installation Guidelines & Available Scripts: 
Firstly, make sure to fork or copy both the [frontend](https://github.com/TheoBueno/MERN_stack_Frontend) and [backend](https://github.com/TheoBueno/MERN_stack_Backend) from their Git Repositories.\
We recommend keeping both within the same directory in your computer for easy access. If using VS Code it's ideal to open the containing directory to view the entirety of the project.

### `Database`
Make sure to create a MongoDB database for this project. You will need it to be set up before the project is fully functional.
You can set it up using MongoDB Desktop while in development, but using [MDB Atlas](https://www.mongodb.com/docs/atlas/getting-started/) is easy, starts free and cloud based, making it easy for deployment.\
You also use [MDB Compass](https://www.mongodb.com/products/tools/compass) or [Studio 3T](https://studio3t.com/) as Free GUIs to manage the database from your desktop.

### `Backend Dev`
Once you have a copy both repos in your computer, you will need to create a '.env' file, with the following lines:
```
REACT_APP_MONGO_URI   = 'URI' #(replace URI here with the uri to your database) 
REACT_APP_SERVERPORT  = PORT1  #(replace PORT1 here with the number of the port you are using, such as 8080) 
```
Then from a terminal inside the project's backend directory run the following commands:
```
$ npm install
$ npm run dev
```
Runs the Backend in the development mode using nodemon.\
Got to [http://localhost:PORT1](http://localhost:8080) to confirm functionality of it in your browser.

The page will reload as you make changes to your code - works similar to React.\
Keep an eye on your terminal for prompts of feedback.

### `Frontend Dev`
meanwhile you will need to create a '.env' file here as well, with the following lines:
```
REACT_APP_BACKEND_URL = 'URL' #(replace URL here with the url to your backend, such as 'http://localhost:PORT1') 
REACT_APP_MONGO_URI   = 'URI' #(replace URI here with the uri to your database) 
REACT_APP_PORT        = PORT2  #(replace PORT2 here with the number of the port you are using, such as 3000)
```
Then from a terminal inside the project's frontend directory run the following commands:
```
$ npm install
$ npm start
```
Runs the app in the development mode.\
Got to [http://localhost:PORT2](http://localhost:3000) in the browser.

The page will reload as you make changes to your code - works similar to Nodemon.\
Keep an eye on your terminal for prompts of feedback.\
Make sure to have a different ports for front and backend.

### `Frontend Build`
```
$ npm run build
```
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### `Deployment`
For Deployment, in case the user does not yet have a setup account they often use for deploying similar projects on, such as Digital Ocean, or Heroku, one valid option for first time deployment is Render which can deploy from github. 

In addition to creating two 'web services' for deployment using Render, one for front and one for the backend, both deploying from github, I used ENV variables that I then passed along their info at Enviroment 'key:value' slots, and creating a new cloud MongoDB at Atlas and connecting the three.

## `Screenshots`

![](https://i.imgur.com/uf9ZruG.png)
![](https://i.imgur.com/0PF1XyK.png)


## `Technology`
  Core Programs - MERN Stack: [MongoDB](https://www.npmjs.com/package/mongodb), [Express](https://www.npmjs.com/package/express), [React](https://www.npmjs.com/package/react) & [Node](https://www.npmjs.com/package/node);
  Also used: [body-parser](https://www.npmjs.com/package/body-parser), [cors](https://www.npmjs.com/package/cors), [dotenv](https://www.npmjs.com/package/dotenv), [mongoose](https://www.npmjs.com/package/mongoose), [axios](https://www.npmjs.com/package/axios) & [bootstrap](https://www.npmjs.com/package/bootstrap).
  Development only Dependency: nodemon,

## `Features`
The App is focussed on providing the functionality of an online bank, capable of holding accounts information on a database, and update each individual account's balance based on prompts from actions executed on the frontend, using calls to the back end, to deposit or withdraw ammounts.

### Account Creation:
  Creates new accounts and adds them to the database.
### Login:
  Logs the website to one account in particular from the database.
### Deposit:
  Adds money to the balance of the current logged in account.
### Withdraw:
  Withdraws money from the balance of the currently logged in account.

## `License`

### MIT License:

Copyright (c) 2024 TheoBueno

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

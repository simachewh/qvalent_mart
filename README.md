# qvalent_mart
Web shop API for Qvantel

### Installation and running guide

Described here is an installation and running guide for this simpele API.
##### Requirements
  + NodeJs
  + npm

Follow allong [the nodejs installer](https://nodejs.org/en/) which will install the latest version of node and npm.

Once node and npm are installed, navigate to the appliction top level directory (same level as `server.js` and `package.json`) on your comand prompt or terminal.
Run the command `npm install` which will install all the dependancies listed in the `package.json` file.
If all the dependancies are installed properly, you should see a folder `node_modules` on the same level as `package.json`.
If `npm install` didn't work, check if node and npm are in the environment variables.

Once the dependancies are installed, It is possible to run the app using the comand `node server.js`

##### nodemon
To avoid restarting the app upon crash or making changes to a file, consider using `nodemon` to start the app.
Install nodemon by runing the command `npm install -g nodemon`. The `-g` flag will install nodemon globaly. 
Run the app with `nodemon server.js`. nodemon will run the app and watch for changes made in the files to restart the app.

##### Testing with Postman
Some tests that can be performed on Postman. 
Install [Postman](https://www.getpostman.com/).
Import the test collections by importing the file `qvantel-mart.postman_collections.json`.
After starting the app send the requests in the `qvantel_mart` collection. It will featch results from a MongoDB which already has data stored.



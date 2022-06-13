# Valstro Take Home Project

### This application is a web socket CLI client that communicates with a web socket server

### Introduction 
This application is a web socket CLI client that communicates with a web socket server

The application provides a terminal to search for movies from the Star Wars API.

To start the application:
open a terminal in this folder's directory and run: `make start-server`. This will start the web socket server you'll be communicating with
Open another terminal in this folder's directory and type `make init-app` to set up the application. If you don't have make installed, you can run the commands inside the make file.
After the application is set up, run `yarn start` this will start the application and you can start using.
To get help, type `help` or `h`, this will display the help message.
To exit at any time, type `exit` or `e`
You can also use `make init-app` to rebuild the application at anytime.
To teardown everything run `make nuke`


### Requirements
TO use this application you the following:
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) - Required
- [Node JS & NPM](https://nodejs.org/en/) - Required
- [make](https://www.gnu.org/software/make/) - Optional
- [Docker](https://www.docker.com/) - Required
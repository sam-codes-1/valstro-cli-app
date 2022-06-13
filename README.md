# Valstro Take Home Project

## Introduction 
This application is a web socket CLI client that communicates with a web socket server

The application provides a terminal to search for movies from the Star Wars API.

## Requirements
To use this application you the following:
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) - Optional (You can run the npm command if you don't have yarn installed.)
- [Node JS & NPM](https://nodejs.org/en/) - Required
- [make](https://www.gnu.org/software/make/) - Optional
- [Docker](https://www.docker.com/) - Required

## How to build & start
To start the application, open a terminal in this folder's directory and run `make start-server`. This'll start the web socket server.

Open another terminal in this folder's directory and type `make init-app` to set up the application.

If you don't have `make` installed, you can run the make commands inside the Makefile.
After the application is set up, run `yarn start`, this will start the application and you can start using it.

To get help type `help` or `h`, this will display the help message for the application.

To exit at any time, type `exit` or `e`

You can also use `make init-app` to rebuild the application at any time.

To tear down everything, run `make nuke`

# AFEX challenge

This is a project as a part of AFEX's challenge. It consist in an ResAPI that manages all the videos saved in its database and provides its resources to an app apart (https://github.com/et3858/afex-challenge-project).
It uses NodeJS, Express, Sequelize, SQLIte and the Youtube data API.


## Steps

### Install NodeJS and npm

- Having NodeJS v16.x and above installed in your computer. You can get NodeJS [in this link](https://nodejs.org/en/download)
- Having npm v8.x and above installed in your computer.
- Having a terminal (either PowerShell or console prompt if you use Windows).

You can get the installation guide on Windows and Mac [in this link](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac)


### Download the project

In this repository, go to "Code" button, then click on "Download ZIP" link in "Local" tab. Once it's downloaded, unzip the file into your preferred location and go to the project folder through the terminal.

Example:
```sh
cd path/to/the/project/afex-api-project
```

### Install modules and dependencies

```sh
npm install
```

### Copy and rename the .env.example file to .env and set the YouTube API key

```
YOUTUBE_API_KEY="YOUR_API_KEY"
```

### Run the migrations


```sh
npx sequelize-cli db:migrate
```


### Run the server

```sh
npm run start
```

By default, the project will be running at http://localhost:3000



Happy coding.

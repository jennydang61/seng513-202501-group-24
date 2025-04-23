# The-Game-of-Stocks

## Running the backend:

```bash
$ cd gos_backend
```
```bash
$ npm install
```
```bash
$ npm run dev
```

## Running the frontend:

```bash
$ cd gos_frontend
```
```bash
$ npm install
```
```bash
$ npm run dev
```

## Building and running Docker container:

* Make sure to run the following commands in the root folder of the project, NOT in frontend or backend folder.
```bash
$ docker-compose build
```
```bash
$ docker-compose up
```

This will start the frontend and backend of the project on ports ```5173``` and ```4004``` of the localhost, respectively, and connect to the database on port ```27017```.
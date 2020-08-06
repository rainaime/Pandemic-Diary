# Pandemic Diary

## Usage
The `package.json` files defines various scripts. Defined in the project root `package.json` file are server-related dependencies and it includes a `postinstall` script that also installs the client dependencies. 

The client (create-react-app, port 3000) can be run separately from the backend (MongoDB database, port 27017 & Express server, port 5000). This is useful if you want hot-reloading of the client for development. In production, the Express backend serves the built files. 
### Development
Features hot-reloading of the client and server files. Visit [localhost:3000](http://localhost:3000) to view the site with client hot-reloading, or [localhost:5000](http://localhost:5000) if you don't want it (this runs the static build created on `npm run client-build`/`npm start`).
```
npm install
npm run backend
npm run client
```
### Production Build
Features hot-reloading of the server files but NOT the client files. Visit [localhost:5000](http://localhost:5000) to view the Express-served static build created on `npm run client-build`/`npm start`. 
```
npm install
npm start
```

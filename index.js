import { createServer } from './src/config/server/server';
import createDBConnection from './src/config/db/db';


createDBConnection()
.then(() => {
  console.log("Mongodb is running");
  createServer(4000);
})
.catch((error) => {
  console.log(error)
})
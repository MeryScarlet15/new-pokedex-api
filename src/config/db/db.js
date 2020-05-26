import mongoose from "mongoose";

const DB_TYPE = "mongodb";
const DB_URL = "localhost:27017";
const DB_NAME = "pokemonDB";

const createDBConnection = () => {
  mongoose.Promise = global.Promise;

  return mongoose.connect(`${DB_TYPE}://${DB_URL}/${DB_NAME}`, { useUnifiedTopology: true });
};

export default createDBConnection;

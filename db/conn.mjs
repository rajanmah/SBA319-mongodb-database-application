import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_URI || "mongodb+srv://rajanmaharjan1702:1234@dbpractice.ro0rute.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (error) {
  console.log(error);
}

let db = conn.db("sample_supplies");

export default db;


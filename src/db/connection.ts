import { MongoClient, Db } from "mongodb";
import env from "dotenv";
env.config();

const uri = process.env.MONGODB_URI as string;
console.log(uri);

let database: Db | null = null;

//Initialize the database
export async function InitializeDatabase() {
  try {
    if (!database) {
      const client = new MongoClient(uri);
      await client.connect();
      database = client.db("AnimalShelter");
    } else {
      console.log("Database already initialized");
      return;
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

//Retrieve the database
export function GetDatabase() {
  if (!database) {
    throw new Error("Database not initialized");
  }
  return database;
}

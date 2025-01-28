import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);

export const handler = async (event) => {
  try {
    const db = await client.db("cloud-resume-data");
    const collection = await db.collection("ViewCount");

    const filter = { ip: event.ip }; // Find the document by IP
    const update = {
      $set: { details: event.details, lastVisited: event.lastVisited },
      $inc: { count: 1 }, // Increment the count field by 1
    };
    const options = { upsert: true }; // Create the document if it doesn't exist

    const result = await collection.updateOne(filter, update, options);
    return result;
  } catch (error) {
    console.error("Error in handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);

export const handler = async (event) => {
  try {
    const db = await client.db("cloud-resume-data");
    const collection = await db.collection("Pictures");

    const data = await collection.find().toArray();

    return {
      data,
    };
  } catch (error) {
    console.error("Error in handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

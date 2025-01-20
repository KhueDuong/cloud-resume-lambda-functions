import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);

export const handler = async(event) => {
    const db = await client.db("cloud-resume-data");
    const collection = await db.collection("ViewCount");

    const ip = event.ip;
    if (!ip) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "IP address is required" }),
        };
      }

    const documentCount = await collection.countDocuments();
    const document = await collection.findOne({ ip: ip });

    return { totalViewCount: documentCount, individualViewCount: document.count };
};
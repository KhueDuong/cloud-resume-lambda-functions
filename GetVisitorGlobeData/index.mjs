import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);

export const handler = async (event) => {
  try {
    const db = await client.db("cloud-resume-data");
    const collection = await db.collection("ViewCount");

    const res = await collection.find().toArray();

    const visitorGlobeData = res
      .filter((data) => data.details?.loc)
      .map((data) => {
        const [latitude, longitude] = data.details.loc.split(",").map(Number); // Split & convert to numbers
        return {
          count: data.count,
          lat: latitude,
          lng: longitude,
        };
      });

    return visitorGlobeData;
  } catch (error) {
    console.error("Error in handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

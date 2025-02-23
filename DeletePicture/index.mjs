import AWS from "aws-sdk";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
const s3 = new AWS.S3();

export const handler = async (event) => {
  try {
    const db = await client.db("cloud-resume-data");
    const collection = await db.collection("Pictures");
    const data = await collection.findOneAndDelete({
      _id: new ObjectId(event.id),
    });

    const deleteParams = {
      Bucket: "images-khuebanhzai.com",
      Key: data.fileName,
    };
    await s3.deleteObject(deleteParams).promise();

    const res = {
      message: "successfully deleted file: " + data.fileName,
    };

    return {
      res,
    };
  } catch (error) {
    console.error("Error in handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

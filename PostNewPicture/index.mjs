import AWS from "aws-sdk";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
const s3 = new AWS.S3();

export const handler = async (event) => {
  try {
    // connect to mongodb
    const db = await client.db("cloud-resume-data");
    const collection = await db.collection("Pictures");

    // get file data
    const author = event.author;
    const uploadDate = new Date();
    const fileName = event.fileName;
    const fileContent = Buffer.from(event.fileContent, "base64");

    // randomize file name to prevent duplication
    const randomizedFileName =
      fileName + "+" + Math.random().toString(36).slice(2);

    // upload to s3
    const uploadParams = {
      Bucket: "images-khuebanhzai.com",
      Key: randomizedFileName,
      Body: fileContent,
      ContentType: "image/jpeg",
    };
    const res = await s3.upload(uploadParams).promise();

    // upload metadata to db
    const insert = {
      author: author,
      email: event.email,
      uploadDate: uploadDate,
      fileName: randomizedFileName,
      description: event.description,
      URL: res.Location,
    };
    const options = { upsert: true }; // Create the document if it doesn't exist

    const result = await collection.insertOne(insert, options);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "File uploaded successfully!",
        res,
        fileName,
      }),
    };
  } catch (error) {
    console.error("Error in handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

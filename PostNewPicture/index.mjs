import AWS from "aws-sdk";
import {
  MultipartParseError,
  parseMultipartRequest,
} from "@mjackson/multipart-parser";

const s3 = new AWS.S3();

export const handler = async (event) => {
  try {
    /*
    const fileName = event.fileName;
    const fileContent = Buffer.from(event.fileContent, "base64");

    const uploadParams = {
      Bucket: "images-khuebanhzai.com", // Replace with your bucket name
      Key: fileName, // The name of the file in S3
      Body: fileContent,
      ContentType: "image/jpeg",
    };

    await s3.upload(uploadParams).promise();
    */

    for await (let part of parseMultipartRequest(request)) {
      console.log(part.name);
      console.log(part.filename);

      if (/^text\//.test(part.mediaType)) {
        console.log(await part.text());
      } else {
        // TODO: part.body is a ReadableStream<Uint8Array>, stream it to a file
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "File uploaded successfully!",
        //fileName,
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

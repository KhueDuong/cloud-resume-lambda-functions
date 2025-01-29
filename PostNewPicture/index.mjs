import AWS from "aws-sdk";

const s3 = new AWS.S3();

export const handler = async (event) => {
  try {
    const fileName = event.filename;
    const fileContent = Buffer.from(event.fileContent, "base64");

    const uploadParams = {
      Bucket: "images-khuebanhzai.com", // Replace with your bucket name
      Key: fileName, // The name of the file in S3
      Body: fileContent,
      ContentType: "image/jpeg",
    };

    await s3.upload(uploadParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "File uploaded successfully!",
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

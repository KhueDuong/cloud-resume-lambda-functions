import AWS from "aws-sdk";

export const handler = async (event) => {
  const sns = new AWS.SNS({ region: "ap-southeast-2" });

  // Create publish parameters
  var params = {
    Subject: event.subject,
    Message: event.message,
    TopicArn: "arn:aws:sns:ap-southeast-2:975049932267:PictureUpload",
  };

  try {
    const { MessageId } = await sns.publish(params).promise();
    return MessageId;
  } catch (e) {
    return e;
  }
};

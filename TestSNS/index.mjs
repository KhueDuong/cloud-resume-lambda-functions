import AWS from "aws-sdk";

export const handler = async (event) => {
  try {
    sendEmail();
  } catch {}
};

function sendEmail() {
  // Set region
  AWS.config.update({ region: "ap-southeast-2" });

  // Create publish parameters
  var params = {
    Message: "MESSAGE_TEXT" /* required */,
    TopicArn: "arn:aws:sns:ap-southeast-2:975049932267:PictureUpload",
  };

  // Create promise and SNS service object
  var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  publishTextPromise
    .then(function (data) {
      console.log(
        `Message ${params.Message} sent to the topic ${params.TopicArn}`
      );
      console.log("MessageID is " + data.MessageId);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
}

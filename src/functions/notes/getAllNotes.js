import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.notesTableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.queryStringParameters.userId,
    },
  };

  const result = await dynamoDb.query(params);
  console.log(result);

  return result.Items;
});

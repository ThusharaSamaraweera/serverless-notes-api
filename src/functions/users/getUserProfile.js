import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.usersTableName,
    Key: {
      // todo : get userId from cognito
      userId: event.queryStringParameters.userId, // The id of the user
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("user profile not found.");
  }
  result.Item.createdAt = new Date(result.Item.createdAt);
  result.Item.modifiedAt = new Date(result.Item.modifiedAt);
  return result.Item;
});

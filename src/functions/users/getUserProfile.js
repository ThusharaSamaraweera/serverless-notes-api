import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { APIError } from "../../utils/exceptions/NoteAppException";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.usersTableName,
    Key: {
      // todo : get userId from cognito
      userId: event.queryStringParameters.userId, // The id of the user
    },
  };

  let result;
  try {
    result = await dynamoDb.get(params);
  } catch (error) {
    throw new APIError(error.message);
  }

  // if user not found
  if (!result.Item) {
    throw new Error(`user profile ${params.Key.userId} not found.`);
  }
  result.Item.createdAt = new Date(result.Item.createdAt);
  result.Item.modifiedAt = new Date(result.Item.modifiedAt);
  return result.Item;
});

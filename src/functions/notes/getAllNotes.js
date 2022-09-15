import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { APIError } from "../../utils/exceptions/NoteAppException";
import { logger } from "../../utils/logger";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.notesTableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      // todo : get userId from cognito
      ":userId": event.queryStringParameters.userId,
    },
  };
  try {
    logger.info(
      `Getting all notes for user ${params.ExpressionAttributeValues[":userId"]}`
    );
    const result = await dynamoDb.query(params);
    return result.Items;
  } catch (error) {
    logger.error(
      `Error getting all notes for user ${params.ExpressionAttributeValues[":userId"]} - ${error.message}`
    );
    throw new APIError(error.message);
  }
});

import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import {
  APIError,
  NotFoundException,
} from "../../utils/exceptions/NoteAppException";
import { logger } from "../../utils/logger";

export const main = handler(async (event, context) => {
  const userId = event.queryStringParameters.userId;
  const noteId = event.pathParameters.id;

  // param for get note
  const params = {
    TableName: process.env.notesTableName,
    Key: {
      // todo : get userId from cognito
      userId: userId,
      noteId: noteId,
    },
  };
  let result;
  // get note from note table
  try {
    logger.info(`Getting Note ${noteId} from note table`, event);
    result = await dynamoDb.get(params);
  } catch (error) {
    throw new APIError(error.message);
  }
  if (!result.Item) {
    throw new NotFoundException(`Note ${noteId} not found`, event);
  }
  result.Item.createdAt = new Date(result.Item.createdAt);
  result.Item.modifiedAt = new Date(result.Item.modifiedAt);
  return result.Item;
});

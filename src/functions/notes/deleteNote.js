import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { APIError } from "../../utils/exceptions/NoteAppException";
import { logger } from "../../utils/logger";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.notesTableName,
    Key: {
      // todo : get userId from cognito
      userId: event.queryStringParameters.userId, // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
  };

  try {
    logger.info(`Deleting note ${params.Key.noteId} for user ${params.Key.userId}`);
    await dynamoDb.delete(params);
  } catch (error) {
    throw new APIError(error.message);
  }
  return;
});

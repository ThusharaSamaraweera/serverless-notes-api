import * as uuid from "uuid";
import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { APIError } from "../../utils/exceptions/NoteAppException";
import { logger } from "../../utils/logger";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.notesTableName,
    Item: {
      userId: data.userId,
      noteId: uuid.v1(),
      title: data.title,
      content: data.content,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    },
  };

  try {
    logger.info(`Inserting new note ${params.Item.noteId} for user ${params.Item.userId}`);
    await dynamoDb.put(params);
  } catch (error) {
    logger.error(`Error inserting new note ${params.Item.noteId} for user ${params.Item.userId}`);
    throw new APIError(error.message);
  }
  const result = {
    ...params.Item,
    createdAt: new Date(params.Item.createdAt),
    modifiedAt: new Date(params.Item.modifiedAt),
  };
  return result;
});

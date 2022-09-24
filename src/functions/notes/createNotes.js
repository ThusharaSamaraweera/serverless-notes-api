import * as uuid from "uuid";
import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { APIError } from "../../utils/exceptions/NoteAppException";
import { logger } from "../../utils/logger";
import noteValidator from "../../utils/validations/noteValidator";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  // validate the request body
  noteValidator.createNote(data);

  const params = {
    TableName: process.env.notesTableName,
    Item: {
      userId: data.userId,
      noteId: uuid.v1(),
      title: data.title,
      status: data.status,
      content: data.content,
      categoryId: data.categoryId,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    },
  };

  try {
    logger.info(
      `Inserting new note ${params.Item.noteId} for user ${params.Item.userId}`
    );
    await dynamoDb.put(params);
  } catch (error) {
    throw new APIError(error.message);
  }
  const result = {
    ...params.Item,
    createdAt: new Date(params.Item.createdAt),
    modifiedAt: new Date(params.Item.modifiedAt),
  };
  return result;
});

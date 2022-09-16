import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import {
  APIError,
  NotFoundException,
} from "../../utils/exceptions/NoteAppException";
import { logger } from "../../utils/logger";
import noteValidator from "../../utils/validations/noteValidator";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  noteValidator.updateNote(data);

  const params = {
    TableName: process.env.notesTableName,
    Key: {
      // todo : get userId from cognito
      userId: event.queryStringParameters.userId, // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
    UpdateExpression:
      "SET content = :content, title = :title, modifiedAt = :modifiedAt, categoryId = :categoryId",
    ConditionExpression:
      "attribute_exists(noteId) AND attribute_exists(userId)",
    ExpressionAttributeValues: {
      ":content": data.content || "No content",
      ":title": data.title || "No title",
      ":categoryId": data.categoryId,
      ":modifiedAt": Date.now(),
    },
    ReturnValues: "ALL_NEW",
  };

  // update note
  let result;
  try {
    logger.info(`Updating note ${params.Key.noteId} for user ${params.Key.userId}`);
    result = await dynamoDb.update(params);
  } catch (error) {
    // if note not found
    if (error.message === "The conditional request failed") {
      throw new NotFoundException("Note not found");
    }
    throw new APIError(error.message);
  }

  result = result.Attributes;
  result.createdAt = new Date(result.createdAt);
  result.modifiedAt = new Date(result.modifiedAt);
  return result;
});

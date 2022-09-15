import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import {
  APIError,
  NotFoundException,
} from "../../utils/exceptions/NoteAppException";

export const main = handler(async (event, context) => {
  // param for get note
  const params = {
    TableName: process.env.notesTableName,
    Key: {
      // todo : get userId from cognito
      userId: event.queryStringParameters.userId, // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
  };
  let result;
  // get note from note table
  try {
    result = await dynamoDb.get(params);
  } catch (error) {
    console.log(error);
    throw new APIError(error.message);
  }
  if (!result.Item) {
    throw new NotFoundException("Note not found");
  }
  result.Item.createdAt = new Date(result.Item.createdAt);
  result.Item.modifiedAt = new Date(result.Item.modifiedAt);
  return result.Item;
});

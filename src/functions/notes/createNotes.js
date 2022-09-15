import * as uuid from "uuid";
import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { APIError } from "../../utils/exceptions/NoteAppException";

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
    await dynamoDb.put(params);
  } catch (error) {
    console.log(error);
    throw new APIError(error.message);
  }
  const result = {
    ...params.Item,
    createdAt: new Date(params.Item.createdAt),
    modifiedAt: new Date(params.Item.modifiedAt),
  };
  return result;
});

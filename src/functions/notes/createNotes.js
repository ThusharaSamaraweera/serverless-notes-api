import * as uuid from "uuid";
import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.notesTableName,
    Item: {
      userId: data.userId,
      noteId: uuid.v1(),
      content: data.content,
      createdAt: Date.new(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});

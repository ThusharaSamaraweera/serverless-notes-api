import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  console.log("event.body: ", event.body);
  // const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.notesTableName,
    Item: {
      userId: '123',
      noteId: uuid.v1(),
      content: "data.content",
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});

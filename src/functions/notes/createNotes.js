import * as uuid from "uuid";
import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.notesTableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      title: data.title,
      content: data.content,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    },
  };

  await dynamoDb.put(params);
  const result = {
    ...params.Item,
    createdAt: new Date(params.Item.createdAt),
    modifiedAt: new Date(params.Item.modifiedAt),
  };
  return result;
});

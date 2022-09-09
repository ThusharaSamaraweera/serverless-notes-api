import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.notesTableName,
    Key: {
      userId: event.pathParameters.userId, // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
    UpdateExpression: "SET content = :content",
    ExpressionAttributeValues: {
      ":content": data.content || null,
    },
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});

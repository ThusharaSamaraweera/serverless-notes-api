import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.notesTableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
    UpdateExpression: "SET content = :content, title = :title, modifiedAt = :modifiedAt",
    ExpressionAttributeValues: {
      ":content": data.content || 'No content',
      ":title": data.title || 'No title',
      ":modifiedAt": Date.now(),
    },
    ReturnValues: "ALL_NEW",
  };

  let result = await dynamoDb.update(params);
  result = result.Attributes;
  result.createdAt = new Date(result.createdAt);
  result.modifiedAt = new Date(result.modifiedAt);
  return result;
});

import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.notesTableName,
    Key: {
      userId: event.pathParameters.userId, // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }
  result.Item.createdAt = new Date(result.Item.createdAt);
  result.Item.modifiedAt = new Date(result.Item.modifiedAt);
  return result.Item;
});

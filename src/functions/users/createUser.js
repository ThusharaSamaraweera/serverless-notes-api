import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.usersTableName,
    Item: {
      userId: data.userId,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      country: data.country,
      state: data.state,
      phoneNumber: data.phoneNumber,
      mobileNumber: data.mobileNumber,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    },
  };

  // save the user to the database
  await dynamoDb.put(params);

  const result = {
    ...params.Item,
    createdAt: new Date(params.Item.createdAt),
    modifiedAt: new Date(params.Item.modifiedAt),
  };
  return result;
});

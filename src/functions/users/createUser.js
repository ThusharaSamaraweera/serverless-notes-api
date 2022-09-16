import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { APIError } from "../../utils/exceptions/NoteAppException";
import { logger } from "../../utils/logger";

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
  try {
    logger.info(`Inserting new user ${params.Item.userId}`);
    await dynamoDb.put(params);
  } catch (error) {
    throw new APIError(error.message);
  }

  const result = {
    ...params.Item,
    createdAt: new Date(params.Item.createdAt),
    modifiedAt: new Date(params.Item.modifiedAt),
  };
  return result;
});

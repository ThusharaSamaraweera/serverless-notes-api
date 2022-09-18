import AWS from "aws-sdk";
import { logger } from "../utils/logger";

const client = new AWS.DynamoDB.DocumentClient();

logger.info("DynamoDB client created");

export default {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};

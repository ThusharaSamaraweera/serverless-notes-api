import Joi from "joi";
import { validate } from "./validate.js";

function createUser(body) {
  const schema = Joi.object({
    userId: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(50).required(),
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    birthDate: Joi.date(),
    country: Joi.string().min(3).max(50),
    state: Joi.string().min(3).max(50),
    phoneNumber: Joi.string().min(3).max(50).required(),
    mobileNumber: Joi.string().min(3).max(50)
  });
  return validate(schema, body);
}

export default {
  createUser,
};

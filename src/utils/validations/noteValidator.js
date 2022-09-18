import Joi from "joi";
import { validate } from "./validate.js";

function createNote(body) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    content: Joi.string().min(3).max(250).required(),
    categoryId: Joi.number().min(3).max(50).required(),
  });
  return validate(schema, body);
}

function updateNote(body) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    content: Joi.string().min(3).max(250).required(),
    categoryId: Joi.number().min(3).max(50).required(),
  });
  return validate(schema, body);
}

export default {
  createNote,
  updateNote,
};

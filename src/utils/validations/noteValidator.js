import Joi from "joi";
import { NOTE_STATUS } from "../../constant.js";
import { validate } from "./validate.js";

function createNote(body) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    content: Joi.string().min(3).max(250).required(),
    categoryId: Joi.number().required(),
    status: Joi.string()
      .required()
      .valid(NOTE_STATUS.active, NOTE_STATUS.completed, NOTE_STATUS.draft),
  });
  return validate(schema, body);
}

function updateNote(body) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    content: Joi.string().min(3).max(250).required(),
    categoryId: Joi.number().required(),
    status: Joi.string()
      .required()
      .valid(NOTE_STATUS.active, NOTE_STATUS.completed, NOTE_STATUS.draft),
  });
  return validate(schema, body);
}

export default {
  createNote,
  updateNote,
};

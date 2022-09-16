import { BadRequestException } from "../exceptions/NoteAppException";

export function validate(schema, data) {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { value, error } = schema.validate(data, options);

  if (error) {
    throw new BadRequestException("Invalid request format ", error.details);
  }

  return value;
}

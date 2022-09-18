export class NoteAppException extends Error {
  name;
  httpCode;
  description;

  constructor(message, httpCode, description) {
    super(message);
    this.httpCode = httpCode;
    this.description = description || "No additional description";
  }
}

export class NotFoundException extends NoteAppException {
  constructor(message, description) {
    super(message, 404, description);
  }
}

export class APIError extends NoteAppException {
  constructor(message, description) {
    super(message, 500, description);
  }
}

export class BadRequestException extends NoteAppException {
  constructor(message, description) {
    super(message, 400, description);
  }
}

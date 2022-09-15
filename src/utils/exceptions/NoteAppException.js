export class NoteAppException extends Error {
  name;
  httpCode;

  constructor(message, httpCode) {
    super(message);
    this.httpCode = httpCode;
  }
}

export class NotFoundException extends NoteAppException {
  constructor() {
    super('Not found', 404);
  }
}

export class APIError extends NoteAppException {
  constructor(message) {
    super(message, 500);
  }
}
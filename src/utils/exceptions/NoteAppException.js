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

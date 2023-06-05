export class UnauthorizedError extends Error {
  constructor() {
    super('Error with unauthorized.');
  }
}

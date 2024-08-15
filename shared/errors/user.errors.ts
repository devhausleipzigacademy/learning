export class UserNotFoundError extends Error {
  constructor(options?: ErrorOptions) {
    super('User not found', (options = {}));
  }
}

export class InvalidInviteError extends Error {
  constructor(options?: ErrorOptions) {
    super('Invalid invite', (options = {}));
  }
}

export class NoInviteError extends Error {
  constructor(options?: ErrorOptions) {
    super("You're not invited", (options = {}));
  }
}

export class InviteNotApprovedError extends Error {
  constructor(options?: ErrorOptions) {
    super("You're invite is still pending", (options = {}));
  }
}

export class UserAlreadyRegisteredError extends Error {
  constructor(options?: ErrorOptions) {
    super('User already registered', (options = {}));
  }
}

export class InviteAlreadyExistsError extends Error {
  constructor(options?: ErrorOptions) {
    super('Invite already exists', (options = {}));
  }
}

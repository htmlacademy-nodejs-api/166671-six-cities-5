export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DataBaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
} as const;

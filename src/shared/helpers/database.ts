export const getMongoURI = (
  username: string,
  password: string,
  host: string,
  port: string,
  dataBaseName: string
): string =>
  `mongodb://${username}:${password}@${host}:${port}/${dataBaseName}`;

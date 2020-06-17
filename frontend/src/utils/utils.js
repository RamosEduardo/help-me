export function getUserIdByToken({tokenParam}) {
  const token = new Buffer(tokenParam, "base64").toString("ascii");
  const user = token.split('//');
  return user[0];
}
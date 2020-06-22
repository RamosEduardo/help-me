export function getUserIdByToken({tokenParam}) {
  const token = Buffer.alloc(tokenParam, "base64").toString("ascii");
  const user = token.split('//');
  return user[0];
}
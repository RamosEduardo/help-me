module.exports = {
  getUserIdByToken({ token }) {
    const stringToken = new Buffer(token, "base64").toString("ascii");
    if (!stringToken)
      return '';
    const [ userId ] = stringToken.split('//');
    if (!userId)
      return undefined;
    return userId
  },
  generateTokenSession({ value }) {
    return new Buffer(value).toString("base64");
  }
}
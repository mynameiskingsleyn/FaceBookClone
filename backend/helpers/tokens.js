const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PASSWORD_HASH_NUM } = process.env.PASSWORD_HASH_NUM || 12;

exports.generateToken = (payload, expired) => {
  let expireTime = expired ? expired : process.env.TOKEN_EXPIRE;

  return jwt.sign(payload, process.env.TOKEN_SECRETE, {
    expiresIn: expireTime,
  });
};

exports.decodeToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRETE)
}

exports.passwordEncrypt = async (password) => {
  return await bcrypt.hash(password, +PASSWORD_HASH_NUM);
}

exports.compareEncrypts = async (first, second) => {
  return await bcrypt.compare(first, second);
}

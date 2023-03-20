const jwt = require("jsonwebtoken");

exports.generateToken = (payload, expired) => {
  let expireTime = expired ? expired : process.env.TOKEN_EXPIRE;

  return jwt.sign(payload, process.env.TOKEN_SECRETE, {
    expiresIn: expireTime,
  });
};

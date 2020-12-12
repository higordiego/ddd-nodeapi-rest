const jwt = require('jsonwebtoken');

module.exports = class Jwt {

  decode(token) {
    return jwt.decode(token);
  }

  sign(data, key, ttl = 3600) {
    return jwt.sign(data, key, { expiresIn: ttl })
  }

  verify(token, key) {
    jwt.verify(token, key)
  }

}

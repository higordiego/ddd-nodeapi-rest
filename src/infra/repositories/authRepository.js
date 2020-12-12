
module.exports = class AuthRepository {
  constructor({ encryption, jwt }) {
    this.encryption = encryption;
    this.jwt = jwt;
  }

  decodeToken(token) {
    return this.jwt.decode(token)
  }

  generateToken(user, key, ttl = 3600) {
    return this.jwt.sign(user, key, ttl)
  }

  verifyToken(token, key) {
    return jwt.verify(token, key)
  }

  verifyPassword(password, encodedPassword) {
    this.encryption.compare(password, encodedPassword)
  }
}


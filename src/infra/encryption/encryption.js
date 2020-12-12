// dependencies
const bcrypt = require('bcrypt');

module.exports = class Encryption {

  compare(password, encodedPassword) {
    return bcrypt.compareSync(password, encodedPassword);
  }

  encrypt(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

}
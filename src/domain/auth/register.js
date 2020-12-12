const { attributes } = require('structure');

module.exports = attributes({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    email: true,
  },
  password: {
    type: String,
    required: true,
  },
})

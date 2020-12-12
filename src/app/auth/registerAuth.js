// Domain
const Register = require('../../domain/auth/register')
const User = require('../../domain/user')

module.exports = class RegisterAuth {
  constructor({ encryption, userRepository }) {
    this.encryption = encryption
    this.userRepository = userRepository
  }

  async execute(args) {

    const registerData = Register(args);
    const { valid, errors } = registerData.validate(args);

    if (!valid) {
      const error = new Error('Validation failed!');
      error.errors = errors;
      throw error;
    }

    const existing = await this.userRepository.find('email', args.email);
    if (existing) {
      const error = new Error('Email already exists.');
      error.errors = [{ message: 'Email already exists.', path: ['email'] }];
      throw error;
    }

    const data = {
      ...args,
      password: this.encryption.encrypt(args.password),
    };


    const newUser = await this.userRepository.create(data);

    delete newUser.dataValues.password;

    const domainUser = new User(newUser.dataValues);

    return domainUser.toJSON();

  }
}

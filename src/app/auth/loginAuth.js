// Domain
const Login = require('../../domain/auth/login')

module.exports = class LoginAuth {
  constructor({ config, authRepository, userRepository }) {
    this.config = config
    this.authRepository = authRepository
    this.userRepository = userRepository
  }

  async execute(args) {

    const loginData = new Login(args);
    const { valid, errors } = loginData.validate(args);

    if (!valid) {
      const error = new Error('Validation failed!');
      error.errors = errors;
      throw error;
    }

    const existing = await this.userRepository.find('email', args.email);
    if (!existing) {
      const error = new Error('Invalid account credentials.');
      throw error;
    }

    const { dataValues: user } = existing;
    if (!authRepository.verifyPassword(args.password, user.password)) {
      const error = new Error('Invalid account credentials.');
      throw error;
    }

    const info = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = authRepository.generateToken(info, config.jwt.secret, config.jwt.ttl)

    return { user: info, token }
  }
}



module.exports = class AuthorizeAuth {
  constructor(authRepository, userRepository) {
    this.authRepository = authRepository
    this.userRepository = userRepository
  }
  async execute(token) {

    const decodedToken = this.authRepository.decodeToken(token);

    const currentTime = Math.round(Date.now() / 1000);
    if (currentTime > decodedToken.exp) {
      const error = new Error('Token expired.');
      throw error;
    }

    const existing = await this.userRepository.find('email', decodedToken.email);

    if (!existing) throw new Error('Unauthorized access.');

    delete existing.dataValues.password;

    return existing.dataValues;
  }
}

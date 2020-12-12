// Dependencies
const Status = require('http-status');

module.exports = async (req, res, next) => {
  if (!req.headers['authorization']) return res.status(Status.UNAUTHORIZED).json({ message: 'Unauthorized access.', });


  const authorizeAuth = req.container.resolve('authorizeAuth');
  const userAuth = req.container.resolve('userAuth');
  try {
    const user = await authorizeAuth.execute(req.headers['authorization']);

    userAuth.setUser(user);

    next();
  } catch (error) {
    switch (error.message) {
      case 'Token expired.':
        return res.status(Status.UNAUTHORIZED).json({ message: 'Token expired.' })
      default:
        return res.status(Status.UNAUTHORIZED).json({ message: 'Unauthorized access.' });
    }
  }
};

module.exports = authorize;

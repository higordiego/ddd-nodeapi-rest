// Dependencies
const Status = require('http-status');
const { Router: router } = require('express');


module.exports = ({

  async login(req, res) {
    try {
      const loginAuth = req.container.resolve('loginAuth')

      const result = await loginAuth.execute(req.body)

      return res.status(Status.OK).json({ data: result })
    } catch (error) {
      switch (error.message) {
        case 'Validation failed!':
          return res.status(Status.BAD_REQUEST).json(error.errors);
        default:
          return res.status(Status.SERVICE_UNAVAILABLE).json({ message: error.message })
      }
    }
  },


  async register(req, res) {
    try {
      const registerAuth = req.container.resolve('registerAuth')
      const result = await registerAuth.execute(req.body)
      return res.status(Status.OK).json({ message: 'Account successfully registered.', data: result })
    } catch (error) {
      switch (error.message) {
        case 'Email already exists.':
        case 'Validation failed!':
          return res.status(Status.BAD_REQUEST).json(error.errors);
        default:
          return res.status(Status.SERVICE_UNAVAILABLE).json(error);
      }
    }
  },



  routes() {
    router.post('/login', this.login.bind(this));
    router.post('/register', this.register.bind(this));

    return {
      name: '/auth',
      // middleware: AuthorizeMiddleware,
      router: this.router,
    };
  }
})

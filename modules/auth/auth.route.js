const AuthRouter = require('express').Router();
const isAuth = require('../shared/isAuth');
const AuthController = require('./auth.controller');
// post /api/auth/login
AuthRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await AuthController.findUser({ username, password });
    res.send({ success: 1, data: user })
  } catch (err) {
    res.send({ success: 0, message: err.message })
  }
});

// post /api/auth/signup
AuthRouter.post('/signup', async (req, res) => {
  // logic
  try {
    const { username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      throw new Error('Password and confirm password unmatched')
    }
    const user = await AuthController.createUser({ username, password });
    res.send({ success: 1, data: user })
  } catch (err) {
    res.send({ success: 0, message: err.message })
  }
});

AuthRouter.get('/verify', isAuth, async (req, res) =>{
  res.send({ success: 1, data: req.user });
})

module.exports = AuthRouter;
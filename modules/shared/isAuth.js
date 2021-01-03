const jwt = require('jsonwebtoken');
const UserModel = require('../auth/user');

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  console.log(token)
  try {
    if (!token) throw new Error('jwt required');
    
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    const { userId } = data;
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      throw new Error('Not found user')
    }
    req.user = foundUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ success: 0, message: err.message || 'Unauth'})
  }
}

module.exports = isAuth;
require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader)
    return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err)
        return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
      req.user = data.user;
      next();
    });
  } catch (err) {
    throw err;
  }
};

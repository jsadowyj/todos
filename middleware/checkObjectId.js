const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const checkObjectId = (id) => (req, res, next) => {
  if (!id || !ObjectId.isValid(req.params[id]))
    return res
      .status(400)
      .json({ errors: [{ msg: 'Invalid ID', status: 400 }] });
  next();
};

module.exports = checkObjectId;

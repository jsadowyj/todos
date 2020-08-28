require('dotenv').config();

// npm imports
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json({ extended: false }));

// Routes
app.use(require('./routes/api/auth'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  res.status(status).json({ errors: [{ msg: 'Server Error' }] });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
  });

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json({ extended: false }));

// Routes
app.use(require('./routes/api/auth'));
app.use(require('./routes/api/todos'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const msg = err.customMsg || 'Server Error';
  res.status(status).json({ errors: [{ msg }] });
});

// Add 404 Middleware
app.use((req, res, next) => {
  res.status(404).json({ errors: [{ msg: 'Not found', status: 404 }] });
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

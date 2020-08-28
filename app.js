require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.json({ msg: 'API Running' });
});

app.use(require('./routes/api/auth'));

app.get('/error', (req, res) => {
  throw new Error('bruh');
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({ msg: 'Something broke on our end!' });
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

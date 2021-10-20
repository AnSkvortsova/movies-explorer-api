require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT } = process.env;

const app = express();

mongoose.connect(
  'mongodb://localhost:27017/bitfilmsdb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('connected to MongoDB');
  },
);

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}`);
});

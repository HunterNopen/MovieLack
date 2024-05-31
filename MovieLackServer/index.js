const express = require('express');
const filmCategories = require('./routes/filmCategories');
const films = require('./routes/films');
const users = require('./routes/users');
const app = express();
const PORT = 5001;
const cors = require('cors');
const bodyparser = require('body-parser');

app.use(cors());
app.use(bodyparser.json());
app.use('/filmCategories', filmCategories);
app.use('/films', films);
app.use('/users', users);

const server = app.listen(PORT, () => {
  console.log('Running... Brrrrr....');
});

const express = require('express');
const filmCategories = express.Router();
const pool = require('../shared/pool');

filmCategories.get('/', (req, res) => {
  pool.query('select * from category', (error, categories) => {
    if (error) {
      res.status(500).send({
        error: error.code,
        message: error.message,
      });
    } else {
      res.status(200).send(categories);
    }
  });
});

module.exports = productCategories;

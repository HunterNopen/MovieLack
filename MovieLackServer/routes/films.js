const express = require('express');
const films = express.Router();
const pool = require('../shared/pool');

films.get('/', (req, res) => {
  var mainCategoryId = req.query.maincategoryid;
  var subCategoryId = req.query.subcategoryid;
  var keyword = req.query.keyword;

  let query = 'select * from films';
  if (subCategoryId) {
    query += ' where category_id = ' + subCategoryId;
  }

  if (mainCategoryId) {
    query = `select films.* from films, category 
    where films.category_id = category.id and category.parent_category_id = ${mainCategoryId}`;
  }

  if (keyword) {
    query += ` and keywords like '%${keyword}%'`;
  }

  pool.query(query, (error, products) => {
    if (error) {
      res.status(500).send({
        error: error.code,
        message: error.message,
      });
    } else {
      res.status(200).send(products);
    }
  });
});

products.get('/(:id)', (req, res) => {
  let id = req.params.id;
  pool.query('select * from films where id = ' + id, (error, products) => {
    if (error) {
      res.status(500).send({
        error: error.code,
        message: error.message,
      });
    } else {
      res.status(200).send(products);
    }
  });
});

module.exports = products;

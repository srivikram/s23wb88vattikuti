var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let query = req.query;
  console.log(`rows ${query.rows}`);
  console.log(`cols ${query.cols}`);

  pugCode = `Number of rows: #{query.rows} <br>
  Number of cols: #{query.cols}`;

  let rows = Number(query.rows);
  let cols = Number(query.cols);

  if (!Number.isInteger(rows) || !Number.isInteger(cols)) {
    let error = new Error('Rows and columns must be integers');
    error.status = 400;
    next(error);
    return;
  }

  if (rows < 1 || rows > 10) {
    let error = new Error('Rows must be between 1 and 10');
    error.status = 400;
    next(error);
    return;
  }

  if (cols < 1 || cols > 10) {
    let error = new Error('Columns must be between 1 and 10');
    error.status = 400;
    next(error);
    return;
  }

  let data = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      let value;
      if (i === j) {
        value = 1;
      } else if (i < j) {
        value = j - i + 1;
      } else {
        value = 0;
      }
      row.push(value);
    }
    data.push(row);
  }

  console.log('data:', data);
  res.render('board', { title: 'Board Display', query: query, data: data });
});

module.exports = router;

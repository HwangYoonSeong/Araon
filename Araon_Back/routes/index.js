var express = require('express');
var router = express.Router();

const db = require('../db');
const Query = require('pg').Query

/* GET home page. */
router.get('/', function (req, res, next) {
  db.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('success!')
      res.json({ status: "success" });
    }
  });

});

/* TEST */
router.get('/test', function (req, res) {
  // res.json({ status: "success", position: req.params.txt })
  const query = new Query("SELECT * FROM users");
  db.query(query)

  var rows = [];

  query.on("row", row => { rows.push(row); });
  query.on('end', () => {
    console.log(rows);
    console.log('query done');
    res.send(rows); res.status(200).end();
  });
  query.on('error', err => {
    console.error(err.stack);
    res.send({ error: err });
  });

});


module.exports = router;


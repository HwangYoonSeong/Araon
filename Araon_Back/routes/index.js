var express = require('express');
var router = express.Router();

const db = require('../db');
const Query = require('pg').Query

/* GET home page. */
router.get('/', function (req, res, next) {
  db.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
      res.json({ status: "error" });
    } else {
      console.log('connection success!')
      res.json({ status: "success" });
    }
  });

});

router.post('/upload', function (req, res) {
  // res.json({ res: "Hello World" });
  // console.log(req.body);
  const query = new Query(`INSERT INTO images (image) VALUES('${req.body.image}')`);
  db.query(query)
  // var rows = [];

  // query.on("row", row => { rows.push(row); });

  query.on('end', () => {
    console.log('query done');
    res.status(200).end();
  });
  query.on('error', err => {
    console.error(err.stack);
    res.send({ error: err });
  });

});


router.get('/load', function (req, res) {
  // res.json({ res: "Hello World" });
  // console.log(req.body.base64);
  // res.json({ res: "Hello World" });
  const query = new Query(`SELECT image from images `);
  db.query(query)
  var rows = [];

  query.on("row", row => { rows.push(row); });

  query.on('end', () => {
    // console.log(rows);
    console.log('query done');
    res.send(rows);
    res.status(200).end();
  });
  query.on('error', err => {
    console.error(err.stack);
    res.send({ error: err });
  });

});


/* TEST */
router.get('/test', function (req, res) {
  res.json({ res: "Hello World" });
});




module.exports = router;


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

router.post('/login', function (req, res) {
  // res.json({ res: "Hello World" });
  // console.log(req.body);
  // const query = new Query(`INSERT INTO images (image) VALUES('${req.body.image}')`);
  const query = new Query(`select user_mst.user_id, user_mst.user_pwd  from user_mst where user_mst.user_id='${req.body.id}' and user_mst.user_pwd='${req.body.pw}';`);
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ status: "error" });
    }
    console.log(result.rows.length);
    if (result.rows.length === 1) {
      res.status(200).json({ status: "succeess" });
    } else {
      res.status(400).json({ status: "wrong" });
    }

  })
  // var rows = [];

  // query.on("row", row => { rows.push(row); });
  // console.log(rows.length);
  // if (rows.length === 1) {

  // }
  // query.on('end', () => {
  //   console.log('query done');
  //   // res.send(rows);
  //   res.json({ res: rows });
  //   res.status(200).end();
  // });
  // query.on('error', err => {
  //   console.error(err.stack);
  //   res.send({ error: err });
  // });

});

/* TEST */
router.get('/test', function (req, res) {
  res.json({ res: "Hello World" });
});




module.exports = router;


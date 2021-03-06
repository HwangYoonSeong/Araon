var express = require('express');
var router = express.Router();

const db = require('../config/db');
const Query = require('pg').Query
const jwt = require("jsonwebtoken");
const secretKey = require("../config/jwt");
const imageUploader = require('./image.controller').imageUpload;
router.use('/images', express.static('images/'));

router.post('/carousel/input', imageUploader('images/').array('images[]'), (req, res) => {
  let query = '';

  req.files.forEach((el) => {
    query += `INSERT INTO brochure VALUES('${req.body.groupname}','${el.originalname}');`;
  })

  db.query(query, (err, result) => {
    if (!err) {
      res.status(200).end();
    }
    else {
      console.log(err);
      res.send({ error: err });
    }
  });
});

router.get('/carousel/list', (req, res) => {
  const query = new Query(`select distinct brochure.group from brochure`);
  db.query(query)
  var rows = [];
  query.on("row", row => { rows.push(row); });

  query.on('end', () => {
    console.log('query done');
    res.send(rows);
    res.status(200).end();
  });
  query.on('error', err => {
    console.error(err.stack);
    res.send({ error: err });
  });
});

router.get('/carousel/list/:tablename', (req, res) => {
  console.log(req.params.tablename)
  const query = new Query(`select * from brochure where brochure.group='${(req.params.tablename)}' `);
  db.query(query)

  var rows = [];
  query.on("row", row => { rows.push(row); });

  query.on('end', () => {
    console.log('query done');
    res.send(rows);
    res.status(200).end();
  });
  query.on('error', err => {
    console.error(err.stack);
    res.send({ error: err });
  });
});

////////////////////////////////////////////////////////////////////////////////////

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
  const query = new Query(`SELECT image from images `);
  db.query(query)
  var rows = [];
  query.on("row", row => { rows.push(row); });

  query.on('end', () => {
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
  const query = new Query(`select user_mst.user_id, user_mst.user_pwd  from user_mst where user_mst.user_id='${req.body.id}' and user_mst.user_pwd='${req.body.pw}';`);
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ status: "error" });
    }
    if (result.rows.length === 1) {
      const token = jwt.sign({
        id: result.rows[0].user_id,
        time: new Date()
      },
        secretKey.secret,
        {
          expiresIn: '8d'
        });
      res.status(200).json({
        status: 'success',
        token: token,
      });
    } else {
      res.status(400).json({ status: "wrong" });
    }
  })
});

router.get('/verifytoken', function (req, res) {
  const token = req.header('token');
  console.log("TOKEN: " + token)
  if (token == undefined) res.status(401).json({ status: "tokenMissing" })
  try {
    const decoded = jwt.verify(token, secretKey.secret);
    if (decoded) {
      res.locals.id = decoded.id
      res.locals.time = decoded.time
      res.status(200).json({
        id: decoded.id,
        time: decoded.time
      })
    }
    else {
      res.status(500).json({ status: "unauthorized" });
    }
  }
  catch (err) {
    console.log(err);
    res.status(401).json({ status: "tokenExpired" });
  }
});

/* TEST */
router.get('/test', function (req, res) {
  res.json({ res: "Hello World" });
});

module.exports = router;


var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

const config = require('../config');
const secret = config.secret;

var User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({}, function (err, _users) {
    if (err) {
      return res.status(500).send("There was a problem finding the users.");
    }
    res.status(200).send(_users);
  });
});

// CREATES A NEW USER
router.post('/add', function (req, res) {
  let user = new User({
    username: req.body.username,
    password: req.body.password,
    permission: req.body.permission
  });

  user.save()
    .then((_user) => {
      res.status(200).send(_user);
    })
    .catch((err) => {
      res.status(500).send("There was a problem adding the information to the database.");
    });
});

//FIND USER BY USERNAME AND PASSWORD
router.post('/authenticate', function (req, res, next) {
  const {
    username,
    password
  } = req.body
  User.findOne({
    username: username
  }, function (err, _user) {
    if (err) {
      res.status(500).send({
        error: 'Internal error please try again'
      });
    } else if (!_user) {
      res.status(401).send({
        error: 'Tài khoản hoặc mật khẩu không đúng!'
      });
    } else {
      _user.isCorrectPassword(password, function (err, sam) {
        if (err) {
          res.status(500).send({
            error: 'Internal error please try again'
          });
        } else if (!sam) {
          res.status(401).send({
            error: 'Tài khoản hoặc mật khẩu không đúng!'
          });
        } else {
          // Issue token
          const payload = {
            username_id: _user._id,
            username: _user.username
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: '24h'
          });
          res.cookie('token', token, {
            httpOnly: true
          })
            .status(200).json({
              user: payload
            });
        }
      });
    }
  });
});

router.get('/logout', function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.clearCookie("token");
  res.send({
    message: 'user logout successfully'
  });
});

module.exports = router;

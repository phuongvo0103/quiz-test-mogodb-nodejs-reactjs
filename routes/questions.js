var express = require('express');
var router = express.Router();

var Question = require('../models/Question');

const withAuth = require('../models/customMiddleware');

router.use(withAuth);

/* GET users listing. */
router.get('/', function(req, res, next) {
    Question.find({},function (err, _questions) {
      if (err) {
        return res.status(500).send("There was a problem finding the users.");
      }
      res.status(200).send(_questions);
    });
});

router.get('/getQuestionById/:id', function(req, res, next) {
  const _id = req.params.id;
  Question.find({exam_code:_id},function (err, _questions) {
    if (err) {
      return res.status(500).send("There was a problem finding the users.");
    }
    
    res.status(200).send(_questions);
  });
});

router.get('/pagenation/:id/:pageLimit', function(req, res, next) {
  const _id = req.params.id;
  const _pageLimit = req.params.pageLimit;
  Question.find({exam_code:_id},function (err, _questions) {
    if (err) {
      return res.status(500).send("There was a problem finding the users.");
    }
    
    res.status(200).send(_questions);
  }).limit(60).skip(60*_pageLimit);
});

// CREATES A NEW USER
router.post('/add', function (req, res) {
    let question = new Question({
        question_name: req.body.question_name,
        answers: req.body.answers,
        answer_correct: req.body.answer_correct,
        exam_code : req.body.exam_code,
    });

    console.log(req.body.question_name);
    question.save()
              .then((_question)=>{
                res.status(200).send(_question);
              })
              .catch((err)=> {
                res.status(500).send("There was a problem adding the information to the database.");
              });
  });

  module.exports = router;
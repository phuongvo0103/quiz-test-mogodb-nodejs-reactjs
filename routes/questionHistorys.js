var express = require('express');
var router = express.Router();

var QuestionHistory = require('../models/QuestionHistory');

const withAuth = require('../models/customMiddleware');

router.use(withAuth);

/* GET users listing. */
router.get('/', function(req, res, next) {
  QuestionHistory.find({},function (err, _questionHistorys) {
      if (err) {
        return res.status(500).send("There was a problem finding the users.");
      }
      res.status(200).send(_questionHistorys);
    });
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  const __id = req.params.id;
  QuestionHistory.find({exam_result_id: __id},function (err, _questionHistorys) {
      if (err) {
        return res.status(500).send("There was a problem finding the users.");
      }
      res.status(200).send(_questionHistorys);
    });
});

// CREATES A NEW USER
router.post('/add', function (req, res) {
    let questionHistory = new QuestionHistory({
      exam_result_id: req.body.exam_result_id,
      questions : req.body.questions
    });

    console.log(questionHistory);
  
    questionHistory.save()
              .then((_questionHistory)=>{
                res.status(200).send(_questionHistory);
              })
              .catch((err)=> {
                res.status(500).send("There was a problem adding the information to the database.");
              });
  });

  module.exports = router;
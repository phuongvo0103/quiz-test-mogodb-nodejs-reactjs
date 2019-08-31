var express = require('express');
var router = express.Router();

var ExamResult = require('../models/ExamResult');

const withAuth = require('../models/customMiddleware');

router.use(withAuth);

/* GET users listing. */
router.get('/', function(req, res, next) {
    ExamResult.find({},function (err, _examResults) {
      if (err) {
        return res.status(500).send("There was a problem finding the users.");
      }
      res.status(200).send(_examResults);
    });
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  const __id = req.params.id;
  ExamResult.find({_id: __id},function (err, _examResults) { 
    if (err) {
      return res.status(500).send("There was a problem finding the users.");
    }
    res.status(200).send(_examResults);
  });
});

/* GET users listing. */
router.get('/:id/:examCode', function(req, res, next) {
  const username_id = req.params.id;
  const _examCode = req.params.examCode;
  ExamResult.find({username: username_id, exam_code: _examCode},function (err, _examResults) { 
    if (err) {
      return res.status(500).send("There was a problem finding the users.");
    }
    res.status(200).send(_examResults);
  });
});

// CREATES A NEW USER
router.post('/add', function (req, res) {
    let examResult = new ExamResult({
        exam_code : req.body.exam_code,
        username: req.body.username,
        number_correct : req.body.number_correct,
        total_complete : req.body.total_complete
    });
  
    examResult.save()
              .then((_examResult)=>{
                
                res.status(200).send(_examResult);
              })
              .catch((err)=> {
                res.status(500).send("There was a problem adding the information to the database.");
              });
  });

  module.exports = router;
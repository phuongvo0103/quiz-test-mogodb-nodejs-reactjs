var express = require('express');
var router = express.Router();

var Subject = require('../models/Subject');

const withAuth = require('../models/customMiddleware');

router.use(withAuth);

/* GET users listing. */
router.get('/', function(req, res, next) {
    Subject.find({},function (err, _subjects) {
      if (err) {
        return res.status(500).send("There was a problem finding the users.");
      }
      res.status(200).send(_subjects);
    });
});

// CREATES A NEW USER
router.post('/add', function (req, res) {
    let subject = new Subject({
        exam_code : req.body.exam_code,
        subject_name : req.body.subject_name,
        image : req.body.image
    });
  
    subject.save()
              .then((_subject)=>{
                res.status(200).send(_subject);
              })
              .catch((err)=> {
                res.status(500).send("There was a problem adding the information to the database.");
              });
  });

  module.exports = router;
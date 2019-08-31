var mongoose = require('mongoose');  
var QuestionSchema = new mongoose.Schema({
    question_name: {
        type: String,
        required: true
    },
	answers:[{
		answer_name: {
            type: String,
            required: true
        },
		answer_value:{
            type: String,
            required: true
        }
	}],
	answer_correct:{
        type: String
    },
	exam_code: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subjects'
    }
});

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
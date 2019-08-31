var mongoose = require('mongoose');  
var QuestionHistorySchema = new mongoose.Schema({
	exam_result_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'examresults',
        required: true,
        unique: true
    },
	questions: [{
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
        answer_chooise: String,
        answer_correct:{
            type: String
        },
        exam_code: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subjects'
        }
    }]
});

var QuestionHistory = mongoose.model('QuestionHistory', QuestionHistorySchema);

module.exports = QuestionHistory;
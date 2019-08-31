var mongoose = require('mongoose');  
var ExamResultSchema = new mongoose.Schema({
	exam_code: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subjects',
        required: true
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    number_correct: {
        type: Number,
        required: true
    },
    total_complete: {
        type: Number,
        required: true
    }
});

var ExamResult = mongoose.model('ExamResult', ExamResultSchema);

module.exports = ExamResult;
var mongoose = require('mongoose');  
var SubjectSchema = new mongoose.Schema({  
    exam_code: {
        type: Number,
        required: true,
        unique: true
    },
    subject_name: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

var Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;
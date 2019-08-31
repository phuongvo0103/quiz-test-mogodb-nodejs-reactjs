var mongoose = require('mongoose');

const username =  "phuongvv";
const password =  "25051995";
const uris = `mongodb+srv://${username}:${password}@cluster0-ibvtf.mongodb.net/db-quiz-exam?retryWrites=true&w=majority`;
mongoose.connect(uris,{ useNewUrlParser: true },(err)=>{
    if (err) {
        console.log(err);
    } else{
        console.log("connect db success");
    }
});

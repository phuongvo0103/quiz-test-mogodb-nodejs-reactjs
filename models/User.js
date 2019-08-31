var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({  
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    permission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'permissions'
    }
});

UserSchema.pre("save",function (next) { 
    if (this.isNew || this.isModified) {
        // Saving reference to this because of changing scopes
        const document = this;
        bcrypt.hash(document.password, saltRounds,
            function(err, hashedPassword) {
            if (err) {
                next(err);
            }
                else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
 });

 UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  }

var User = mongoose.model('User', UserSchema);

module.exports = User;
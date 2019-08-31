var mongoose = require('mongoose');  
var PermissionSchema = new mongoose.Schema({  
    codeId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

var Permission = mongoose.model('Permission', PermissionSchema);

module.exports = Permission;
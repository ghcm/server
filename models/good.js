//var crypto = require('crypto');

var mongoose = require('lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    cat: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Cat' }],
        unique: false,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function(password) {
  //  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    return password;
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.methods.validateObj = function(obj) {
    for (var i in obj) {
        if (obj[i] == "") {
            console.log("1");
            return false;
        }
    }
    return true;
};

schema.methods.getPublicFields = function() {
    return {
        username: this.name,
        created: this.created,
        id: this.id
    };
};

exports.Good = mongoose.model('Good', schema);
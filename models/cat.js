//var crypto = require('crypto');

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    companyId: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
        unique: false,
        required: true
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

exports.Cat = mongoose.model('Cat', schema);
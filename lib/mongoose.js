var mongoose = require('mongoose');
var config = require('../config');


// Установим соединение с базой
mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

mongoose.connection.on('connected', function() {
    console.log('connected');
});

/* die on error
 mongoose.connection.on('error', function(err)  {
 console.error("Mongoose error", err);
 });
 */

console.log("DB initialized");

module.exports = mongoose;
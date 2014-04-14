var nconf = require('nconf');
var join = require('path').join;
//var bson = require('bson');

//var ENV = process.env.NODE_ENV;

nconf.argv()
    .env()
    .add("global",{type: 'file', file: join(__dirname, 'config.json') });

nconf.add('db', {type: 'file', file: join(__dirname, 'db.json')});
nconf.load();

module.exports = nconf;

/**
 * Module dependencies.
 */

var express = require('express');
var i18n = require("i18n");
var http = require('http');
var path = require('path');
var config = require('./config');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser({uploadDir: __dirname + '/public/files'}));
app.use(express.cookieParser('your secret here'));

// Setup database
var mongoose = require('./lib/mongoose');

var MongoStore = require("connect-mongo")(express);

app.use(express.session({
    secret: config.get("session:secret"),
    key: config.get("session:key"),
    cookie: config.get("session:cookie"),
    store: new MongoStore({mongoose_connection: mongoose.connection})

}));

//--------------------localization
i18n.configure({
    locales:['ru', 'en'],
    directory: __dirname + '/locales'    ,
    defaultLocale: 'en'
});

app.use(function(req, res, next){
    res.locals.l = i18n.__;
    res.locals.ln = i18n.__n;
    next();
});

app.use(function(req, res, next){
    res.locals.logo = config.get("logo");
    next();
});


app.use(i18n.init);


app.use(require("./middleware/loadUser.js"))


require('./routes')(app);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

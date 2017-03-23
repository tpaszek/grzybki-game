var express = require('express');
var bodyParser = require('body-parser');
var middleware = require("./middleware");
module.exports = function(repo, auth){  
    var app = express();
    var apiRouter = require("../routes/api")(repo);
    app.use(bodyParser.json());
    //app.use(auth);
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hjs');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/api', apiRouter);

    app.use(middleware.notFoundHandler);
    app.use(middleware.errorHandler);

    return app;
};
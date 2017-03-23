var express = require('express');
var router = express.Router();
var middleware = require("./middleware");
module.exports = function(repo){
    var routes = require("../src/api")(repo);
    router.post('/start', middleware.logger, routes.startGame);
    router.post('/finish', middleware.logger, routes.endGame);
    router.post('/check', middleware.logger, routes.checkMove);
    return router;
};
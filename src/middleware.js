module.exports = {
    logger: function logger (req, res, next) {
        console.log("incomming " + req.method + " request at auth", new Date());
        next();
    },
    notFoundHandler: function(req, res, next){
        var err = new Error("The page you are trying t reach does not exist.");
        err.status = 404;
        next(err);
    },
    errorHandler: function(err, req, res, next){
        console.error(err.stack);
        var status = err.status || 500;
        res.status(status).send("Status: "+ status +"<br>" + err.message);
    }
};
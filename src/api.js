var game = require('./game');
module.exports = function(repo){
    return {
        startGame: function(req, res, next){
            var user = req.body.user;
            var gameEntry = game.init(user, 15, 4);
            repo.startGame(gameEntry).then(function(entry){
                res.json({gameId: entry.id});
            })
            .catch(next);
        },
        endGame: function(req, res, next){
        },
        checkMove: function(req, res, next){
            repo.getGame(req.body.id, req.body.user).then(function(entry){
                if (entry === null){
                    var error = new Error('No game found');
                    error.status = 404;
                    next(error);
                    return;
                }
                
                res.json({gameId: entry.id, result: game.check(entry, req.body.combination)});
            })
            .catch(next);
        }
    };
};
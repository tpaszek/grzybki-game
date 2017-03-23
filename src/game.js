var uuid = require('uuid');

var messages = {
    GameOver: "Game Over",
    Winner: "Winner",
    TryAgain: "Try next combination"
};

var generateRandom = function(colorCount){
    return Math.round((Math.random() * 7) * (Math.random() * 13)) % colorCount;
};

var init = function (user, steps, colors, id) {
    var game = {
        user: user,
        maxSteps: steps,
        colors: colors,
        combination: [
            generateRandom(colors),
            generateRandom(colors),
            generateRandom(colors),
            generateRandom(colors),
        ],
        tries: []
    };

    return game;
};

var validate = function(gameComb, userComb){
    var result = [0,0,0,0];
    var toCheck = [];
    var values = [];
    for(var i = 0; i < gameComb.length; i++){
        if (gameComb[i] === userComb[i]){
            result[i] = 2;
        } else {
            toCheck.push(i);
            values.push(gameComb[i])
        }
    }

    while (toCheck.length > 0){
        var checked = toCheck.pop();
        var valueToFind = userComb[checked];
        var index = values.indexOf(valueToFind);
        if (index > -1){
            result[checked] = 1;
            values.splice(index, 1);
        }
    }

    return result.sort().reverse();
};

var check = function(game, userComb){
    if (game.tries.length === game.maxSteps){
        return {
            state: messages.GameOver,
            left: 0,
            solved: false
        };
    }

    game.tries.push(userComb);
    var result = this.validate(game.combination, userComb) || [];
    var isSolved = result.every(function(item){ return item === 2;});
    var left = game.maxSteps - game.tries.length;

    return {
        state: isSolved ? messages.Winner : (left > 0 ? messages.TryAgain : messages.GameOver),
        left: left,
        solved: isSolved,
        hits: result
    };
};

module.exports = {
    validate: validate,
    check: check,
    init: init,
    generateRandom: generateRandom,
    messages: messages
}
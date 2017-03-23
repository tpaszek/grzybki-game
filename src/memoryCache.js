var uuid = require('uuid');
module.exports = function() {
    var items = [];
    return {
        startGame: function (game) {
            game.id = game.id || uuid.v1();
            items.push(game);
            return Promise.resolve(game);
        },
        getGame: function (id, user) {
            var foundItem = null;
            items.forEach(function(item) {
                if (foundItem === null && item.id === id && item.user === user) {
                    foundItem = item;
                }
            });
            return Promise.resolve(foundItem);
        }
    };
};
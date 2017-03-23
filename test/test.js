var assert = require('assert');
var game = require("../src/game");

describe("IterationChecker -> ", function() {
    describe("generateRandom ->", function(){
        it("generates integer", function(){
            var number = game.generateRandom(5);
            assert.equal(true, number === (number | 0));
        });

        it("generates always less or equal to colorCount", function(done){
            var colorCount = 5;
            for(var i = 0; i < 1000; i++){
                var number = game.generateRandom(colorCount);
                assert.equal(true, number < colorCount, "The value is:" + number);
            }
            done();
        });
    });
    
    describe("validate ->", function(){
        it("all matching values", function(){
            var result = game.validate([1,2,3,4],[1,2,3,4]);
            assert.deepEqual(result, [2,2,2,2]);
        });
        it("all switched values", function(done){
            var result = game.validate([1,2,3,4],[4,3,2,1]);
            assert.deepEqual(result, [1,1,1,1]);
            done();
        });
        it("none matching values", function(done){
            var result = game.validate([1,2,3,4],[5,5,5,5]);
            assert.deepEqual(result, [0,0,0,0]);
            done();
        });
    });

    describe("check ->", function(){
        it("game ended already", function(){
            var entry = {
                tries:[[1,1,1,1]],
                maxSteps: 1
            };
            var result = game.check(entry, [1,2,3,4]);
            assert.equal(result.state, game.messages.GameOver);
            assert.equal(result.left, 0);
            assert.equal(result.solved, false);
        });
        it("game solved in last step", function(){
            var entry = {
                tries:[],
                maxSteps: 1,
                combination: [1,2,3,4]
            };
            var result = game.check(entry, [1,2,3,4]);
            var expected = {
                state: game.messages.Winner,
                left: 0,
                solved: true,
                hits: [2,2,2,2]
            };
            assert.deepEqual(result, expected);
        });
        
        it("game not solved in last step", function(){
            var entry = {
                tries:[],
                maxSteps: 1,
                combination: [1,2,3,4]
            };
            var result = game.check(entry, [4,3,2,1]);
            var expected = {
                state: game.messages.GameOver,
                left: 0,
                solved: false,
                hits: [1,1,1,1]
            };
            assert.deepEqual(result, expected);
        });
        
        it("game not solved, but steps left", function(){
            var entry = {
                tries:[],
                maxSteps: 2,
                combination: [1,2,3,4]
            };
            var result = game.check(entry, [4,3,2,1]);
            var expected = {
                state: game.messages.TryAgain,
                left: 1,
                solved: false,
                hits: [1,1,1,1]
            };
            assert.deepEqual(result, expected);
        });
        it("game solved, but steps left", function(){
            var entry = {
                tries:[],
                maxSteps: 2,
                combination: [1,2,3,4]
            };
            var result = game.check(entry, [1,2,3,4]);
            var expected = {
                state: game.messages.Winner,
                left: 1,
                solved: true,
                hits: [2,2,2,2]
            };
            assert.deepEqual(result, expected);
        });
    });
});
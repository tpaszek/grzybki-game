var repo = require("./memoryCache")();
//var auth = require("./auth")
var app = require("./app")(repo);
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Game listening on port " + port);
});
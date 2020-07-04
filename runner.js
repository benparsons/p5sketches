/*
* runner.js: start a new localhost http server on port 300.
* makes it easy to see the generated site.
*
* to run: node runner.js
*/
var express = require('express');
var app = express();
var fs = require('fs');

//process.chdir(__dirname + "/..");


app.get('/', function (req, res) {
    let dir = fs.readdirSync(".");
    let list = [];
    dir.filter(function(file) {
        var stat = fs.statSync(file);
        if (!(stat && stat.isDirectory())) {
            return;
        }
        if ([".git", "libraries", "node_modules", "new-blank", "images"].includes(file)) {
            return;
        }
        list.push(file);
    })
    list = list.map(file => {return `<li>
    <a href="${file}/">${file}</a>
    </li>`})
    res.send(list.join("\n"))
});

app.get('*', function (req, res) {
    var path = process.cwd() + req.path;
    if (fs.existsSync(path)) {
        res.sendFile(path);
    } else {
        res.sendFile(path + '.html');
    }
});

var server = app.listen(8989, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);

});

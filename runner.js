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
    dir.filter(function (file) {
        var stat = fs.statSync(file);
        if (!(stat && stat.isDirectory())) {
            return;
        }
        if ([".git", "libraries", "node_modules", "new-blank", "images"].includes(file)) {
            return;
        }
        list.push(file);
    })
    list = list.map(file => {
        let subdir = fs.readdirSync("./" + file);
        subdir = subdir.filter(s => s.startsWith("sketch"));
        console.log(subdir);
        let responseString = `<li>`;
        responseString += `<a href="${file}/">${file}</a>`
        responseString += `<ul>`;
        subdir.map(s => {
            let num = s.replace("sketch", "").replace(".js", "");
            responseString += `<li><a href="${file}/#${num}">${s}</a></li>`
        });
        responseString += `</ul>`;
        responseString += `</li>`;
        return responseString;
    })
    res.send("<ul>" + list.join("\n") + "</ul>")
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

var express = require("express"),
    app = express(),
    path = require('path'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    port = parseInt(process.env.PORT, 10) || 4567;
    app.use(methodOverride());
    app.use(bodyParser());
    app.use(express.static(__dirname + '/public'));
    app.use(errorHandler({
        dumpExceptions: true,
        showStack: true
    }));



if(!fs.existsSync(__dirname+"/tmp")){
    fs.mkdirSync(__dirname+"/tmp");
}

app.post("/share", function (req, res) {
        var text = req.body.text;
        console.log(text);
        fs.writeFile(__dirname+"/tmp/share.txt", text, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!",text);
            }
        });


});

app.get("/text", function (req, res) {
    path.exists(__dirname+"/tmp/share.txt", function(exists){
        if(exists){
            fs.readFile(__dirname+"/tmp/share.txt",'utf8', function (err, data) {
                if (err) throw err;
                res.json({'text':data});
            });
        }
        else{
            fs.writeFile(__dirname+"/tmp/share.txt", "", function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });

        }
    })




});

app.get("/", function (req, res) {
    res.redirect("/index.html");
});

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

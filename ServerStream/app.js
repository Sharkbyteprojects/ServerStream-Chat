var ex = require("express");
var app = ex();
var bodyParser = require("body-parser");
var http = require("http").createServer(app);
var names = __dirname + "/views/indexo.html";
app.use(ex.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(names);
});
app.get("/config", function (req, res) {
    res.set({
        'Content-Type': 'text/xml'
    });
    res.sendFile(__dirname + "/config.xml");
});
var stdin = process.openStdin();
app.get("/api/events", function (req, res) {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    });
    stdin.addListener("data", function (d) {
        var id = new Date().toLocaleTimeString().toString();
        res.write("id: " + id + "\n");
        res.write("data: " + d.toString() + "\n\n");
    });
});
app.post("/api/upstream", function (req, res) {
    var x = req.body.upload;
    console.log("USER WRITTEN: " + x);
    res.json({ ok: true });
});
http.listen(8080, function () {
    console.log("Listen on\thttp://localhost:8080\nType something:\n");
});

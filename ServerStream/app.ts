const ex: any = require("express");
const app: any = ex();
const bodyParser:any = require("body-parser");
const http: any = require("http").createServer(app);
const names: String = __dirname + "/views/indexo.html";
app.use(ex.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req:any, res:any) => {
    res.sendFile(names);
});
app.get("/config", (req: any, res: any) => {
    res.set({
        'Content-Type': 'text/xml'
    });
    res.sendFile(__dirname+"/config.xml");
});
const stdin = process.openStdin();
app.get("/api/events", (req:any, res:any) => {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
    });
    stdin.addListener("data", function (d) {
        let id: String = new Date().toLocaleTimeString().toString();
        res.write("id: " + id + "\n");
        res.write("data: " + d.toString() + "\n\n");
    });
});
app.post("/api/upstream", (req: any, res: any) => {
    const x: String = req.body.upload;
    console.log(`USER WRITTEN: ${x}`);
    res.json({ok: true});
});
http.listen(8080, () => {
    console.log("Listen on\thttp://localhost:8080\nType something:\n");
});

//UNIVERSAL CLIENT WRITTEN BY SHARKBYTEPROJECTS
import $ from "./jquery";
$(document).ready(() => {
    $.get("/config", (data) => {
        const config = $(data).find("config");
        const event = $(config).find("eventurl");
        const url = $(event).text();
        const up = $(config).find("upurl");
        const upurl = { method: $(up).attr("method"), url: $(up).text() };
        console.log("Upurl: " + JSON.stringify(upurl));
        console.log("EVSTREAM URL: " + url);
        $("button").click(() => {
            const tosend = $("input").val();
            const contenttosend = [
                upurl.url, { upload: tosend }, (data) => {
                    console.log("Ok: " + JSON.stringify(data.ok));
                    if (data.ok) {
                        $("input").val("");
                        $("pre").prepend(`<strong class="cli">Client:</strong> ${tosend}<br>`);
                    }
                }, "json"
            ];
            if (upurl.method === "post") {
                $.post(...contenttosend);
            } else if (upurl.method === "get") {
                $.get(...contenttosend);
            } else {
                console.error("Config Error");
            }
        });
        function listener() {
            var source = new EventSource(url);
            source.onerror = () => {
                alert("An Error occured, we try to reconnect you!");
                listener();
            };
            source.onmessage = function (e) {
                const data = e.data;
                $("pre").prepend(`<strong class="server">Server:</strong> ${data}<br>`);
            };
        }
        listener();
    }, "xml");
});
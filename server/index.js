const express = require("express");
const ws = require("ws");

const app = express();
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8080;

app.use("/", (req, res) => {
  res.send("Server");
});

const HttpServer = app.listen(port, host, () => {
  console.log("Server is open at port: ", port);
});

const webSocketServer = new ws.Server({
  server: HttpServer,
});

webSocketServer.on("connection", (ws, req) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  console.log(`새로운 ${ip} 접속`);

  if (ws.readyState === ws.OPEN) {
    ws.send(`클라이언트 [${ip}] 접속을 환영합니다. from Server`);
  }

  ws.on("message", (msg) => {
    console.log(`클라이언트로 부터 수신한 메시지: ${msg}`);
    ws.send(`we got message: ${msg} from Server`);
  });

  ws.on("error", (err) => {
    console.log(`we got error: ${err}`);
  });

  ws.on("close", () => {
    console.log(`websocket disconnected`);
  });
});

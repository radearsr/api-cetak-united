const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fs = require("fs");
// const https = require("https");

const app = express();

const portHttp = 5000;
// const portHttps = 448;

const apiRoutes = require("./routers/apiRouter");

app.use('/.well-known', express.static('.well-known'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  try {
    const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
    res.send(`Client From ${ipAddress}`);
  } catch (error) {
    res.send("Terjadi Kegagalan pada server cek log...");
  }
});

// https.createServer(
//   {
//     key: fs.readFileSync('/etc/letsencrypt/live/apicetak.webreports.web.id/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/apicetak.webreports.web.id/cert.pem'),
//     ca: fs.readFileSync('/etc/letsencrypt/live/apicetak.webreports.web.id/chain.pem'),
//   },
//   app
// ).listen(portHttps, () => {
//   console.log(`Listening https ${portHttps}`);
// });

app.listen(portHttp, () => {
  console.log(`http://localhost:${portHttp}`);
});


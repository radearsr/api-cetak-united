const express = require("express");
const cors = require("cors");
// const fs = require("fs");
// const https = require("https");
const { generateResponseError } = require("./utils/errorManagementUtils");
const logger = require("./utils/loggerUtils");

const app = express();

const portHttp = 5000;
// const portHttps = 448;

const apiRoutes = require("./routers/apiRouter");

app.use("/.well-known", express.static(".well-known"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} | ${req.url} | ${JSON.stringify(req.body)}`);
  next();
});

app.use("/api", apiRoutes);

app.get("/", (req, res, next) => {
  try {
    const ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
    res.send(`Client From ${ipAddress}`);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  logger.error(error.stack);
  const { code, message, status} = generateResponseError(error);
  res.status(code).send({
    status,
    message
  });
});

// https.createServer(
//   {
//     key: fs.readFileSync("/etc/letsencrypt/live/apicetak.webreports.web.id/privkey.pem"),
//     cert: fs.readFileSync("/etc/letsencrypt/live/apicetak.webreports.web.id/cert.pem"),
//     ca: fs.readFileSync("/etc/letsencrypt/live/apicetak.webreports.web.id/chain.pem"),
//   },
//   app
// ).listen(portHttps, () => {
//   console.log(`Listening https ${portHttps}`);
// });

app.listen(portHttp, () => {
  console.log(`http://localhost:${portHttp}`);
});


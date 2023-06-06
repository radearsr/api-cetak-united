const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const apiRoutes = require("./routers/apiRouter");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true}));
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

const port = 5000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);  
});

//curl -X POST -H "Content-Type: application/json"  -d '{"tujuan": "02420187", "start_date": "2022-08-01", "end_date": "2022-12-01"}' http://localhost:9000/api/history

const express = require("express");
const apiControllers = require("../controllers/apiController"); 
const router = express.Router();

router.post("/history", apiControllers.historyTrxByTujuan);
router.post("/print", apiControllers.printHistoryByKode);


module.exports = router;

const express = require("express");
const apiControllers = require("../controllers/apiController"); 
const router = express.Router();

router.post("/history", apiControllers.postHistoryByDestinationController);
router.post("/print", apiControllers.postHistoryByIdController);


module.exports = router;

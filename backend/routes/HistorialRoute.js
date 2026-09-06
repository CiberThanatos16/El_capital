const express = require("express");
const router = express.Router();
const HistorialController = require("../controller/HistorialController");
const verificarToken = require("../Middleware/authMiddleware");

router.get("/", verificarToken, HistorialController.getHistorial);

module.exports = router;
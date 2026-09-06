const express = require("express");
const router = express.Router();
const GastoController = require("../controller/GastoController");
const verificarToken = require("../Middleware/authMiddleware");

router.get("/", verificarToken, GastoController.getGasto);
router.post("/", verificarToken, GastoController.createGasto);

router.get("/month", verificarToken, GastoController.getGastosMonth);
router.get("/totalcategoria", verificarToken, GastoController.getGastoCategoria);

module.exports = router;

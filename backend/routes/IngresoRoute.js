const express = require("express");
const router = express.Router();
const IngresoController = require("../controller/IngresoController");
const verificarToken = require("../Middleware/authMiddleware");

router.get("/", verificarToken, IngresoController.getIngreso);
router.post("/", verificarToken, IngresoController.createIngreso);

router.get("/month", verificarToken, IngresoController.getIngresosMonth);
router.get("/totalfuente", verificarToken, IngresoController.getIngresoFuente);

module.exports = router;

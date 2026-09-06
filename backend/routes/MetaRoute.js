const express = require("express");
const router = express.Router();
const MetaController = require("../controller/MetaController");
const verificarToken = require("../Middleware/authMiddleware");

router.get("/", verificarToken, MetaController.getMetasConProgreso);
router.post("/", verificarToken, MetaController.createMeta);
router.put("/:id", verificarToken, MetaController.updateMeta);
router.delete("/:id", verificarToken, MetaController.deleteMeta);

module.exports = router;
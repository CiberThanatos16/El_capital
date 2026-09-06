const pool = require("../database/db"); 
const path = require("path");

exports.getHistorial = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM historial WHERE usuario_id = $1 ORDER BY created_at DESC`,
            [req.usuario.id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
const pool = require('../database/db');
const path = require("path");

exports.getGasto = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM gastos WHERE usuario_id = $1 ORDER BY created_at DESC',
            [req.usuario.id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.createGasto = async (req, res) => {
    try {
        const { cantidad, descripcion, categoria } = req.body;

        const result = await pool.query(
            `INSERT INTO gastos (cantidad, descripcion, categoria_id, usuario_id)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [cantidad, descripcion, categoria, req.usuario.id]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getGastosMonth = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT SUM(cantidad) AS "monthGasto"
            FROM gastos
            WHERE usuario_id = $1
              AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
              AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
        `, [req.usuario.id]);

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getGastoCategoria = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT categoria_id, 
                SUM(cantidad) AS total,
                STRING_AGG(descripcion, ', ') AS descripciones
            FROM gastos
            WHERE usuario_id = $1
                AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
                AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
            GROUP BY categoria_id
            ORDER BY total DESC
        `, [req.usuario.id]);

        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
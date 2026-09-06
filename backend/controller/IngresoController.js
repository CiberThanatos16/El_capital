const pool = require('../database/db');
const path = require("path");

// Obtener todos los ingresos DEL USUARIO
exports.getIngreso = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM ingresos WHERE usuario_id = $1 ORDER BY created_at DESC',
            [req.usuario.id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Crear ingreso
exports.createIngreso = async (req, res) => {
    try {
        const { cantidad, descripcion, fuente } = req.body;

        const result = await pool.query(
            `INSERT INTO ingresos (cantidad, descripcion, fuente, usuario_id)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [cantidad, descripcion, fuente, req.usuario.id]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Mostrar Ingresos del mes
exports.getIngresosMonth = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT SUM(cantidad) AS "monthIngreso"
            FROM ingresos
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

// Obtener ingresos por fuente
exports.getIngresoFuente = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT fuente, 
                SUM(cantidad) AS total,
                STRING_AGG(descripcion, ', ') AS descripciones
            FROM ingresos
            WHERE usuario_id = $1
                AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
                AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
            GROUP BY fuente
            ORDER BY total DESC
        `, [req.usuario.id]);

        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
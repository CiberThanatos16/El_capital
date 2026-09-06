const pool = require('../database/db'); 
const path = require("path");

// Obtener metas con progreso DEL USUARIO
exports.getMetasConProgreso = async (req, res) => {
    try {
        const metas = await pool.query(
            `SELECT * FROM metas WHERE usuario_id = $1`,
            [req.usuario.id]
        );
        
        const metasConProgreso = await Promise.all(
            metas.rows.map(async (meta) => {
                let progreso = 0;

                if (meta.tipo === "ahorro") {
                    const result = await pool.query(`
                        SELECT COALESCE(SUM(
                            CASE WHEN tipo = 'ingreso' THEN cantidad ELSE -cantidad END
                        ), 0) AS progreso
                        FROM historial
                        WHERE created_at >= $1
                          AND usuario_id = $2
                    `, [meta.fecha_inicio, req.usuario.id]);
                    progreso = Number(result.rows[0].progreso);
                } else if (meta.tipo === "limite_gasto") {
                    const result = await pool.query(`
                        SELECT COALESCE(SUM(cantidad), 0) AS gastado
                        FROM gastos
                        WHERE categoria_id = $1
                          AND usuario_id = $2
                          AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
                          AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
                    `, [meta.categoria, req.usuario.id]);
                    progreso = Number(result.rows[0].gastado);
                }

                return {
                    ...meta,
                    progreso,
                    porcentaje: Math.min((progreso / meta.monto_objetivo) * 100, 100),
                };
            })
        );

        res.status(200).json(metasConProgreso);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// CREAR META
exports.createMeta = async (req, res) => {
    const { tipo, nombre, categoria, monto_objetivo, fecha_inicio, fecha_limite } = req.body;

    try {
        if (!tipo || !nombre || !monto_objetivo) {
            return res.status(400).json({ error: "Faltan campos obligatorios: tipo, nombre, monto_objetivo" });
        }

        if (tipo === "limite_gasto" && !categoria) {
            return res.status(400).json({ error: "Las metas de límite de gasto requieren una categoría" });
        }

        const result = await pool.query(`
            INSERT INTO metas (tipo, nombre, categoria, monto_objetivo, fecha_inicio, fecha_limite, usuario_id)
            VALUES ($1, $2, $3, $4, COALESCE($5, CURRENT_DATE), $6, $7)
            RETURNING *
        `, [tipo, nombre, categoria || null, monto_objetivo, fecha_inicio, fecha_limite || null, req.usuario.id]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// ACTUALIZAR META
exports.updateMeta = async (req, res) => {
    const { id } = req.params;
    const { nombre, monto_objetivo, fecha_limite } = req.body;

    try {
        const result = await pool.query(`
            UPDATE metas
            SET nombre = COALESCE($1, nombre),
                monto_objetivo = COALESCE($2, monto_objetivo),
                fecha_limite = COALESCE($3, fecha_limite)
            WHERE id = $4 AND usuario_id = $5
            RETURNING *
        `, [nombre, monto_objetivo, fecha_limite, id, req.usuario.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Meta no encontrada" });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// ELIMINAR META
exports.deleteMeta = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM metas WHERE id = $1 AND usuario_id = $2 RETURNING *`,
            [id, req.usuario.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Meta no encontrada" });
        }

        res.status(200).json({ message: "Meta eliminada" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
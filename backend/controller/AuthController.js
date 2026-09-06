const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../database/db");
const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const JWT_SECRET = process.env.JWT_SECRET; 

exports.register = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        if (!nombre || !email || !password) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        const existe = await pool.query("SELECT id FROM usuarios WHERE email = $1", [email]);
        if (existe.rows.length > 0) {
            return res.status(409).json({ error: "Ese email ya está registrado" });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const result = await pool.query(`
            INSERT INTO usuarios (nombre, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, nombre, email
        `, [nombre, email, password_hash]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Faltan email o password" });
        }

        const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
        const usuario = result.rows[0];

        if (!usuario) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const passwordCorrecta = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordCorrecta) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            token,
            usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

//Login con GOOGLE
exports.googleLogin = async (req, res) => {
    const { credential } = req.body;

    try {
        if (!credential) {
            return res.status(400).json({ error: "Falta el token de Google" });
        }

        // Verifica el token directamente con Google (no confiamos en el front)
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;

        // ¿Ya existe un usuario con este email?
        let result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
        let usuario = result.rows[0];

        if (!usuario) {
            // No existe, lo creamos
            const insert = await pool.query(`
                INSERT INTO usuarios (nombre, email, google_id, password_hash)
                VALUES ($1, $2, $3, NULL)
                RETURNING id, nombre, email
            `, [name, email, googleId]);
            usuario = insert.rows[0];
        } else if (!usuario.google_id) {
            // Ya existía con email/password, vinculamos su cuenta de Google
            await pool.query("UPDATE usuarios SET google_id = $1 WHERE id = $2", [googleId, usuario.id]);
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            token,
            usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
        });
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Token de Google inválido" });
    }
};
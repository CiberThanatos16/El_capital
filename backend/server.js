require("dotenv").config();
console.log("JWT_SECRET cargado:", process.env.JWT_SECRET);

const express = require("express");
const cors = require("cors");
const path = require("path");

const IngresoRoutes = require("./routes/IngresoRoute");
const GastoRoutes = require("./routes/GastoRoute");
const HistorialRoutes = require("./routes/HistorialRoute")
const MetaRoutes = require ("./routes/MetaRoute");
const AuthRoutes = require("./routes/AuthRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/elcapital/ingresos", IngresoRoutes);
app.use("/api/elcapital/gastos", GastoRoutes);
app.use("/api/elcapital/historial", HistorialRoutes);
app.use("/api/elcapital/metas", MetaRoutes);
app.use("/api/elcapital/auth", AuthRoutes);


app.get("/", (req, res) => {
    res.send("Servidor OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
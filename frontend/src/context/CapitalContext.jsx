import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";


const CapitalContext = createContext();

export const CapitalProvider = ({ children }) => {

    const [ingresos, setIngresos] = useState([]);
    const [gastos, setGastos] = useState([]);
    const [metas, setMetas] = useState([]);

    const [historial, setHistorial] = useState([]);

    const [graficaData, setGraficaData] = useState([]);//grafica

    const [ingresosMes, setIngresosMes] = useState({});
    const [gastosMes, setGastosMes] = useState({});

    const fetchCapital = async () => {
        try {

            const [
                ingresosRes,
                gastosRes,
                metasRes,
                ingresosMesRes,
                gastosMesRes,
                ingresosGraficaRes,
                gastosGraficaRes,
                historialRes
            ] = await Promise.all([
                api.get("/elcapital/ingresos"),
                api.get("/elcapital/gastos"),
                api.get("/elcapital/metas"),
                api.get("/elcapital/ingresos/month"),
                api.get("/elcapital/gastos/month"),
                api.get("/elcapital/ingresos/totalfuente"),
                api.get("/elcapital/gastos/totalcategoria"),
                api.get("/elcapital/historial")
            ]);

            setIngresos(ingresosRes.data);
            setGastos(gastosRes.data);
            setMetas(metasRes.data);

            setIngresosMes(ingresosMesRes.data);
            setGastosMes(gastosMesRes.data);

            setHistorial(historialRes.data);

            //Logica de la grafica
            const COLORES = [
                "#0088FE",
                "#00C49F",
                "#FFBB28",
                "#FF8042",
                "#8884d8",
                "#d84343",
                "#d44341",
            ];

            const ingresosGrafica = ingresosGraficaRes.data.map((item) => ({
                name: `Ingreso: ${item.fuente}`,
                value: Number(item.total),
                descripciones: item.descripciones,
            }));

            const gastosGrafica = gastosGraficaRes.data.map((item) => ({
                name: `Gasto: ${item.categoria_id}`,
                value: Number(item.total),
                descripciones: item.descripciones,
            }));

            const combinado = [...ingresosGrafica, ...gastosGrafica].map((item, index) => ({
                ...item,
                fill: COLORES[index % COLORES.length],
            }));

            setGraficaData(combinado);

        } catch (error) {
            console.error(error);
        }
    };



    useEffect(() => {
        fetchCapital();
    }, []);

    return (
        <CapitalContext.Provider
            value={{
                ingresos,
                gastos,
                metas,
                ingresosMes,
                gastosMes,
                graficaData,
                historial,
                fetchCapital
            }}
        >
            {children}
        </CapitalContext.Provider>
    );
};

export const useCapital = () => useContext(CapitalContext);
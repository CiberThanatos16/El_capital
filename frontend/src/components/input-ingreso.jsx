import { useState } from "react";
import api from "../api/api";
import { useCapital } from "../context/CapitalContext";

const fuentes = [
    { value: "nomina", label: "💼 Nómina" },
    { value: "deposito", label: "🏦 Depósito" },
    { value: "freelance", label: "👨‍💻 Freelance" },
    { value: "negocio", label: "🚀 Negocio" },
    { value: "prestamo", label: "🤝 Préstamo" },
    { value: "otro", label: "📦 Otro" },
];

export const Ingreso = ({ onClose }) => {
    const [cantidad, setCantidad] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fuente, setFuente] = useState("");
    const [toast, setToast] = useState(false);

    const { fetchCapital } = useCapital();

    const handleGuardar = async (e) => {
        e.preventDefault();

        if (!cantidad || !descripcion || !fuente) return;

        try {
            await api.post("/elcapital/ingresos", {
                cantidad,
                descripcion,
                fuente,
            });

            setCantidad("");
            setDescripcion("");
            setFuente("");

            // Actualiza todo el Dashboard
            await fetchCapital();
            setToast(true);
            setTimeout(() => {
                setToast(false);
                onClose?.();
            }, 1500);

        } catch (err) {
            console.error("Error al guardar ingreso:", err);
        }
    };

    return (
        <>
            {toast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-green-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg border border-green-800 animate-fadeIn">
                    ✅ Datos guardados exitosamente
                </div>
            )}
            <form onSubmit={handleGuardar} className="max-w-sm mx-auto p-4 flex flex-col gap-5">
                <h2 className="text-lg font-medium">Agrega Ingresos</h2>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="cantidad" className="text-sm font-medium text-gray-500">Cantidad de ingresos $</label>
                    <input
                        className="border border-black border-r-4 border-b-4 p-1.5"
                        id="cantidad"
                        type="number"
                        placeholder="$20,000"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="descripcion" className="text-sm font-medium text-gray-500">Tipo de ingreso</label>
                    <input
                        className="border border-black border-r-4 border-b-4 p-1.5"
                        id="descripcion"
                        type="text"
                        placeholder="Ej. Nomina"
                        maxLength={80}
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="fuente" className="text-sm font-medium text-gray-500">Fuente</label>
                    <select
                        className="border border-black border-r-4 border-b-4 p-1.5"
                        id="fuente"
                        value={fuente}
                        onChange={(e) => setFuente(e.target.value)}
                    >
                        <option value="" disabled>Selecciona una fuente</option>
                        {fuentes.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                    </select>
                </div>

                <button type="button" onClick={() => onClose?.()} className="flex-1 bg-red-600 border font-medium border-black border-r-4 border-b-4 p-2 cursor-pointer">
                    Cancelar
                </button>
                <button type="submit" className="flex-1 bg-blue-600 font-medium border-black border-r-4 border-b-4 p-2 cursor-pointer">
                    Guardar Ingreso
                </button>
            </form>
        </>
    );
};
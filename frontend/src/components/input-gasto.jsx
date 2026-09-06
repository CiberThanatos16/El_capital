import { useState } from "react";
import api from "../api/api";
import { useCapital } from "../context/CapitalContext";

const categorias = [
    { value: "comida", label: "🍽️ Comida" },
    { value: "transporte", label: "🚌 Transporte" },
    { value: "salud", label: "🏥 Salud" },
    { value: "entretenimiento", label: "🎬 Entretenimiento" },
    { value: "hogar", label: "🏠 Hogar" },
    { value: "otro", label: "📦 Otro" },
];

export const Gastos = ({ onClose }) => {

    const { fetchCapital } = useCapital();
    const [cantidad, setCantidad] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [toast, setToast] = useState(false);

    const handleGuardarGasto = async (e) => {
        e.preventDefault();

        if (!cantidad || !descripcion || !categoria) return;

        try {
            await api.post("/elcapital/gastos", {
                cantidad,
                descripcion,
                categoria,
            });

            setCantidad("");
            setDescripcion("");
            setCategoria("");

            await fetchCapital();
            setToast(true);
            setTimeout(() => {
                setToast(false);
                onClose?.();
            }, 1500);
        } catch (err) {
            console.error("Error al guardar gasto:", err);
        }
    };

    return (
        <>
            {toast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-green-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg border border-green-800 animate-fadeIn">
                    ✅ Datos guardados exitosamente
                </div>
            )}
            <form onSubmit={handleGuardarGasto} className="max-w-sm mx-auto p-4 flex flex-col gap-5">
            <h2 className="text-lg font-medium">Nuevo gasto</h2>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="cantidad" className="text-sm font-medium text-gray-500">Cantidad</label>
                <div className="relative border border-black border-r-4 border-b-4 p-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none ">$</span>
                    <input
                        className="w-full pl-7"
                        id="cantidad"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="descripcion" className="text-sm font-medium text-gray-500">Descripción</label>
                <input
                    className="border border-black border-r-4 border-b-4 p-1.5"
                    id="descripcion"
                    type="text"
                    placeholder="Ej. Almuerzo en restaurante"
                    maxLength={80}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="categoria" className="text-sm font-medium text-gray-500">Categoría</label>
                <select
                    className="border border-black border-r-4 border-b-4 p-1.5"
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                >
                    <option value="" disabled>Selecciona una categoría</option>
                    {categorias.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                </select>
            </div>

            <button type="button" onClick={() => onClose?.()} className="flex-1 bg-red-600 border font-medium border-black border-r-4 border-b-4 p-2 cursor-pointer">Cancelar</button>
            <button type="submit" className="flex-1 bg-blue-600 border font-medium border-black border-r-4 border-b-4 p-2 cursor-pointer">
                Guardar gasto
            </button>

        </form>
        </>
    );
};
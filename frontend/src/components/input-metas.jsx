import { useState } from "react";
import api from "../api/api";
import { useCapital } from "../context/CapitalContext";

export const InputMetas = ({ onClose }) => {
    const { fetchCapital } = useCapital();
    const [toast, setToast] = useState(false);
    const [form, setForm] = useState({
        tipo: "ahorro",
        nombre: "",
        categoria: "",
        monto_objetivo: "",
        fecha_limite: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/elcapital/metas", form);
            setForm({ tipo: "ahorro", nombre: "", categoria: "", monto_objetivo: "", fecha_limite: "" });
            fetchCapital();
            setToast(true);
            setTimeout(() => {
                setToast(false);
                onClose?.();
            }, 1500);
        } catch (error) {
            console.error("Error al crear meta", error);
        }
    };

    return (
        <>
            {toast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-green-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg border border-green-800 animate-fadeIn">
                    ✅ Datos guardados exitosamente
                </div>
            )}
            <div>
            {/* Formulario de creación */}
            <form onSubmit={handleSubmit}
                className="max-w-sm mx-auto p-4 flex flex-col gap-5">
                <h2 className="text-lg font-medium">Nueva meta</h2>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="descripcion" className="text-sm font-medium text-gray-500">Tipo de meta</label>
                    <select className="border border-black border-r-4 border-b-4 p-1.5" name="tipo" value={form.tipo} onChange={handleChange}>
                        <option value="ahorro">Ahorro</option>
                        <option value="limite_gasto">Límite de gasto</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="descripcion" className="text-sm font-medium text-gray-500">Nombre de la meta</label>
                    <input
                        className="border border-black border-r-4 border-b-4 p-1.5"
                        type="text"
                        name="nombre"
                        placeholder="Nombre de la meta"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                {form.tipo === "limite_gasto" && (
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="descripcion" className="text-sm font-medium text-gray-500">Categoria de la meta</label>
                        <input
                            className="border border-black border-r-4 border-b-4 p-1.5"
                            type="text"
                            name="categoria"
                            placeholder="Categoría (ej. comida)"
                            value={form.categoria}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="descripcion" className="text-sm font-medium text-gray-500">Monto objetivo</label>
                    <input
                        className="border border-black border-r-4 border-b-4 p-1.5"
                        type="number"
                        name="monto_objetivo"
                        placeholder="Monto objetivo"
                        value={form.monto_objetivo}
                        onChange={handleChange}
                        required
                    />
                </div>

                {form.tipo === "ahorro" && (
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="descripcion" className="text-sm font-medium text-gray-500">Fecha limite para cumplir meta</label>
                        <input
                            className="border border-black border-r-4 border-b-4 p-1.5"
                            type="date"
                            name="fecha_limite"
                            value={form.fecha_limite}
                            onChange={handleChange}
                        />
                    </div>
                )}

                <button type="button" onClick={() => onClose?.()} className="flex-1 bg-red-600 border font-medium border-black border-r-4 border-b-4 p-2 cursor-pointer">Cancelar</button>
                <button type="submit" className="flex-1 bg-blue-600 border font-medium border-black border-r-4 border-b-4 p-2 cursor-pointer">
                    Guardar Meta
                </button>
            </form>
        </div>
        </>
    );
}
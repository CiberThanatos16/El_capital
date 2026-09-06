import api from "../api/api";
import { useCapital } from "../context/CapitalContext";

export default function Metas() {
    const { metas, fetchCapital } = useCapital();

    const handleDelete = async (id) => {
        try {
            await api.delete(`/elcapital/metas/${id}`);
            fetchCapital();
        } catch (error) {
            console.error("Error al eliminar meta", error);
        }
    };

    return (
        <div className="w-full">
            {/* Lista de metas con progreso */}
            <div className="w-full space-y-4">
                {metas.map((meta) => {
                    const excedido =
                        meta.tipo === "limite_gasto" && meta.porcentaje >= 100;

                    return (
                        <div
                            key={meta.id}
                            className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <strong className="text-lg text-gray-800">
                                    {meta.nombre}
                                </strong>

                                <button
                                    onClick={() => handleDelete(meta.id)}
                                    className="text-red-600 hover:text-red-800 underline underline-offset-2 transition-colors cursor-pointer"
                                >
                                    Eliminar
                                </button>
                            </div>

                            <p className="text-sm text-gray-500 mb-3">
                                {meta.tipo === "ahorro"
                                    ? "Meta de ahorro"
                                    : `Límite: ${meta.categoria}`}
                            </p>

                            {/* Barra de progreso */}
                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-500 ${excedido
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                        }`}
                                    style={{
                                        width: `${Math.min(meta.porcentaje, 100)}%`,
                                    }}
                                />
                            </div>

                            <p className="text-sm text-gray-700 mt-2">
                                ${Number(meta.progreso).toLocaleString()} / $
                                {Number(meta.monto_objetivo).toLocaleString()} (
                                {meta.porcentaje.toFixed(1)}%)
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
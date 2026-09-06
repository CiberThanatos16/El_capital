import { useCapital } from "../context/CapitalContext";

export default function Historial() {

    const { historial } = useCapital();

    return (
        <div className="w-full overflow-x-auto overflow-y-auto max-h-96">
            <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-white">
                    <tr>
                        <th className="text-left p-2 border-b-2 border-gray-300 font-semibold">
                            Categoría
                        </th>
                        <th className="text-left p-2 border-b-2 border-gray-300 font-semibold">
                            Descripción
                        </th>
                        <th className="text-center p-2 border-b-2 border-gray-300 font-semibold">
                            Tipo
                        </th>
                        <th className="text-right p-2 border-b-2 border-gray-300 font-semibold">
                            Monto
                        </th>
                        <th className="text-right p-2 border-b-2 border-gray-300 font-semibold">
                            Fecha
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {historial.map((mov) => (
                        <tr
                            key={`${mov.tipo}-${mov.id}`}
                            className={`border-b border-gray-200 font-medium
                                ${mov.tipo === "ingreso"
                                    ? "bg-[#E8FFCF]"
                                    : "bg-[#FFC7C7]"
                                }`}
                        >
                            <td className="p-2">
                                {mov.categoria}
                            </td>

                            <td className="p-2">
                                {mov.descripcion}
                            </td>

                            <td
                                className={`text-center font-medium ${mov.tipo === "ingreso"
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                            >
                                {mov.tipo}
                            </td>

                            <td
                                className={`text-right font-medium ${mov.tipo === "ingreso"
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                            >
                                {mov.tipo === "ingreso" ? "+" : "-"}$
                                {Number(mov.cantidad).toLocaleString()}
                            </td>

                            <td className="text-right">
                                {new Date(mov.created_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
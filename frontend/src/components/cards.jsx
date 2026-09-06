import api from "../api/api";
import { useEffect, useState } from "react";
import { useCapital } from "../context/CapitalContext";

export const Cards = () => {

    const { ingresosMes, gastosMes } = useCapital();

    return (
        <section className="grid grid-cols-2 lg:grid-cols-3 gap-2">

            {/* Balance */}
            <div className="bg-white col-span-2 lg:col-span-1 border border-black border-r-4 border-b-4 p-2 lg:p-5 rounded-2xl">

                <p className="text-indigo-600 text-sm mb-1 font-medium pb-1 border-b border-indigo-800">
                    Balance
                </p>

                <h2 className="text-sm lg:text-2xl font-black text-indigo-600 mt-2">
                    $
                    {(Number(ingresosMes?.monthIngreso ?? 0) -
                        Number(gastosMes?.monthGasto ?? 0)).toFixed(2)}
                </h2>

            </div>

            {/* Gastos */}
            <div className="bg-white border border-black border-r-4 border-b-4 p-2 lg:p-5 rounded-2xl">

                <p className="text-red-600 text-sm mb-1 font-medium pb-1 border-b border-red-800">
                    Gastos
                </p>

                <h2 className="text-sm lg:text-2xl font-black text-red-600 mt-2">
                    ${gastosMes?.monthGasto ?? 0}
                </h2>

            </div>

            {/* Ingresos */}
            <div className="bg-white border border-black border-r-4 border-b-4 p-2 lg:p-5 rounded-2xl">

                <p className="text-green-600 text-sm mb-1 font-medium pb-1 border-b border-green-800">
                    Ingresos
                </p>

                <h2 className="text-sm lg:text-2xl font-black text-green-600 mt-2">
                    ${ingresosMes?.monthIngreso ?? 0}
                </h2>

            </div>

        </section>
    );
};
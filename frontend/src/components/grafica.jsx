import { useEffect, useState } from "react";
import { Pie, PieChart, Tooltip, Legend } from "recharts";
import { useCapital } from "../context/CapitalContext";
import api from "../api/api";


// Tooltip personalizado
const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;

    const item = payload[0].payload;

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3 text-sm max-w-xs">
            <p className="font-semibold COLORES">{item.name}</p>
            <p className="text-amber-500">Total: ${item.value.toLocaleString()}</p>
            {item.descripciones && (
                <p className="text-gray-500 mt-1">{item.descripciones}</p>
            )}
        </div>
    );
};

export default function Grafica({ isAnimationActive = true }) {

    const { graficaData } = useCapital();

    return (
        <PieChart
            style={{ width: "100%", maxWidth: "450px", aspectRatio: 1 }}
            className="flex justify-baseline"
        >
            <Pie
                data={graficaData}
                innerRadius="85%"
                outerRadius="100%"
                cornerRadius="80%"
                fill="#8884d8"
                paddingAngle={9}
                dataKey="value"
                isAnimationActive={isAnimationActive}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
                layout="vertical"
                align="left"
                verticalAlign="middle"
            />
        </PieChart>
    );
}
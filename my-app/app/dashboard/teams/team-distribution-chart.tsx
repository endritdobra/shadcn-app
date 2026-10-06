'use client'

import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

export default function TeamDistributionChart(){
    const data = [
        {
            name: "Delta",
            value: 55,
            color: "#84cc16",
        },
        {
            name: "Alpha",
            value: 34,
            color: "#3b82f6",
        },
        {
            name: "Canary",
            value: 11,
            color: "#f97316",
        },
    ];

    return <ResponsiveContainer width="100%" height={150}>
        <PieChart>
            <Pie data={data} dataKey="value" nameKey='name'>
                {data.map((dataitem) => (
                    <Cell key={dataitem.name} fill={dataitem.color}/>
                ))}
            </Pie>
            <Tooltip
                contentStyle={{
                    backgroundColor: "var(--popover)",
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--popover-foreground)",
                }}
                itemStyle={{color: "var(--popover-foreground)"}}
            />
        </PieChart>
    </ResponsiveContainer>
}

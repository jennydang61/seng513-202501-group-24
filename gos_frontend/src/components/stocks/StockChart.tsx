import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

interface StockChartProps {
  data: { date: string; close: number }[];
  interval?: '1d' | '1h';
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  return (
    
    <ResponsiveContainer width="100%" height={400}>
      
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={false} axisLine={false} />
        <YAxis domain={['auto', 'auto']} tick={false} axisLine={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="close"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;

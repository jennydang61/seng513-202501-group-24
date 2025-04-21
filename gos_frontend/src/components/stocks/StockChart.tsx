import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
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
        <XAxis dataKey="date" tick={true} axisLine={false} />
        <YAxis domain={['auto', 'auto']} tick={true} axisLine={false} />
        <Tooltip
          content={({ active, label, payload }) => {
            if (active && payload && payload.length) {
              const formattedDate = new Date(label).toLocaleDateString([], {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
              const formattedTime = new Date(label).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div>
                  <p style={{ margin: 0 }}>
                    <strong>Date:</strong> {formattedDate} {formattedTime}
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Price:</strong> ${payload[0].value.toFixed(2)}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey="close"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;

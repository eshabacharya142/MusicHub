import "./index.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ title, data, dataKey, grid }) => (
  <div className="chart">
    <h3 className="chartTitle">{title}</h3>
    <ResponsiveContainer width="100%" aspect={4 / 1}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#5550bd"
          tick={{ fill: "#5550bd" }}
          style={{ fontSize: "12px", fontWeight: "bold" }}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#5550bd"
          strokeWidth={2}
          dot={{ fill: "#5550bd", strokeWidth: 2, r: 4 }}
          activeDot={{ fill: "#5550bd", strokeWidth: 2, r: 6 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            color: "#5550bd",
            fontSize: "12px",
            fontWeight: "bold",
          }}
          labelStyle={{ color: "#5550bd", fontWeight: "bold" }}
          itemStyle={{ color: "#5550bd" }}
          formatter={(value) => `${value}`}
        />
        {grid && (
          <CartesianGrid
            stroke="#e0dfdf"
            strokeDasharray="3 3"
            vertical={false}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default Chart;

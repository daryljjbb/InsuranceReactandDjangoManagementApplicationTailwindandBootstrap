// src/components/DashboardCard.jsx
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

export default function DashboardCard({ 
  title, 
  value, 
  icon, 
  color = "blue", 
  trend = "neutral",
  trendPercent = null 
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };

  const trendIcon = {
    up: <ArrowUp className="text-green-600" size={20} />,
    down: <ArrowDown className="text-red-600" size={20} />,
    neutral: <Minus className="text-gray-400" size={20} />
  };

  return (
    <div className={`p-5 shadow rounded-lg border flex items-center gap-4 ${colorClasses[color]}`}>
  {icon && <div className="text-3xl">{icon}</div>}

  <div>
    <p className="text-sm opacity-80">{title}</p>

    {/* ⭐ Updated layout: value + arrow on first line, percentage on second line */}
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <p className="text-3xl font-bold">{value}</p>
        {trendIcon[trend]}
      </div>

      {trendPercent !== null && (
        <span
          className={
            trend === "up"
              ? "text-green-600 text-sm font-semibold"
              : trend === "down"
              ? "text-red-600 text-sm font-semibold"
              : "text-gray-500 text-sm"
          }
        >
          {trendPercent === "N/A"
            ? "N/A"
            : `${trendPercent > 0 ? "+" : ""}${trendPercent}%`}
        </span>
      )}
    </div>
  </div>
</div>

  );
}

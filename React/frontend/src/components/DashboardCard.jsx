// src/components/DashboardCard.jsx
export default function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 shadow rounded-lg flex items-center gap-4">

      {icon && (
        <div className="text-blue-600 text-3xl">
          {icon}
        </div>
      )}

      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>

    </div>
  );
}

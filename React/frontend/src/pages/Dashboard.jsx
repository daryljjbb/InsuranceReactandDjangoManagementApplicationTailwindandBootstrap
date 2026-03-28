import DashboardCard from "../components/DashboardCard";
import useDashboardSummary from "../hooks/useDashboardSummary";
import { Users, FileText, DollarSign } from "lucide-react"; // optional icons
import TodoList from "../components/TodoList";

export default function Dashboard() {
  const summary = useDashboardSummary();

  if (!summary) return <div>Loading dashboard...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

      {/* LEFT SIDE */}
      <div className="lg:col-span-3 space-y-6">

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard
            title="Customers"
            value={summary.customer_count}
            icon={<Users />}
          />
          <DashboardCard
            title="Policies"
            value={summary.policy_count}
            icon={<FileText />}
          />
          <DashboardCard
            title="Total Premium"
            value={`$${summary.total_premium.toFixed(2)}`}
            icon={<DollarSign />}
          />
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Business Overview</h2>
          {/* charts or widgets */}
        </div>

      </div>

      {/* RIGHT SIDE: TO‑DO LIST */}
      <div className="lg:col-span-1">
        <div className="bg-white p-4 shadow rounded h-full">
          <h2 className="text-lg font-semibold mb-3">To‑Do List</h2>
          <TodoList />
        </div>
      </div>

    </div>
  );
}

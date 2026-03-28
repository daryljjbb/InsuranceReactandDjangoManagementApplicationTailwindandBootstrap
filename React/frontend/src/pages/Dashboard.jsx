import DashboardCard from "../components/DashboardCard";
import useDashboardSummary from "../hooks/useDashboardSummary";
import { Users, FileText, DollarSign } from "lucide-react"; // optional icons
import TodoList from "../components/TodoList";

export default function Dashboard() {
  const summary = useDashboardSummary();

  if (!summary) return <div>Loading dashboard...</div>;


  const getTrend = (current, previous) => {
  if (current > previous) return "up";
  if (current < previous) return "down";
  return "neutral";
};

const getTrendPercent = (current, previous) => {
  if (!previous || previous === 0) return "N/A";
  const diff = current - previous;
  const percent = (diff / previous) * 100;
  return percent.toFixed(1);
};

console.log("Trend % customers:", getTrendPercent(summary.customer_count, summary.last_month_customers));
console.log("Trend % policies:", getTrendPercent(summary.policy_count, summary.last_month_policies));
console.log("Trend % premium:", getTrendPercent(summary.total_premium, summary.last_month_premium));
console.log(summary);


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
        color="blue"
        trend={getTrend(summary.customer_count, summary.last_month_customers)}
        trendPercent={getTrendPercent(summary.customer_count, summary.last_month_customers)}
        />

        <DashboardCard
        title="Policies"
        value={summary.policy_count}
        icon={<FileText />}
        color="orange"
        trend={getTrend(summary.policy_count, summary.last_month_policies)}
        trendPercent={getTrendPercent(summary.policy_count, summary.last_month_policies)}
        />

        <DashboardCard
        title="Total Premium"
        value={`$${summary.total_premium.toFixed(2)}`}
        icon={<DollarSign />}
        color="green"
        trend={getTrend(summary.total_premium, summary.last_month_premium)}
        trendPercent={getTrendPercent(summary.total_premium, summary.last_month_premium)}
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

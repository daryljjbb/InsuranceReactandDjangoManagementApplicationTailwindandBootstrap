import TodoList from "../components/TodoList";
const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <TodoList />

      {/* Your other dashboard widgets */}
    </div>
  );
};

export default Dashboard;

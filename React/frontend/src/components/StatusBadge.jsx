function StatusBadge({ status }) {
  const colors = {
    unpaid: "bg-red-500",
    partial: "bg-yellow-500",
    paid: "bg-green-600",
  };

  return (
    <span className={`px-2 py-1 rounded text-white text-sm ${colors[status]}`}>
      {status.toUpperCase()}
    </span>
  );
}
export default StatusBadge;
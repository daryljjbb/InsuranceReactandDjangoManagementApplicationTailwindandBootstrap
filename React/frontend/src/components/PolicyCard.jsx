function PolicyCard({ policy, onEdit, onDelete }) {
  return (
    <div
      className="
        bg-white/20 backdrop-blur-xl p-6 rounded-3xl
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        border border-white/30 hover:bg-white/10 transition-all
      "
    >
      <div className="text-lg font-semibold text-gray-900 mb-2">
        {policy.policy_type.toUpperCase()} Policy
      </div>

      <div className="space-y-1 text-gray-700 mb-4">
        <p><span className="font-semibold">Policy #:</span> {policy.policy_number}</p>
        <p><span className="font-semibold">Effective:</span> {policy.effective_date}</p>
        <p><span className="font-semibold">Expires:</span> {policy.expiration_date}</p>
        <p><span className="font-semibold">Premium:</span> ${policy.premium_amount}</p>
      </div>

      {/* BUTTON ROW */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(policy)}
          className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(policy)}
          className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default PolicyCard;

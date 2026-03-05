export default function OverviewTab({ customer }) {
  if (!customer) {
    return (
      <div className="text-center text-gray-500 p-4">
        No customer data available.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-10">

      {/* PERSONAL INFO */}
      <section>
        <h4 className="text-xl font-semibold mb-4">Personal Information</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard label="Full Name" value={`${customer.first_name} ${customer.last_name}`} />
          <GlassCard label="Date of Birth" value={customer.date_of_birth} />
          <GlassCard label="Gender" value={customer.gender} />
        </div>
      </section>

      {/* CONTACT INFO */}
      <section>
        <h4 className="text-xl font-semibold mb-4">Contact Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard label="Phone" value={customer.phone || "N/A"} />
          <GlassCard label="Email" value={customer.email || "N/A"} />
          <div className="md:col-span-2">
            <GlassCard label="Address" value={customer.address1 || "N/A"} />
          </div>
        </div>
      </section>

      {/* EMERGENCY CONTACT */}
      <section>
        <h4 className="text-xl font-semibold mb-4">Emergency Contact</h4>

        {customer.emergency_contact_name ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassCard label="Contact Name" value={customer.emergency_contact_name} />
            <GlassCard label="Contact Phone" value={customer.emergency_contact_phone} />
          </div>
        ) : (
          <p className="text-gray-500">No emergency contact information.</p>
        )}
      </section>

    </div>
  );
}



function GlassCard({ label, value }) {
  return (
    <div
      className="
        bg-white/20
        backdrop-blur-xl
        p-6
        rounded-3xl
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        border border-white/30
        hover:bg-white/30
        transition-all
      "
    >
      <div className="text-sm text-gray-700 mb-1">{label}</div>
      <div className="text-lg font-semibold text-gray-900">{value || 'N/A'}</div>
    </div>
  );
}


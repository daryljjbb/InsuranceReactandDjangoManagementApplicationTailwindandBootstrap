import { useState, useEffect } from "react";
import ReusableForm from "./ReusableForm";

export default function ViewPolicyForm({ policy, updatePolicy, closeModal, reloadCustomer }) {
  const [formData, setFormData] = useState(policy);

  useEffect(() => {
    setFormData(policy);
  }, [policy]);

  const fields = [
    { name: "policy_number", label: "Policy Number", type: "text", required: true, readOnly: true },
    {
      name: "policy_type",
      label: "Policy Type",
      type: "select",
      required: true,
      readOnly: true,
      options: [
        { value: "auto", label: "Auto" },
        { value: "home", label: "Home" },
        { value: "life", label: "Life" },
      ],
    },
    { name: "effective_date", label: "Effective Date", type: "date", required: true, readOnly: true  },
    { name: "expiration_date", label: "Expiration Date", type: "date", required: true, readOnly: true },
    { name: "premium_amount", label: "Premium Amount", type: "number", required: true, readOnly: true },
  ];

  return (
    <ReusableForm
      fields={fields}
      formData={formData}
      setFormData={setFormData}
      submitLabel={null}   // hides the submit button
      readOnly={true}      // ensures no editing
    />
  );
}

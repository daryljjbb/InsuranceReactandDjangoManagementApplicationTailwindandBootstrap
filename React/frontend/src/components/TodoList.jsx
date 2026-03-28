import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
  Promise.all([
    api.get("todo/suspense/"),
    api.get("todo/policies/"),
    api.get("todo/invoices/")
  ]).then(([suspenseRes, policyRes, invoiceRes]) => {
    
    const suspenseItems = Array.isArray(suspenseRes.data)
      ? suspenseRes.data
      : suspenseRes.data.results || [];

    const policyItems = Array.isArray(policyRes.data)
      ? policyRes.data
      : policyRes.data.results || [];

    const invoiceItems = Array.isArray(invoiceRes.data)
      ? invoiceRes.data
      : invoiceRes.data.results || [];

    const todos = [];

    suspenseItems.forEach(s => {
      todos.push({
        type: "suspense",// This needs to match the tab name in CustomerDetailPage.jsx for the deep linking to work
        label: s.note,
        customer: s.customer,
        id: s.id,
        date: s.suspense_date
      });
    });

    policyItems.forEach(p => {
      todos.push({
        type: "policies",// This needs to match the tab name in CustomerDetailPage.jsx for the deep linking to work
        label: `${p.policy_type} policy expiring`,
        customer: p.customer,
        id: p.id,
        date: p.expiration_date
      });
    });

    invoiceItems.forEach(inv => {
      todos.push({
        type: "invoices",// This needs to match the tab name in CustomerDetailPage.jsx for the deep linking to work
        label: `Invoice due: $${inv.total_amount}`,
        customer: inv.customer,// This is to first get the customer that is attached to the policy that is attached to the invoice
        id: inv.id,
        date: inv.due_date
      });
    });

    setItems(todos);
  });
}, []);

  return (
    <div className="bg-white shadow p-4 rounded mb-6">
      <h3 className="text-xl font-semibold mb-3">To‑Do List</h3>

      {items.length === 0 && (
        <p className="text-muted">No tasks due today</p>
      )}

      {items.map(item => (
        <Link
          key={`${item.type}-${item.id}`}
          to={`/customers/${item.customer}?tab=${item.type}&item=${item.id}`}
          className="flex items-center justify-between p-2 border-b hover:bg-gray-50"
        >
          <span>{item.label}</span>
          <span className="text-sm text-gray-500">{item.date}</span>
        </Link>
      ))}
    </div>
  );
};

export default TodoList;
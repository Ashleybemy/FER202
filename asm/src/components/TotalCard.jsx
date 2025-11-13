import React from "react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);

export default function TotalCard({ total = 0, count = 0 }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Total of Expenses</h5>
        <p className="display-6 fw-semibold mb-1">{formatCurrency(total)}</p>
        <p className="text-muted mb-0">{count} expense{count === 1 ? "" : "s"} tracked this month.</p>
      </div>
    </div>
  );
}

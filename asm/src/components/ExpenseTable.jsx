import React from "react";
import { isoToTableDate } from "../utils/date";

const formatAmount = (amount) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(Number(amount) || 0);

export default function ExpenseTable({
  expenses = [],
  onEdit,
  onDelete,
  isLoading,
}) {
  return (
    <div className="card h-100">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Expense Management</h5>
        <span className="badge bg-secondary">{expenses.length}</span>
      </div>
      <div className="table-responsive">
        <table className="table table-hover mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th scope="col">Date</th>
              <th scope="col" className="text-end">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading expenses...
                </td>
              </tr>
            )}
            {!isLoading && expenses.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-muted">
                  No expenses to display.
                </td>
              </tr>
            )}
            {!isLoading &&
              expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{formatAmount(expense.amount)}</td>
                  <td>{expense.category}</td>
                  <td>{isoToTableDate(expense.date)}</td>
                  <td className="text-end">
                    <div className="btn-group btn-group-sm">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => onEdit?.(expense)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => onDelete?.(expense)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

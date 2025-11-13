import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense, updateExpense } from "../redux/slices/expenseSlice";
import {
  displayToIsoDate,
  isoToDisplayDate,
  isValidDisplayDate,
} from "../utils/date";

const createInitialForm = () => ({
  id: null,
  name: "",
  amount: "",
  category: "",
  date: "",
});

export default function AddExpenseForm({
  userId,
  editingExpense,
  onFinishEditing,
}) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(() => createInitialForm());
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setForm({
        id: editingExpense.id,
        name: editingExpense.name || "",
        amount: editingExpense.amount?.toString() || "",
        category: editingExpense.category || "",
        date: isoToDisplayDate(editingExpense.date),
      });
      setError("");
    } else {
      setForm(createInitialForm());
    }
  }, [editingExpense]);

  const isEditing = useMemo(() => Boolean(editingExpense), [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError("Please login again to add expenses.");
      return;
    }

    if (!form.name.trim() || !form.category.trim()) {
      setError("Name and Category must not be empty.");
      return;
    }

    const numericAmount = Number(form.amount);
    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      setError("Amount must be a number greater than 0.");
      return;
    }

    if (!isValidDisplayDate(form.date)) {
      setError("Date must follow DD/MM/YYYY format.");
      return;
    }

    const isoDate = displayToIsoDate(form.date);
    if (!isoDate) {
      setError("Date provided is invalid.");
      return;
    }

    const payload = {
      userId: String(userId),
      name: form.name.trim(),
      category: form.category.trim(),
      amount: numericAmount,
      date: isoDate,
    };

    setSubmitting(true);
    setError("");
    try {
      if (isEditing) {
        await dispatch(
          updateExpense({
            ...payload,
            id: editingExpense.id,
          })
        ).unwrap();
      } else {
        await dispatch(addExpense(payload)).unwrap();
      }
      setForm(createInitialForm());
      onFinishEditing?.();
    } catch (err) {
      setError(err?.message || "Unable to save expense. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm(createInitialForm());
    onFinishEditing?.();
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-3">
          {isEditing ? "Update Expense" : "Add Expense"}
        </h5>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="expense-name">
              Name
            </label>
            <input
              id="expense-name"
              name="name"
              type="text"
              className="form-control"
              placeholder="e.g., Lunch"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="expense-amount">
              Amount
            </label>
            <input
              id="expense-amount"
              name="amount"
              type="number"
              min="0"
              className="form-control"
              placeholder="e.g., 150000"
              value={form.amount}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="expense-category">
              Category
            </label>
            <input
              id="expense-category"
              name="category"
              type="text"
              className="form-control"
              placeholder="e.g., Food"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="expense-date">
              Date
            </label>
            <input
              id="expense-date"
              name="date"
              type="text"
              className="form-control"
              placeholder="DD/MM/YYYY"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-danger small mb-3">{error}</p>}

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-success flex-grow-1"
              disabled={submitting}
            >
              {submitting
                ? "Saving..."
                : isEditing
                ? "Update expense"
                : "Add expense"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
                disabled={submitting}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

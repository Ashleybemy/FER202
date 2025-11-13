import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TotalCard from "../components/TotalCard";
import FilterBox from "../components/FilterBox";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import {
  deleteExpense,
  fetchExpenses,
} from "../redux/slices/expenseSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { list, loading, error } = useSelector((state) => state.expenses);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchExpenses(user.id));
    }
  }, [dispatch, user?.id]);

  const filteredExpenses = useMemo(() => {
    const normalized = categoryFilter.trim().toLowerCase();
    const items = list
      .slice()
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    if (!normalized) return items;
    return items.filter((expense) =>
      expense.category?.toLowerCase().includes(normalized)
    );
  }, [categoryFilter, list]);

  const totalAmount = useMemo(
    () =>
      filteredExpenses.reduce(
        (sum, expense) => sum + (Number(expense.amount) || 0),
        0
      ),
    [filteredExpenses]
  );

  const handleDelete = (expense) => {
    if (
      window.confirm(
        `Delete "${expense.name}" in category ${expense.category}?`
      )
    ) {
      dispatch(deleteExpense(expense.id));
      if (editingExpense?.id === expense.id) {
        setEditingExpense(null);
      }
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header fullName={user?.fullName || user?.username} />

      <main className="container flex-grow-1 py-4">
        <div className="row g-4">
          <div className="col-lg-4">
            <TotalCard total={totalAmount} count={filteredExpenses.length} />
            <FilterBox
              value={categoryFilter}
              onChange={setCategoryFilter}
            />
            <AddExpenseForm
              userId={user?.id}
              editingExpense={editingExpense}
              onFinishEditing={() => setEditingExpense(null)}
            />
          </div>
          <div className="col-lg-8">
            {error && (
              <div className="alert alert-danger">{error}</div>
            )}
            <ExpenseTable
              expenses={filteredExpenses}
              onEdit={setEditingExpense}
              onDelete={handleDelete}
              isLoading={loading}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// src/TestRedux.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers, toggleAdmin } from "./redux/users/usersSlice";
import { createPayment } from "./redux/payments/paymentsSlice";
import { selectSuccessfulPayments } from "./redux/selectors";

const TestRedux = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.list);
  const paymentsSuccess = useSelector(selectSuccessfulPayments);

  return (
    <div style={{ padding: 20 }}>
      <h1>Redux Test</h1>

      <button onClick={() => dispatch(fetchUsers())}>Load Users</button>

      {users.map((u) => (
        <p key={u.id}>
          {u.name} – {u.isAdmin ? "Admin" : "User"}
          <button onClick={() => dispatch(toggleAdmin(u.id))}>Toggle</button>
        </p>
      ))}

      <hr />

      <button
        onClick={() =>
          dispatch(createPayment({ amount: 150, method: "BANK" }))
        }
      >
        Create Payment
      </button>

      <h3>Success Payments</h3>
      {paymentsSuccess.map((p) => (
        <p key={p.id}>${p.amount}</p>
      ))}
    </div>
  );
};

export default TestRedux;

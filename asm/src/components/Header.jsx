import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import logo from "../logo.svg";

export default function Header({ fullName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-primary text-white shadow-sm">
      <div className="container py-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img src={logo} alt="PersonalBudget logo" width="36" height="36" className="me-2" />
          <span className="fs-4 fw-semibold">PersonalBudget</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="small">
            Signed in as <strong>{fullName || "User"}</strong>
          </span>
          <button type="button" className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

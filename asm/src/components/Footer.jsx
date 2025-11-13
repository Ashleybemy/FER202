import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <small>© {currentYear} PersonalBudget — Track your expenses with confidence.</small>
      </div>
    </footer>
  );
}

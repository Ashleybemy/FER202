import React from "react";

export default function FilterBox({ value, onChange }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title mb-3">Filter</h5>
        <input
          type="text"
          className="form-control"
          placeholder="Category (e.g., Food)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

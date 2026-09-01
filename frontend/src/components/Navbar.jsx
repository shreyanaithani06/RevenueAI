import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm px-4 py-2">
      <div className="container-fluid p-0">
        <Link className="navbar-brand fw-bold text-primary d-flex align-items-center" to="/">
          <i className="bi bi-shield-check me-2 fs-4"></i>
          <span>Revenue <span className="badge bg-primary-subtle text-primary border ms-1 fs-6">AI</span></span>
        </Link>
        <div className="d-flex align-items-center">
          <span className="badge bg-success-subtle text-success border border-success-subtle me-3 px-3 py-2">
            ● System Active
          </span>
          <div className="fw-semibold text-dark small">Merchant Dashboard</div>
        </div>
      </div>
    </nav>
  );
}
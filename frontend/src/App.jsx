import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Insights from './pages/Insights';
import Recovery from './pages/Recovery';
import FailedPayments from './pages/FailedPayments'; // Fixed spelling
import CustomerPortal from './pages/CustomerPortal';
import Settings from "./pages/Settings";

function MainLayout({ children }) {
  const location = useLocation();
  
  const isCustomerPortal = 
    location.pathname.startsWith('/recover/') || 
    location.pathname.startsWith('/portal/');

  if (isCustomerPortal) {
    return <div className="min-vh-100 bg-light">{children}</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f1f5f9' }}>
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <main className="flex-grow-1 p-4 overflow-auto" style={{ maxHeight: 'calc(100vh - 65px)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Merchant Command Center Routes (Sidebar + Navbar Visible) */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/failed-payments" element={<FailedPayments />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/recover/:paymentId" element={<CustomerPortal />} />
          <Route path="/portal/:paymentId" element={<CustomerPortal />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
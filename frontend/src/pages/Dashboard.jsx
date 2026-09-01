import React, { useState, useEffect } from "react";
import KpiCard from "../components/KpiCard";
import AiRecommendationBanner from "../components/AiRecommendationBanner";
import PriorityQueueTable from "../components/PriorityQueueTable";
import FailureReasonChart from "../components/FailureReasonChart";
import RecoveryTrendChart from "../components/RecoveryTrendChart";
import {
  getDashboardStats,
  getFailedPayments,
  executeRecoveryAction,
} from "../services/api";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    revenueAtRisk: "₹12.4L",
    revenueRecovered: "₹7.8L",
    recoveryRate: "62.9%",
    savedGatewayFees: "₹14,200",
  });

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const stats = await getDashboardStats();
      if (stats) setMetrics(stats);

      const queue = await getFailedPayments();
      if (queue) setPayments(Array.isArray(queue) ? queue : queue.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRunRecovery = async () => {
    alert("AI Smart Recovery executing for high-priority payments...");
    setPayments((prev) =>
      prev.map((p) =>
        p.recoveryScore >= 80 ? { ...p, status: "RECOVERED" } : p,
      ),
    );
  };

  const handleExecuteSingleAction = async (paymentId, action) => {
    await executeRecoveryAction(paymentId, action);
    setPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status: "RECOVERED" } : p)),
    );
  };

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "#0f172a" }}>
            Revenue Command Center
          </h3>
          <p className="text-secondary mb-0 small">
            Real-time payment failure analysis & autonomous recovery agent.
          </p>
        </div>

        {/* Live Telemetry Status Badge */}
        <div className="d-flex align-items-center bg-white border px-3 py-2 rounded-pill shadow-sm">
          <span className="live-pulse me-2"></span>
          <span className="small fw-semibold text-secondary">
            Live System Telemetry
          </span>
        </div>
      </div>

      {/* Top KPI Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <KpiCard
            title="Revenue At Risk"
            value={metrics.revenueAtRisk}
            badgeText="37 Recoverable"
            badgeBg="bg-danger"
          />
        </div>
        <div className="col-md-3">
          <KpiCard
            title="Revenue Recovered"
            value={metrics.revenueRecovered}
            badgeText="+14.2%"
            badgeBg="bg-success"
          />
        </div>
        <div className="col-md-3">
          <KpiCard
            title="Recovery Rate"
            value={metrics.recoveryRate}
            badgeText="Target 65%"
            badgeBg="bg-primary"
          />
        </div>
        <div className="col-md-3">
          <KpiCard
            title="Gateway Fees Saved"
            value={metrics.savedGatewayFees}
            badgeText="Guardrails"
            badgeBg="bg-info text-dark"
          />
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <AiRecommendationBanner onRunRecovery={handleRunRecovery} />

      {/* Chart Grid Row (Pie Chart & Line Chart) */}
      <div className="row g-3 mb-4">
        <div className="col-lg-6 col-md-12">
          <FailureReasonChart />
        </div>
        <div className="col-lg-6 col-md-12">
          <RecoveryTrendChart />
        </div>
      </div>

      {/* Main Priority Queue Table */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-secondary small">
            Loading dashboard telemetry...
          </p>
        </div>
      ) : (
        <PriorityQueueTable
          payments={payments}
          onExecuteAction={handleExecuteSingleAction}
        />
      )}
    </div>
  );
}
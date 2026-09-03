import React, { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("guardrails");
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    maxRetryAttempts: 3,
    autoRetryScoreThreshold: 75,
    enableWebhooks: true,
    stripeApiKey: "sk_live_51M0...9x2A",
    razorpaySecret: "rzp_live_...k9B",
    emailAlerts: true,
    slackWebhook: "https://hooks.slack.com/services/...",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "#0f172a" }}>
            Platform Settings
          </h3>
          <p className="text-secondary mb-0 small">
            Configure autonomous recovery guardrails, API integrations, and system alerts.
          </p>
        </div>
        {saved && (
          <div className="alert alert-success py-2 px-3 mb-0 small shadow-sm animate__animated animate__fadeIn">
            <i className="bi bi-check-circle-fill me-2"></i>Settings saved successfully!
          </div>
        )}
      </div>

      <div className="row g-4">
        {/* Navigation Tabs */}
        <div className="col-md-3">
          <div className="list-group border-0 shadow-sm rounded-3 overflow-hidden">
            <button
              className={`list-group-item list-group-item-action border-0 py-3 ${
                activeTab === "guardrails" ? "active fw-bold" : "bg-white"
              }`}
              onClick={() => setActiveTab("guardrails")}
            >
              <i className="bi bi-shield-check me-2"></i> Recovery Guardrails
            </button>
            <button
              className={`list-group-item list-group-item-action border-0 py-3 ${
                activeTab === "integrations" ? "active fw-bold" : "bg-white"
              }`}
              onClick={() => setActiveTab("integrations")}
            >
              <i className="bi bi-key me-2"></i> API & Gateways
            </button>
            <button
              className={`list-group-item list-group-item-action border-0 py-3 ${
                activeTab === "notifications" ? "active fw-bold" : "bg-white"
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              <i className="bi bi-bell me-2"></i> Alert Webhooks
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="col-md-9">
          <div className="card border-0 shadow-sm bg-white p-4">
            <form onSubmit={handleSave}>
              {/* Tab 1: Guardrails */}
              {activeTab === "guardrails" && (
                <div>
                  <h5 className="fw-bold mb-3" style={{ color: "#0f172a" }}>
                    Autonomous Recovery Rules
                  </h5>
                  <p className="text-secondary small mb-4">
                    Set limits to ensure automated retries do not trigger unnecessary gateway fees or customer friction.
                  </p>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">
                      Max Retry Attempts per Transaction
                    </label>
                    <input
                      type="number"
                      name="maxRetryAttempts"
                      className="form-control"
                      value={settings.maxRetryAttempts}
                      onChange={handleChange}
                      min="1"
                      max="5"
                    />
                    <div className="form-text">Recommended limit: 3 retries</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">
                      Minimum AI Score for Auto-Execution ({settings.autoRetryScoreThreshold}%)
                    </label>
                    <input
                      type="range"
                      name="autoRetryScoreThreshold"
                      className="form-range"
                      min="50"
                      max="95"
                      value={settings.autoRetryScoreThreshold}
                      onChange={handleChange}
                    />
                    <div className="form-text">
                      Transactions below this score will require manual review in the Priority Queue.
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: API Keys */}
              {activeTab === "integrations" && (
                <div>
                  <h5 className="fw-bold mb-3" style={{ color: "#0f172a" }}>
                    Payment Gateway Credentials
                  </h5>
                  <p className="text-secondary small mb-4">
                    Connect your active gateways for real-time failure hooks and automated dynamic routing.
                  </p>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">
                      Stripe Secret API Key
                    </label>
                    <input
                      type="password"
                      name="stripeApiKey"
                      className="form-control"
                      value={settings.stripeApiKey}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">
                      Razorpay Secret Key
                    </label>
                    <input
                      type="password"
                      name="razorpaySecret"
                      className="form-control"
                      value={settings.razorpaySecret}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Notifications */}
              {activeTab === "notifications" && (
                <div>
                  <h5 className="fw-bold mb-3" style={{ color: "#0f172a" }}>
                    Telemetry & Alert Dispatchers
                  </h5>
                  <p className="text-secondary small mb-4">
                    Get notified immediately when high-value recovery limits are reached.
                  </p>

                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="emailAlerts"
                      id="emailAlerts"
                      checked={settings.emailAlerts}
                      onChange={handleChange}
                    />
                    <label className="form-check-label small fw-semibold text-secondary" htmlFor="emailAlerts">
                      Send daily summary emails to finance team
                    </label>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">
                      Slack Webhook URL
                    </label>
                    <input
                      type="text"
                      name="slackWebhook"
                      className="form-control"
                      value={settings.slackWebhook}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <hr className="my-4" />

              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary px-4 shadow-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
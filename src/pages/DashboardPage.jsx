import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { grantPrograms, grantCategories } from "../data/grants";
import GrantCard from "../components/GrantCard";
import "../styles/dashboard.css";

export default function DashboardPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [expandedGrant, setExpandedGrant] = useState(null);
  const [applications, setApplications] = useState([]);

  const filteredGrants = grantPrograms.filter((g) => {
    const catMatch = selectedCategory === "All Categories" || g.category === selectedCategory;
    const statusMatch = selectedStatus === "All" || g.status === selectedStatus;
    return catMatch && statusMatch;
  });

  function handleApply(grantId) {
    if (applications.find((a) => a.grantId === grantId)) return;
    const grant = grantPrograms.find((g) => g.id === grantId);
    setApplications((prev) => [
      ...prev,
      {
        grantId,
        grantName: grant.name,
        status: "Draft",
        submittedAt: null,
        startedAt: new Date().toISOString(),
      },
    ]);
  }

  function handleSubmitApplication(grantId) {
    setApplications((prev) =>
      prev.map((a) =>
        a.grantId === grantId
          ? { ...a, status: "Submitted", submittedAt: new Date().toISOString() }
          : a
      )
    );
  }

  const appliedIds = new Set(applications.map((a) => a.grantId));

  return (
    <div className="dashboard">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user?.firstName || "User"}</h1>
          <p className="dashboard-org">{user?.orgName || "Your Organization"}</p>
        </div>
        <div className="dashboard-quick-stats">
          <div className="quick-stat">
            <span className="quick-stat-num">{applications.length}</span>
            <span className="quick-stat-label">Applications</span>
          </div>
          <div className="quick-stat">
            <span className="quick-stat-num">
              {applications.filter((a) => a.status === "Submitted").length}
            </span>
            <span className="quick-stat-label">Submitted</span>
          </div>
          <div className="quick-stat">
            <span className="quick-stat-num">
              {applications.filter((a) => a.status === "Draft").length}
            </span>
            <span className="quick-stat-label">Drafts</span>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      {applications.length > 0 && (
        <section className="dashboard-section">
          <h2>Your Applications</h2>
          <div className="applications-table">
            <div className="app-table-header">
              <span>Program</span>
              <span>Status</span>
              <span>Date</span>
              <span>Action</span>
            </div>
            {applications.map((app) => (
              <div key={app.grantId} className="app-table-row">
                <span className="app-name">{app.grantName}</span>
                <span className={`app-status app-status-${app.status.toLowerCase()}`}>
                  {app.status}
                </span>
                <span className="app-date">
                  {app.submittedAt
                    ? new Date(app.submittedAt).toLocaleDateString()
                    : new Date(app.startedAt).toLocaleDateString()}
                </span>
                <span>
                  {app.status === "Draft" && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleSubmitApplication(app.grantId)}
                    >
                      Submit
                    </button>
                  )}
                  {app.status === "Submitted" && (
                    <span className="text-muted">Under Review</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Available Grants */}
      <section className="dashboard-section">
        <h2>Available Grants &amp; Programs</h2>
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="category-filter">Category</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {grantCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="status-filter">Status</label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Closing Soon">Closing Soon</option>
              <option value="Coming Soon">Coming Soon</option>
            </select>
          </div>
          <div className="filter-results">
            Showing {filteredGrants.length} of {grantPrograms.length} programs
          </div>
        </div>

        <div className="grants-list">
          {filteredGrants.map((grant) => (
            <GrantCard
              key={grant.id}
              grant={grant}
              isExpanded={expandedGrant === grant.id}
              onToggle={() =>
                setExpandedGrant(expandedGrant === grant.id ? null : grant.id)
              }
              hasApplied={appliedIds.has(grant.id)}
              onApply={() => handleApply(grant.id)}
            />
          ))}
          {filteredGrants.length === 0 && (
            <div className="empty-state">
              <p>No programs match your current filters. Try adjusting your selection.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

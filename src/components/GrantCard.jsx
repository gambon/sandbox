import "../styles/components.css";

export default function GrantCard({ grant, isExpanded, onToggle, hasApplied, onApply }) {
  const deadlineDate = new Date(grant.deadline);
  const isClosingSoon = grant.status === "Closing Soon";
  const isComingSoon = grant.status === "Coming Soon";

  return (
    <div className={`grant-card ${isExpanded ? "expanded" : ""}`}>
      <div className="grant-card-header" onClick={onToggle}>
        <div className="grant-card-main">
          <div className="grant-card-badges">
            <span
              className={`status-badge status-${grant.status.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {grant.status}
            </span>
            <span className="type-badge">{grant.type}</span>
            <span className="category-badge">{grant.category}</span>
          </div>
          <h3 className="grant-card-title">{grant.name}</h3>
          <p className="grant-card-desc">{grant.description}</p>
          <div className="grant-card-meta">
            <span>
              <strong>Funding:</strong> {grant.fundingRange}
            </span>
            <span>
              <strong>Deadline:</strong> {deadlineDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="grant-card-toggle">
          <span className="toggle-icon">{isExpanded ? "\u25B2" : "\u25BC"}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="grant-card-details">
          <div className="grant-detail-grid">
            <div className="grant-detail-section">
              <h4>Eligibility Requirements</h4>
              <ul>
                {grant.eligibility.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
            <div className="grant-detail-section">
              <h4>Program Details</h4>
              <dl>
                <dt>Posted Date</dt>
                <dd>{new Date(grant.postedDate).toLocaleDateString()}</dd>
                <dt>Application Deadline</dt>
                <dd className={isClosingSoon ? "text-warning" : ""}>
                  {deadlineDate.toLocaleDateString()}
                </dd>
                <dt>Funding Range</dt>
                <dd>{grant.fundingRange}</dd>
                <dt>Contact</dt>
                <dd>{grant.contactEmail}</dd>
              </dl>
            </div>
          </div>
          <div className="grant-card-actions">
            {hasApplied ? (
              <span className="applied-badge">Application Started</span>
            ) : isComingSoon ? (
              <button className="btn btn-secondary" disabled>
                Applications Not Yet Open
              </button>
            ) : (
              <button className="btn btn-primary" onClick={onApply}>
                Start Application
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

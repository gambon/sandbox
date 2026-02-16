import { Link } from "react-router-dom";
import { processSteps, biddingPreferences, grantPrograms } from "../data/grants";
import "../styles/landing.css";

export default function LandingPage() {
  const openGrants = grantPrograms.filter((g) => g.status === "Open").length;

  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>South Coast AQMD Grants &amp; Bids Portal</h1>
          <p className="hero-subtitle">
            Discover funding opportunities for clean air technology, emission
            reduction projects, and environmental improvement programs in the
            South Coast Air Basin.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{grantPrograms.length}</span>
              <span className="stat-label">Programs Available</span>
            </div>
            <div className="stat">
              <span className="stat-number">{openGrants}</span>
              <span className="stat-label">Open for Applications</span>
            </div>
            <div className="stat">
              <span className="stat-number">$178M+</span>
              <span className="stat-label">In Available Funding</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">
              Register Your Organization
            </Link>
            <a href="#how-it-works" className="btn btn-secondary">
              Learn How It Works
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section" id="about">
        <div className="container">
          <h2>About the Grants &amp; Bids Program</h2>
          <div className="about-grid">
            <div className="about-card">
              <h3>Our Mission</h3>
              <p>
                South Coast AQMD provides monetary incentives for implementing
                cleaner technologies. We offer a broad range of programs for
                businesses, the community, and local government to improve air
                quality in the South Coast Air Basin.
              </p>
            </div>
            <div className="about-card">
              <h3>Who Can Apply</h3>
              <p>
                Our programs serve private businesses, government agencies,
                non-profit organizations, and residents. It is our policy to
                ensure that all businesses — including minority, women-owned,
                disabled veteran, and small businesses — have fair and equitable
                opportunity to participate.
              </p>
            </div>
            <div className="about-card">
              <h3>Types of Opportunities</h3>
              <p>
                We offer Requests for Proposals (RFPs), Requests for Quotations
                (RFQs), direct grants, rebate programs, and equipment exchange
                programs. Each has specific guidelines, deadlines, and evaluation
                criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section section-alt" id="how-it-works">
        <div className="container">
          <h2>How Grants &amp; Bids Work</h2>
          <p className="section-subtitle">
            Follow these steps to find and apply for funding opportunities
          </p>
          <div className="steps-grid">
            {processSteps.map((step) => (
              <div key={step.step} className="step-card">
                <div className="step-number">{step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bidding Preferences */}
      <section className="section" id="preferences">
        <div className="container">
          <h2>Bidding Preferences &amp; Evaluation Points</h2>
          <p className="section-subtitle">
            South Coast AQMD awards evaluation preference points to qualifying
            businesses. The cumulative points cap is 17 points.
          </p>
          <div className="preferences-table">
            <div className="pref-header">
              <span>Business Type</span>
              <span>Points</span>
            </div>
            {biddingPreferences.map((pref) => (
              <div key={pref.type} className="pref-row">
                <div className="pref-info">
                  <strong>{pref.type}</strong>
                  <p>{pref.description}</p>
                </div>
                <div className="pref-points">+{pref.points}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="section section-alt" id="programs">
        <div className="container">
          <h2>Featured Funding Programs</h2>
          <div className="programs-grid">
            {grantPrograms.slice(0, 4).map((grant) => (
              <div key={grant.id} className="program-card">
                <div className="program-header">
                  <span className={`status-badge status-${grant.status.toLowerCase().replace(/\s+/g, "-")}`}>
                    {grant.status}
                  </span>
                  <span className="program-type">{grant.type}</span>
                </div>
                <h3>{grant.name}</h3>
                <p>{grant.description}</p>
                <div className="program-meta">
                  <div>
                    <strong>Funding:</strong> {grant.fundingRange}
                  </div>
                  <div>
                    <strong>Deadline:</strong>{" "}
                    {new Date(grant.deadline).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Category:</strong> {grant.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/register" className="btn btn-primary">
              Register to View All Programs &amp; Apply
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>
            Register your organization today to access all available grants,
            submit proposals, and track your applications.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">
              Create an Account
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

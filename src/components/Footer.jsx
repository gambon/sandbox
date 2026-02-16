import "../styles/components.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <strong>South Coast AQMD</strong> Grants &amp; Bids Portal
          <span className="footer-proto">Prototype</span>
        </div>
        <div className="footer-links">
          <a href="https://www.aqmd.gov/nav/grants-bids" target="_blank" rel="noopener noreferrer">
            Official AQMD Site
          </a>
          <a href="https://www.aqmd.gov/nav/grants-bids/funding" target="_blank" rel="noopener noreferrer">
            Funding Programs
          </a>
          <a href="https://www.aqmd.gov/home/programs" target="_blank" rel="noopener noreferrer">
            Incentive Programs
          </a>
        </div>
        <div className="footer-note">
          This is a prototype demonstration portal. Not affiliated with South Coast AQMD.
        </div>
      </div>
    </footer>
  );
}

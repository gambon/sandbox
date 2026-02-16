import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

const STEPS = ["Account", "Organization", "Review"];

const BUSINESS_TYPES = [
  "Small Business",
  "Large Business",
  "Disabled Veteran Business Enterprise (DVBE)",
  "Minority Business Enterprise (MBE)",
  "Women Business Enterprise (WBE)",
  "Non-Profit Organization",
  "Government Agency",
  "School District",
  "Community-Based Organization",
];

const INTEREST_AREAS = [
  "Heavy-Duty Equipment Replacement",
  "Clean Transportation / Fleet Electrification",
  "Building Electrification",
  "EV Charging Infrastructure",
  "Emission Reduction Technology",
  "Community Air Quality Programs",
  "Lawn & Garden Equipment",
  "Industrial Source Controls",
];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    orgName: "",
    orgType: "",
    einNumber: "",
    address: "",
    city: "",
    state: "CA",
    zip: "",
    orgDescription: "",
    numEmployees: "",
    annualRevenue: "",
    interestAreas: [],
    certifications: [],
    agreeTerms: false,
  });

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function toggleArrayField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  }

  function validateStep(s) {
    const errs = {};
    if (s === 0) {
      if (!form.firstName.trim()) errs.firstName = "Required";
      if (!form.lastName.trim()) errs.lastName = "Required";
      if (!form.email.trim()) errs.email = "Required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
      if (!form.password) errs.password = "Required";
      else if (form.password.length < 8) errs.password = "Must be at least 8 characters";
      if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords don't match";
    }
    if (s === 1) {
      if (!form.orgName.trim()) errs.orgName = "Required";
      if (!form.orgType) errs.orgType = "Required";
      if (!form.address.trim()) errs.address = "Required";
      if (!form.city.trim()) errs.city = "Required";
      if (!form.zip.trim()) errs.zip = "Required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function nextStep() {
    if (validateStep(step)) setStep(step + 1);
  }

  function prevStep() {
    setStep(step - 1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.agreeTerms) {
      setErrors({ agreeTerms: "You must agree to the terms" });
      return;
    }
    const { confirmPassword, agreeTerms, ...userData } = form;
    register(userData);
    navigate("/dashboard");
  }

  return (
    <div className="auth-page">
      <div className="auth-container register-container">
        <h1>Register Your Organization</h1>
        <p className="auth-subtitle">
          Create an account to access grants, submit proposals, and track
          applications.
        </p>

        {/* Progress Steps */}
        <div className="stepper">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`stepper-step ${i === step ? "active" : ""} ${i < step ? "completed" : ""}`}
            >
              <div className="stepper-circle">{i < step ? "\u2713" : i + 1}</div>
              <span className="stepper-label">{label}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Account Information */}
          {step === 0 && (
            <div className="form-step">
              <h2>Account Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    id="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className={errors.firstName ? "error" : ""}
                  />
                  {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    id="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className={errors.lastName ? "error" : ""}
                  />
                  {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    className={errors.password ? "error" : ""}
                  />
                  {errors.password && <span className="field-error">{errors.password}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    className={errors.confirmPassword ? "error" : ""}
                  />
                  {errors.confirmPassword && (
                    <span className="field-error">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Organization Details */}
          {step === 1 && (
            <div className="form-step">
              <h2>Organization Details</h2>
              <div className="form-group">
                <label htmlFor="orgName">Organization Name *</label>
                <input
                  id="orgName"
                  type="text"
                  value={form.orgName}
                  onChange={(e) => updateField("orgName", e.target.value)}
                  className={errors.orgName ? "error" : ""}
                />
                {errors.orgName && <span className="field-error">{errors.orgName}</span>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="orgType">Business Type *</label>
                  <select
                    id="orgType"
                    value={form.orgType}
                    onChange={(e) => updateField("orgType", e.target.value)}
                    className={errors.orgType ? "error" : ""}
                  >
                    <option value="">Select type...</option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.orgType && <span className="field-error">{errors.orgType}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="einNumber">EIN / Tax ID</label>
                  <input
                    id="einNumber"
                    type="text"
                    placeholder="XX-XXXXXXX"
                    value={form.einNumber}
                    onChange={(e) => updateField("einNumber", e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Street Address *</label>
                <input
                  id="address"
                  type="text"
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className={errors.address ? "error" : ""}
                />
                {errors.address && <span className="field-error">{errors.address}</span>}
              </div>
              <div className="form-row form-row-3">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    id="city"
                    type="text"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    className={errors.city ? "error" : ""}
                  />
                  {errors.city && <span className="field-error">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input id="state" type="text" value={form.state} disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="zip">ZIP Code *</label>
                  <input
                    id="zip"
                    type="text"
                    value={form.zip}
                    onChange={(e) => updateField("zip", e.target.value)}
                    className={errors.zip ? "error" : ""}
                  />
                  {errors.zip && <span className="field-error">{errors.zip}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="numEmployees">Number of Employees</label>
                  <select
                    id="numEmployees"
                    value={form.numEmployees}
                    onChange={(e) => updateField("numEmployees", e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1-10">1–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-250">51–250</option>
                    <option value="251-1000">251–1,000</option>
                    <option value="1000+">1,000+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="annualRevenue">Annual Revenue</label>
                  <select
                    id="annualRevenue"
                    value={form.annualRevenue}
                    onChange={(e) => updateField("annualRevenue", e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="<500k">Under $500K</option>
                    <option value="500k-1m">$500K – $1M</option>
                    <option value="1m-5m">$1M – $5M</option>
                    <option value="5m-25m">$5M – $25M</option>
                    <option value="25m+">$25M+</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="orgDescription">Organization Description</label>
                <textarea
                  id="orgDescription"
                  rows="3"
                  placeholder="Brief description of your organization and its mission..."
                  value={form.orgDescription}
                  onChange={(e) => updateField("orgDescription", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Areas of Interest</label>
                <div className="checkbox-grid">
                  {INTEREST_AREAS.map((area) => (
                    <label key={area} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={form.interestAreas.includes(area)}
                        onChange={() => toggleArrayField("interestAreas", area)}
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Certifications</label>
                <div className="checkbox-grid">
                  {["DVBE Certified", "SBA Small Business", "MBE Certified", "WBE Certified", "Local Business (South Coast)"].map(
                    (cert) => (
                      <label key={cert} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={form.certifications.includes(cert)}
                          onChange={() => toggleArrayField("certifications", cert)}
                        />
                        {cert}
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 2 && (
            <div className="form-step">
              <h2>Review Your Information</h2>
              <div className="review-section">
                <h3>Account</h3>
                <div className="review-grid">
                  <div><strong>Name:</strong> {form.firstName} {form.lastName}</div>
                  <div><strong>Email:</strong> {form.email}</div>
                  <div><strong>Phone:</strong> {form.phone || "Not provided"}</div>
                </div>
              </div>
              <div className="review-section">
                <h3>Organization</h3>
                <div className="review-grid">
                  <div><strong>Organization:</strong> {form.orgName}</div>
                  <div><strong>Type:</strong> {form.orgType}</div>
                  <div><strong>EIN:</strong> {form.einNumber || "Not provided"}</div>
                  <div>
                    <strong>Address:</strong> {form.address}, {form.city}, {form.state} {form.zip}
                  </div>
                  <div><strong>Employees:</strong> {form.numEmployees || "Not provided"}</div>
                  <div><strong>Revenue:</strong> {form.annualRevenue || "Not provided"}</div>
                </div>
                {form.orgDescription && (
                  <div className="review-description">
                    <strong>Description:</strong>
                    <p>{form.orgDescription}</p>
                  </div>
                )}
                {form.interestAreas.length > 0 && (
                  <div className="review-tags">
                    <strong>Interest Areas:</strong>
                    <div className="tags">
                      {form.interestAreas.map((a) => (
                        <span key={a} className="tag">{a}</span>
                      ))}
                    </div>
                  </div>
                )}
                {form.certifications.length > 0 && (
                  <div className="review-tags">
                    <strong>Certifications:</strong>
                    <div className="tags">
                      {form.certifications.map((c) => (
                        <span key={c} className="tag tag-cert">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <label className="checkbox-label terms-checkbox">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => updateField("agreeTerms", e.target.checked)}
                />
                I agree to the Terms of Service and certify the information provided is accurate.
              </label>
              {errors.agreeTerms && <span className="field-error">{errors.agreeTerms}</span>}
            </div>
          )}

          {/* Navigation */}
          <div className="form-nav">
            {step > 0 && (
              <button type="button" className="btn btn-secondary" onClick={prevStep}>
                Back
              </button>
            )}
            {step < 2 && (
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Continue
              </button>
            )}
            {step === 2 && (
              <button type="submit" className="btn btn-primary">
                Complete Registration
              </button>
            )}
          </div>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

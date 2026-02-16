# South Coast AQMD Grants Portal - Prototype

## Project Overview

This is a prototype grants portal inspired by the [South Coast Air Quality Management District (AQMD)](https://www.aqmd.gov/nav/grants-bids) grants and bids system. It showcases a submission workflow for organizations to discover, apply for, and manage grant applications related to air quality improvement programs.

**This is a static prototype — no backend or database is used. All data is hardcoded.**

## Tech Stack

- **React 19** with Vite for fast development
- **React Router** for client-side routing
- **CSS Modules / vanilla CSS** for styling (no external UI library)
- **LocalStorage** for session persistence in the prototype

## Project Structure

```
src/
├── main.jsx              # App entry point with router
├── App.jsx               # Root layout component
├── index.css             # Global styles
├── data/
│   └── grants.js         # Hardcoded grant programs & static data
├── context/
│   └── AuthContext.jsx    # Authentication state (localStorage-backed)
├── pages/
│   ├── LandingPage.jsx   # Public landing page explaining grants process
│   ├── LoginPage.jsx     # Login form
│   ├── RegisterPage.jsx  # Multi-step registration with org info
│   └── DashboardPage.jsx # Authenticated dashboard with grants dropdown
├── components/
│   ├── Navbar.jsx        # Navigation bar
│   ├── GrantCard.jsx     # Individual grant display card
│   ├── ProtectedRoute.jsx# Route guard for authenticated pages
│   └── Footer.jsx        # Page footer
└── styles/
    ├── landing.css
    ├── auth.css
    ├── dashboard.css
    └── components.css
```

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Production build
npm run preview    # Preview production build
```

## Key Features

1. **Landing Page** — Overview of how AQMD grants & bids work, funding programs, eligibility info
2. **Registration** — Multi-step form: account credentials → organization details → review
3. **Login** — Simple localStorage-based auth for prototype
4. **Dashboard** — Browse available grants via dropdown, view details, initiate applications

## Data Model (Static)

Grants include fields like:
- Program name, category, description
- Funding amount / range
- Eligibility criteria
- Application deadline
- Status (Open, Closed, Coming Soon)

## Development Guidelines

- Keep it simple — this is a prototype for demonstration purposes
- No backend calls; all data lives in `src/data/grants.js`
- Use semantic HTML and accessible form patterns
- Responsive design targeting desktop and tablet
- Follow existing code patterns when adding new features

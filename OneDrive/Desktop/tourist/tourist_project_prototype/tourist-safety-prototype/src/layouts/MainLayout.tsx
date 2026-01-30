import { NavLink, Link } from 'react-router-dom'
import type { PropsWithChildren } from 'react'

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand fw-semibold">
            Smart Tourist Safety
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/incidents">Incidents</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/geo-fencing">Geo-Fencing</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/digital-id">Digital ID</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/analytics">Analytics</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/settings">Settings</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1 py-4">
        <div className="container">
          {children}
        </div>
      </main>

      <footer className="bg-light border-top py-3 mt-auto">
        <div className="container text-center small text-muted">
          © {new Date().getFullYear()} Smart Tourist Safety Prototype · AI · Geo‑Fencing · Blockchain ID
        </div>
      </footer>
    </div>
  )
}



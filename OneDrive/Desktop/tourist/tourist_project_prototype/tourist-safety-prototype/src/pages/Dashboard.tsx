import { kpi, recentIncidents } from '../data/static'

export function Dashboard() {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h1 className="h4 m-0">Safety Operations Dashboard</h1>
          <span className="badge text-bg-success">Prototype</span>
        </div>
        <p className="text-muted mb-4">Static demo for AI safety monitoring, geo‑fencing and blockchain-based digital ID.</p>
      </div>

      <div className="col-12 col-md-6 col-lg-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <div className="text-muted">Active Geofences</div>
            <div className="display-6 fw-bold">{kpi.activeGeofences}</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <div className="text-muted">Incidents Today</div>
            <div className="display-6 fw-bold">{kpi.incidentsToday}</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <div className="text-muted">Avg Response</div>
            <div className="display-6 fw-bold">{kpi.avgResponseMins}m</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <div className="text-muted">Verified Digital IDs</div>
            <div className="display-6 fw-bold">{kpi.verifiedIDs.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <strong>Recent Incidents</strong>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentIncidents.map((i) => (
                    <tr key={i.id}>
                      <td className="text-nowrap">{i.id}</td>
                      <td>{i.title}</td>
                      <td>
                        <span className="badge text-bg-secondary">{i.type}</span>
                      </td>
                      <td>
                        <span className={`badge text-bg-${i.severity === 'High' ? 'danger' : i.severity === 'Medium' ? 'warning' : 'success'}`}>{i.severity}</span>
                      </td>
                      <td>{i.status}</td>
                      <td className="text-nowrap">{i.location}</td>
                      <td className="text-nowrap">{i.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



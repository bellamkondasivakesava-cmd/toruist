import { recentIncidents } from '../data/static'

export function Incidents() {
  return (
    <div className="row g-4">
      <div className="col-12">
        <h1 className="h4">Incident Center</h1>
        <p className="text-muted">Static list showing incident detail preview.</p>
      </div>
      {recentIncidents.map((i) => (
        <div className="col-12 col-md-6" key={i.id}>
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h2 className="h6 m-0">{i.title}</h2>
                <span className={`badge text-bg-${i.severity === 'High' ? 'danger' : i.severity === 'Medium' ? 'warning' : 'success'}`}>{i.severity}</span>
              </div>
              <div className="text-muted small mb-2">{i.id} · {i.type} · {i.location} · {i.time}</div>
              <p className="mb-0">{i.description}</p>
            </div>
            <div className="card-footer bg-white d-flex gap-2">
              <button className="btn btn-sm btn-outline-primary" type="button">Assign</button>
              <button className="btn btn-sm btn-outline-success" type="button">Mark Resolved</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}



import type { Incident } from '../data/static'

type Props = {
  incident: Incident
}

export function IncidentCard({ incident }: Props) {
  const severityVariant = incident.severity === 'High' ? 'danger' : incident.severity === 'Medium' ? 'warning' : 'success'
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h2 className="h6 m-0">{incident.title}</h2>
          <span className={`badge text-bg-${severityVariant}`}>{incident.severity}</span>
        </div>
        <div className="text-muted small mb-2">{incident.id} · {incident.type} · {incident.location} · {incident.time}</div>
        <p className="mb-0">{incident.description}</p>
      </div>
      <div className="card-footer bg-white d-flex gap-2">
        <button className="btn btn-sm btn-outline-primary" type="button">Assign</button>
        <button className="btn btn-sm btn-outline-success" type="button">Mark Resolved</button>
      </div>
    </div>
  )
}



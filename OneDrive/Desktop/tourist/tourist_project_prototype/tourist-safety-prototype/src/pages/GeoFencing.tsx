import { geofences } from '../data/static'

export function GeoFencing() {
  return (
    <div className="row g-4">
      <div className="col-12">
        <h1 className="h4">Geo‑Fencing</h1>
        <p className="text-muted">Static map placeholder and zones.</p>
      </div>

      <div className="col-12">
        <div className="ratio ratio-16x9 border rounded bg-light d-flex align-items-center justify-content-center">
          <div className="text-muted">Map Placeholder (Zones, Alerts)</div>
        </div>
      </div>

      {geofences.map((z) => (
        <div className="col-12 col-md-4" key={z.id}>
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h6">{z.name}</h2>
              <span className={`badge text-bg-${z.color}`}>{z.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}



export function Settings() {
  return (
    <div className="row g-4">
      <div className="col-12">
        <h1 className="h4">Settings</h1>
        <p className="text-muted">Prototype preferences (non-functional).</p>
      </div>
      <div className="col-12 col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="h6">Notifications</h2>
            <div className="form-check form-switch mb-2">
              <input className="form-check-input" type="checkbox" id="alerts" defaultChecked />
              <label className="form-check-label" htmlFor="alerts">Enable alerts</label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="sms" />
              <label className="form-check-label" htmlFor="sms">SMS backup</label>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="h6">Privacy</h2>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="anonymize" defaultChecked />
              <label className="form-check-label" htmlFor="anonymize">Anonymize analytics</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



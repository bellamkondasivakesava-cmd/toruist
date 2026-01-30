import { digitalIDs } from '../data/static'

export function DigitalID() {
  return (
    <div className="row g-4">
      <div className="col-12">
        <h1 className="h4">Blockchain‑based Digital ID</h1>
        <p className="text-muted">Static list of on-chain style IDs (demo).</p>
      </div>

      <div className="col-12">
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID Hash</th>
                  <th>Holder</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {digitalIDs.map((d) => (
                  <tr key={d.idHash}>
                    <td className="text-nowrap">{d.idHash}</td>
                    <td>{d.holder}</td>
                    <td>
                      <span className={`badge text-bg-${d.verified ? 'success' : 'secondary'}`}>
                        {d.verified ? 'Verified' : 'Unverified'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}



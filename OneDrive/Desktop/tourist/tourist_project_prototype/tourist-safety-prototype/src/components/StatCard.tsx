type Props = {
  label: string
  value: string | number
  hint?: string
}

export function StatCard({ label, value, hint }: Props) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="text-muted">{label}</div>
        <div className="display-6 fw-bold">{value}</div>
        {hint && <div className="small text-muted">{hint}</div>}
      </div>
    </div>
  )
}



export type Incident = {
  id: string
  title: string
  type: 'Medical' | 'Theft' | 'Accident' | 'SOS'
  severity: 'Low' | 'Medium' | 'High'
  status: 'Open' | 'In Progress' | 'Resolved'
  location: string
  time: string
  description: string
}

export const kpi = {
  activeGeofences: 12,
  incidentsToday: 5,
  avgResponseMins: 7,
  verifiedIDs: 2841,
}

export const recentIncidents: Incident[] = [
  {
    id: 'INC-1045',
    title: 'Minor injury reported near City Museum',
    type: 'Medical',
    severity: 'Low',
    status: 'Resolved',
    location: 'City Museum, Zone A',
    time: '09:15',
    description: 'First-aid administered by nearby responder. Tourist resumed tour.'
  },
  {
    id: 'INC-1044',
    title: 'Pickpocketing attempt',
    type: 'Theft',
    severity: 'Medium',
    status: 'In Progress',
    location: 'River Walk, Zone C',
    time: '08:47',
    description: 'Suspect flagged by camera analytics; security notified.'
  },
  {
    id: 'INC-1043',
    title: 'Bicycle accident at park entry',
    type: 'Accident',
    severity: 'High',
    status: 'Open',
    location: 'Central Park, Gate 2',
    time: '08:05',
    description: 'Emergency services en route. Area temporarily restricted.'
  }
]

export const geofences = [
  { id: 'Z-A', name: 'Zone A - Heritage Core', status: 'Active', color: 'primary' },
  { id: 'Z-B', name: 'Zone B - Market District', status: 'Active', color: 'success' },
  { id: 'Z-C', name: 'Zone C - River Walk', status: 'Alert', color: 'warning' },
]

export const digitalIDs = [
  { idHash: '0xA12F...9C', holder: 'Visitor: Maria G.', verified: true },
  { idHash: '0x77BC...41', holder: 'Guide: Liam P.', verified: true },
  { idHash: '0x003E...AF', holder: 'Vendor: Lotus Cafe', verified: false },
]



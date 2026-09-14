import ResourceTable from './ResourceTable'

export default function Activities() {
  return <ResourceTable resource="activities" title="Activities" description="Suivez les efforts qui font avancer votre équipe." columns={[
    { label: 'Type', render: (item) => item.type },
    { label: 'Athlète', render: (item) => item.userId?.displayName ?? item.userId?.username ?? item.userId },
    { label: 'Durée', render: (item) => `${item.durationMinutes} min` },
    { label: 'Points', render: (item) => item.points },
    { label: 'Terminée le', render: (item) => item.completedAt ? new Date(item.completedAt).toLocaleDateString() : '—' },
  ]} />
}
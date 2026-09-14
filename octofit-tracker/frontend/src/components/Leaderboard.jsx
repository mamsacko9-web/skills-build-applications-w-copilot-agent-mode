import ResourceTable from './ResourceTable'

export default function Leaderboard() {
  return <ResourceTable resource="leaderboard" title="Leaderboard" description="Le classement du collectif, mis à jour par chaque activité." columns={[
    { label: '#', render: (item) => item.rank },
    { label: 'Athlète', render: (item) => item.userId?.displayName ?? item.userId?.username ?? item.userId },
    { label: 'Points', render: (item) => item.points },
  ]} />
}
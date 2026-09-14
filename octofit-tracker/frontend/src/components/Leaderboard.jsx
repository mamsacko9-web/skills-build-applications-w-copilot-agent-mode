import ResourceTable from './ResourceTable'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

export default function Leaderboard() {
  return <ResourceTable endpoint={leaderboardEndpoint} title="Leaderboard" description="Le classement du collectif, mis à jour par chaque activité." columns={[
    { label: '#', render: (item) => item.rank },
    { label: 'Athlète', render: (item) => item.userId?.displayName ?? item.userId?.username ?? item.userId },
    { label: 'Points', render: (item) => item.points },
  ]} />
}
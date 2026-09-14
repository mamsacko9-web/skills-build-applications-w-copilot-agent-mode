import ResourceTable from './ResourceTable'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  return <ResourceTable endpoint={teamsEndpoint} title="Teams" description="Découvrez les groupes et leurs membres." columns={[
    { label: 'Équipe', render: (item) => item.name },
    { label: 'Capitaine', render: (item) => item.captainId?.displayName ?? item.captainId ?? '—' },
    { label: 'Membres', render: (item) => item.memberIds?.length ?? 0 },
  ]} />
}
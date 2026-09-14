import ResourceTable from './ResourceTable'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  return <ResourceTable endpoint={usersEndpoint} title="Users" description="Les profils inscrits dans OctoFit Tracker." columns={[
    { label: 'Nom', render: (item) => item.displayName },
    { label: 'Identifiant', render: (item) => `@${item.username}` },
    { label: 'Email', render: (item) => item.email },
    { label: 'Équipe', render: (item) => item.teamId?.name ?? 'Sans équipe' },
  ]} />
}
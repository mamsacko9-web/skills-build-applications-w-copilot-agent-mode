import ResourceTable from './ResourceTable'

export default function Users() {
  return <ResourceTable resource="users" title="Users" description="Les profils inscrits dans OctoFit Tracker." columns={[
    { label: 'Nom', render: (item) => item.displayName },
    { label: 'Identifiant', render: (item) => `@${item.username}` },
    { label: 'Email', render: (item) => item.email },
    { label: 'Équipe', render: (item) => item.teamId?.name ?? 'Sans équipe' },
  ]} />
}
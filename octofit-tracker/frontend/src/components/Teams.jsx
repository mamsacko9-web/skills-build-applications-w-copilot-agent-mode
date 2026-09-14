import ResourceTable from './ResourceTable'

export default function Teams() {
  return <ResourceTable resource="teams" title="Teams" description="Découvrez les groupes et leurs membres." columns={[
    { label: 'Équipe', render: (item) => item.name },
    { label: 'Capitaine', render: (item) => item.captainId?.displayName ?? item.captainId ?? '—' },
    { label: 'Membres', render: (item) => item.memberIds?.length ?? 0 },
  ]} />
}
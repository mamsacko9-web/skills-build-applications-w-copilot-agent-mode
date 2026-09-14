import ResourceTable from './ResourceTable'

export default function Workouts() {
  return <ResourceTable resource="workouts" title="Workouts" description="Des séances prêtes à lancer, selon votre niveau." columns={[
    { label: 'Séance', render: (item) => item.title },
    { label: 'Type', render: (item) => item.activityType },
    { label: 'Niveau', render: (item) => item.difficulty },
    { label: 'Durée', render: (item) => `${item.durationMinutes} min` },
  ]} />
}
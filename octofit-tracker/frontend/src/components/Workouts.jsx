import ResourceTable from './ResourceTable'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  return <ResourceTable endpoint={workoutsEndpoint} title="Workouts" description="Des séances prêtes à lancer, selon votre niveau." columns={[
    { label: 'Séance', render: (item) => item.title },
    { label: 'Type', render: (item) => item.activityType },
    { label: 'Niveau', render: (item) => item.difficulty },
    { label: 'Durée', render: (item) => `${item.durationMinutes} min` },
  ]} />
}
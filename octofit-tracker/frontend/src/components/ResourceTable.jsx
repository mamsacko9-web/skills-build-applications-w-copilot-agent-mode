import { useEffect, useState } from 'react'
import { fetchItems } from '../api'

export default function ResourceTable({ endpoint, title, description, columns }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetchItems(endpoint)
      .then((nextItems) => {
        if (active) {
          setItems(nextItems)
          setStatus('ready')
        }
      })
      .catch((nextError) => {
        if (active) {
          setError(nextError.message)
          setStatus('error')
        }
      })
    return () => { active = false }
  }, [endpoint])

  return (
    <section className="resource-page">
      <div className="page-heading">
        <p className="eyebrow">OctoFit Tracker</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {status === 'loading' && <p className="state-message">Chargement...</p>}
      {status === 'error' && <p className="state-message error">{error}</p>}
      {status === 'ready' && (
        <div className="table-wrap">
          <table>
            <thead><tr>{columns.map((column) => <th key={column.label}>{column.label}</th>)}</tr></thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? index}>
                  {columns.map((column) => <td key={column.label}>{column.render(item) ?? '—'}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          {!items.length && <p className="empty-state">Aucune donnée pour le moment.</p>}
        </div>
      )}
    </section>
  )
}
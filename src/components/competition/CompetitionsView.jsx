import { useState } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../../store/useStore'

export default function CompetitionsView() {
  const { competitions, user } = useStore()
  const [filter, setFilter] = useState('all')

  const filteredCompetitions = competitions.filter(comp => {
    if (filter === 'public') return comp.type === 'Public'
    if (filter === 'private') return comp.type === 'Private'
    return true
  })

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Competitions</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/competitions/create"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
          >
            Create Competition
          </Link>
        </div>
      </div>

      <div className="mt-8 flex gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md ${
            filter === 'all' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('public')}
          className={`px-4 py-2 rounded-md ${
            filter === 'public' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          Public
        </button>
        <button
          onClick={() => setFilter('private')}
          className={`px-4 py-2 rounded-md ${
            filter === 'private' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          Private
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCompetitions.map((competition) => (
          <div
            key={competition.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {competition.name}
            </h3>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              <p>Status: {competition.status}</p>
              <p>Type: {competition.type}</p>
              <p>Venue: {competition.venue}</p>
              <p>Players: {competition.players.length}</p>
            </div>
            <div className="mt-4">
              <Link
                to={`/competitions/${competition.id}`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

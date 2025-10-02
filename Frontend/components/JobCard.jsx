import { Link } from 'react-router-dom'

export default function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job.id}`} className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{job.description}</p>
        </div>
        <span className="text-sm px-2 py-1 rounded bg-gray-100 text-gray-700">{job.category}</span>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
        <p>{job.budget ? `$${job.budget} budget` : job.rate ? `$${job.rate}/hr` : ''}</p>
        <p>{job.location}</p>
      </div>
    </Link>
  )
}




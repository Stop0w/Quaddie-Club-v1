export default function UseSamePicksToggle({ enabled, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onChange}
        className={`
          relative w-12 h-6 rounded-full transition-colors duration-200
          ${enabled ? 'bg-blue-600' : 'bg-gray-600'}
        `}
      >
        <span
          className={`
            absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200
            ${enabled ? 'translate-x-6' : 'translate-x-0'}
          `}
        />
      </button>
      <span className="text-sm text-gray-300">Use same picks</span>
    </div>
  )
}

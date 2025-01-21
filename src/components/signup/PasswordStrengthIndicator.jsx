export default function PasswordStrengthIndicator({ strength }) {
  const getStrengthColor = (score) => {
    switch (score) {
      case 0: return 'bg-gray-700'
      case 1: return 'bg-red-500'
      case 2: return 'bg-yellow-500'
      case 3: return 'bg-green-500'
      case 4: return 'bg-blue-500'
      default: return 'bg-gray-700'
    }
  }

  return (
    <div className="mt-2">
      {/* Strength Bars */}
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`
              h-1 w-1/4 rounded-full transition-colors
              ${strength.score >= level ? getStrengthColor(strength.score) : 'bg-gray-700'}
            `}
          />
        ))}
      </div>

      {/* Requirements List */}
      <ul className="text-xs space-y-1">
        <li className={strength.requirements.length ? 'text-green-500' : 'text-gray-400'}>
          • At least 8 characters
        </li>
        <li className={strength.requirements.uppercase ? 'text-green-500' : 'text-gray-400'}>
          • At least one uppercase letter
        </li>
        <li className={strength.requirements.lowercase ? 'text-green-500' : 'text-gray-400'}>
          • At least one lowercase letter
        </li>
        <li className={strength.requirements.number ? 'text-green-500' : 'text-gray-400'}>
          • At least one number
        </li>
        <li className={strength.requirements.special ? 'text-green-500' : 'text-gray-400'}>
          • At least one special character
        </li>
      </ul>
    </div>
  )
}

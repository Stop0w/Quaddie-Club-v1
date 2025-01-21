export default function ProfileSection({ isActive, children }) {
  if (!isActive) return null
  
  return (
    <div className="bg-gray-900 rounded-lg p-6 animate-fade-in">
      {children}
    </div>
  )
}

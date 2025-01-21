export default function PublicNavigation() {
  return (
    <nav className="bg-black px-4 py-2 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <img src="/logo.svg" alt="Quaddie" className="h-8 w-8" />
        <div className="flex space-x-6">
          <a href="/free-tips" className="text-white hover:text-gray-300">Free Tips</a>
          <a href="/how-it-works" className="text-white hover:text-gray-300">How It Works</a>
          <a href="/leaderboard-preview" className="text-white hover:text-gray-300">Leaderboard Preview</a>
          <a href="/demo-competition" className="text-white hover:text-gray-300">Demo Competition</a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <a href="/login" className="text-white hover:text-gray-300">Login</a>
        <a href="/sign-up" className="text-white hover:text-gray-300">Sign Up</a>
      </div>
    </nav>
  )
}

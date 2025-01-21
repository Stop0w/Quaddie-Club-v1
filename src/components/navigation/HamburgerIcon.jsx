export default function HamburgerIcon({ isOpen }) {
  return (
    <button className="hamburger-menu">
      <span className={`line ${isOpen ? 'open' : ''}`}></span>
      <span className={`line ${isOpen ? 'open' : ''}`}></span>
      <span className={`line ${isOpen ? 'open' : ''}`}></span>
    </button>
  )
}

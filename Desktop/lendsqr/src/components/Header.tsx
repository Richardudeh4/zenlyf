import './Header.scss'
import search from "../assets/search.svg";
import notice from "../assets/notice.svg";
import ade from "../assets/ade.svg";
import { useSearch } from '../contexts/SearchContext'

interface HeaderProps {
  onMenuClick: () => void
}

function Header({ onMenuClick }: HeaderProps) {
  const { searchQuery, setSearchQuery } = useSearch()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already updated via onChange, this just prevents form submission
  }

  return (
    <header className="dashboard-header">
      <button className="mobile-menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke="#213F7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 6H21" stroke="#213F7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 18H21" stroke="#213F7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="header-left">
        <form className="search-container" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search for anything" 
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-btn">
            <img src={search} alt="Search" />
          </button>
        </form>
      </div>

      <div className="header-right">
        <a href="#" className="docs-link">Docs</a>
        
        <button className="notification-btn">
         <img src={notice} alt="notice" width={26} height={26}/>
        </button>

        <div className="profile-section">
          <div className="profile-avatar">
            <img 
              src={ade} 
              alt="Profile" 
              width={48}
              height={48}
            />
          </div>
          <div className="profile-info">
            <span className="profile-name">Adedeji</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.39229 12.0516C9.72823 12.425 10.2751 12.4219 10.6079 12.0516L13.4829 8.857C13.8188 8.48434 13.6852 8.182 13.1845 8.182H6.81567C6.31489 8.182 6.18363 8.48746 6.51723 8.857L9.39229 12.0516Z" fill="#213F7D"/>
</svg>

          </div>
        </div>
      </div>
    </header>
  )
}

export default Header







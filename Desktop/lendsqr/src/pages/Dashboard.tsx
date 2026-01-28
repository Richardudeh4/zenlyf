import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { SearchProvider } from '../contexts/SearchContext'
import './Dashboard.scss'

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <SearchProvider>
      <div className="dashboard-container">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <Header onMenuClick={toggleSidebar} />
        {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </SearchProvider>
  )
}

export default Dashboard

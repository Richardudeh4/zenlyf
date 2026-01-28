import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { User } from '../services/api'
import './UserDetails.scss'

function UserDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user] = useState<User | null>(location.state?.user || null)
  const [error] = useState<string | null>(user ? null : 'User data not found')
  const [activeTab, setActiveTab] = useState('general')

  if (error) {
    return (
      <div className="user-details-container">
        <div className="user-details-error">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/dashboard/users')} className="back-btn">
            Back to Users
          </button>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="user-details-container">
        <div className="user-details-error">
          <h2>User Not Found</h2>
          <p>The user you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/dashboard/users')} className="back-btn">
            Back to Users
          </button>
        </div>
      </div>
    )
  }

  // Mock data for fields not in API - in production, these would come from the API
  const userDetails = {
    fullName: user.username,
    userId: user._id.substring(0, 10).toUpperCase(),
    tier: 1,
    balance: '₦200,000.00',
    bankAccount: '9912345678/Providus Bank',
    bvn: user.phone,
    gender: 'Female',
    maritalStatus: 'Single',
    children: 'None',
    residence: "Parent's Apartment",
    education: 'B.Sc',
    employmentStatus: 'Employed',
    sector: 'FinTech',
    employmentDuration: '2 years',
    officeEmail: user.email.replace('@', '@lendsqr.com'),
    monthlyIncome: '₦200,000.00-₦400,000.00',
    loanRepayment: '40,000',
    twitter: '@grace_effiom',
    facebook: 'Grace Effiom',
    instagram: '@grace_effiom',
    guarantors: [
      {
        fullName: 'Debby Ogana',
        phone: '07060780922',
        email: 'debby@gmail.com',
        relationship: 'Sister'
      },
      {
        fullName: 'Debby Ogana',
        phone: '07060780922',
        email: 'debby@gmail.com',
        relationship: 'Sister'
      }
    ]
  }

  return (
    <div className="user-details-container">
      <div onClick={() => navigate('/dashboard/users')} className="back-btn-container">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.94997 15.3564C1.9945 15.4712 2.0613 15.5767 2.14684 15.6658L5.89684 19.4157C6.07263 19.5927 6.31285 19.6935 6.56248 19.6935C6.81211 19.6935 7.05232 19.5927 7.22812 19.4157C7.40508 19.24 7.50586 18.9997 7.50586 18.7501C7.50586 18.5005 7.40508 18.2603 7.22812 18.0845L5.07187 15.9376H27.6562C28.1742 15.9376 28.5937 15.5181 28.5937 15.0001C28.5937 14.4821 28.1742 14.0626 27.6562 14.0626H5.07187L7.22812 11.9158C7.5961 11.5478 7.5961 10.9525 7.22812 10.5845C6.86014 10.2165 6.26485 10.2165 5.89687 10.5845L2.14687 14.3345C2.06133 14.4236 1.99453 14.529 1.95 14.6439C1.90195 14.7564 1.87617 14.8771 1.875 15.0001C1.87617 15.1232 1.90195 15.2439 1.95 15.3564L1.94997 15.3564Z" fill="#545F7D"/>
            </svg>
            <span>Back to Users</span>
        </div>
          <div className="user-details-header">
          <div className="header-left">
          <h1>User Details</h1>
        </div>
        <div className="header-actions">
          <button className="action-btn blacklist-btn">BLACKLIST USER</button>
          <button className="action-btn activate-btn">ACTIVATE USER</button>
        </div>
          </div>
       
     
<div className='user-summary-card-container'>
    {/* User Summary Card */}
    <div className="user-summary-card">
  <div className="summary-left">
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle opacity="0.16" cx="50" cy="50" r="50" fill="#213F7D"/>
<path d="M36.0405 65.1796C36.4796 62.2202 37.7936 59.6264 39.9796 57.4C42.7405 54.6 46.0732 53.2 49.9796 53.2C53.886 53.2 57.2204 54.6 59.9796 57.4C62.1796 59.6266 63.5062 62.2204 63.9593 65.1796M58.1405 44.0204C58.1405 46.247 57.3468 48.1532 55.7593 49.7408C54.1734 51.3408 52.253 52.1408 50.0001 52.1408C47.7594 52.1408 45.8409 51.3408 44.2409 49.7408C42.6534 48.1533 41.8596 46.247 41.8596 44.0204C41.8596 41.7673 42.6534 39.8468 44.2409 38.2596C45.8409 36.6737 47.7596 35.8799 50.0001 35.8799C52.2532 35.8799 54.1737 36.6737 55.7593 38.2596C57.3468 39.8471 58.1405 41.7674 58.1405 44.0204Z" stroke="#213F7D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    <div className="user-info">
            <h2>{userDetails.fullName}</h2>
            <p>{userDetails.userId}</p>
          </div>
  </div>
  <div className="summary-middle-line"/>
        <div className="summary-middle">
          <p className="tier-label">User's Tier</p>
          <div className="tier-stars">
            {[1, 2, 3].map((tier) => (
              <svg key={tier} width="16" height="16" viewBox="0 0 16 16" fill={tier <= userDetails.tier ? "#E9B200" : "none"} xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0L10.163 5.60769L16 6.17539L11.8541 9.99231L12.9443 16L8 13.0077L3.05569 16L4.14593 9.99231L0 6.17539L5.83697 5.60769L8 0Z" stroke={tier <= userDetails.tier ? "#E9B200" : "#E9B200"} strokeWidth="1"/>
              </svg>
            ))}
          </div>
        </div>
    <div className="summary-middle-line"/>
        <div className="summary-right">
          <p className="balance">{userDetails.balance}</p>
          <p className="bank-account">{userDetails.bankAccount}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="user-tabs">
        <p 
          className={`tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General Details
        </p>
        <p
          className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </p>
        <p 
          className={`tab ${activeTab === 'bank' ? 'active' : ''}`}
          onClick={() => setActiveTab('bank')}
        >
          Bank Details
        </p>
        <p 
          className={`tab ${activeTab === 'loans' ? 'active' : ''}`}
          onClick={() => setActiveTab('loans')}
        >
          Loans
        </p>
        <p 
          className={`tab ${activeTab === 'savings' ? 'active' : ''}`}
          onClick={() => setActiveTab('savings')}
        >
          Savings
        </p>
        <p 
          className={`tab ${activeTab === 'app' ? 'active' : ''}`}
          onClick={() => setActiveTab('app')}
        >
          App and System
        </p>
      </div>
</div>
  

      {/* Content Sections */}
      {activeTab === 'general' && (
        <div className="user-details-content">
          {/* Personal Information */}
          <div className="user-details-card">
            <h2>Personal Information</h2>
            <div className="details-grid">
              <div className="detail-item">
                <label>FULL NAME</label>
                <p>{userDetails.fullName}</p>
              </div>
              <div className="detail-item">
                <label>PHONE NUMBER</label>
                <p>{user.phone}</p>
              </div>
              <div className="detail-item">
                <label>EMAIL ADDRESS</label>
                <p>{user.email}</p>
              </div>
              <div className="detail-item">
                <label>BVN</label>
                <p>{userDetails.bvn}</p>
              </div>
              <div className="detail-item">
                <label>GENDER</label>
                <p>{userDetails.gender}</p>
              </div>
              <div className="detail-item">
                <label>MARITAL STATUS</label>
                <p>{userDetails.maritalStatus}</p>
              </div>
              <div className="detail-item">
                <label>CHILDREN</label>
                <p>{userDetails.children}</p>
              </div>
              <div className="detail-item">
                <label>TYPE OF RESIDENCE</label>
                <p>{userDetails.residence}</p>
              </div>
            </div>
          </div>

          {/* Education and Employment */}
          <div className="user-details-card">
            <h2>Education and Employment</h2>
            <div className="details-grid">
              <div className="detail-item">
                <label>LEVEL OF EDUCATION</label>
                <p>{userDetails.education}</p>
              </div>
              <div className="detail-item">
                <label>EMPLOYMENT STATUS</label>
                <p>{userDetails.employmentStatus}</p>
              </div>
              <div className="detail-item">
                <label>SECTOR OF EMPLOYMENT</label>
                <p>{userDetails.sector}</p>
              </div>
              <div className="detail-item">
                <label>DURATION OF EMPLOYMENT</label>
                <p>{userDetails.employmentDuration}</p>
              </div>
              <div className="detail-item">
                <label>OFFICE EMAIL</label>
                <p>{userDetails.officeEmail}</p>
              </div>
              <div className="detail-item">
                <label>MONTHLY INCOME</label>
                <p>{userDetails.monthlyIncome}</p>
              </div>
              <div className="detail-item">
                <label>LOAN REPAYMENT</label>
                <p>{userDetails.loanRepayment}</p>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="user-details-card">
            <h2>Socials</h2>
            <div className="details-grid">
              <div className="detail-item">
                <label>TWITTER</label>
                <p>{userDetails.twitter}</p>
              </div>
              <div className="detail-item">
                <label>FACEBOOK</label>
                <p>{userDetails.facebook}</p>
              </div>
              <div className="detail-item">
                <label>INSTAGRAM</label>
                <p>{userDetails.instagram}</p>
              </div>
            </div>
          </div>

          {/* Guarantor */}
          <div className="user-details-card">
            <h2>Guarantor</h2>
            {userDetails.guarantors.map((guarantor, index) => (
              <div key={index} className="guarantor-section">
                <div className="details-grid">
                  <div className="detail-item">
                    <label>FULL NAME</label>
                    <p>{guarantor.fullName}</p>
                  </div>
                  <div className="detail-item">
                    <label>PHONE NUMBER</label>
                    <p>{guarantor.phone}</p>
                  </div>
                  <div className="detail-item">
                    <label>EMAIL ADDRESS</label>
                    <p>{guarantor.email}</p>
                  </div>
                  <div className="detail-item">
                    <label>RELATIONSHIP</label>
                    <p>{guarantor.relationship}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab !== 'general' && (
        <div className="user-details-content">
          <div className="user-details-card">
            <p>Content for {activeTab} tab coming soon...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDetails

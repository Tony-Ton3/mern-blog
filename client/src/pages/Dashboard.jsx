import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'

export default function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')

  //allows navigation to different tabs within dashboard page. ex: /dashboard?tab=profile
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search]);
  return (
    <div className="min-h-screen md:flex-row flex flex-col">
      <div className='md:w-56'>
       {/* sidebar */}
       <DashSidebar />
      </div>
      {/* profile */}
      {tab === 'profile' && <DashProfile />} 
    </div>
  )
  
}

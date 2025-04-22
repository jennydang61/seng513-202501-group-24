import React from 'react'
import useSessions from '../hooks/useSessions'
import SessionCard from '../components/dashboard/SessionCard'
import NavBar from '../components/ui/Navbar2'

const Settings = () => {
    const {
        sessions,
        isPending,
        isSuccess,
        isError
    } = useSessions()

  return (
    <div>
        <NavBar /> {/* add nav bar component */}
      <h1>My Sessions</h1>
      {/* display loading message if data is being fetched */}
      {isPending && <p>loading...</p>}
      {/* display error */}
      {isError && <p>Failed to get sessions.</p>}
      {/* if successful display session */}
      {isSuccess && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {sessions.map((session) => (
          <SessionCard key={session._id} session={session} />
        ))}
      </div>
      )}
    </div>
  )
}

export default Settings

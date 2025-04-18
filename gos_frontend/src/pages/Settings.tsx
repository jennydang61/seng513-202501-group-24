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
        <NavBar />
      <h1>My Sessions</h1>
      {isPending && <p>loading...</p>}
      {isError && <p>Failed to get sessions.</p>}
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


import React from 'react'
import useDeleteSession from '../../hooks/useDeleteSession';

const SessionCard = ({session}) => {
    const { _id, createdAt, userAgent, isCurrent } = session;
    
    const { deleteSession, isPending } = useDeleteSession(_id);
    
    return (
        <div
        style={{
          display: "flex",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "0.875rem",
              marginBottom: "0.5rem",
            }}
          >
            {new Date(createdAt).toLocaleString("en-US")}
            {isCurrent && " (current session)"}
          </p>
          <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>{userAgent}</p>
        </div>
        {!isCurrent && (
          <button
            style={{
              marginLeft: "1rem",
              alignSelf: "center",
              fontSize: "1.25rem",
              color: "#f87171",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            title="Delete Session"
            onClick={deleteSession}
            disabled={isPending}
          >
            &times;
          </button>
        )}
      </div>
  )
}

export default SessionCard

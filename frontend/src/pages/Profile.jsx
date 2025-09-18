import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  const user = { name: 'Student User', email: 'student@example.com' } // placeholder
  return (
    <div style={{
      minHeight: '100dvh',
      background: 'radial-gradient(900px 500px at 100% 0%, #321f63 0%, rgba(11,16,32,0.6) 50%), #0b1020',
      color: 'white',
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      padding: '24px clamp(16px, 6vw, 48px)'
    }}>
      <h1 style={{ marginTop: 0 }}>Your Profile</h1>
      <div style={{ display: 'grid', gap: 8, maxWidth: 640 }}>
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <Link to="/student/onboarding" style={{ width: 'fit-content', marginTop: 10, padding: '10px 14px', borderRadius: 10, background: 'linear-gradient(135deg,#6EE7F9,#A78BFA)', color: '#0b1020', fontWeight: 800, textDecoration: 'none' }}>Edit student information</Link>
      </div>
    </div>
  )
}

export default Profile 
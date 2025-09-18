import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Chip = ({ text }) => (
  <span style={{ fontSize: 12, color: '#cfd3e6', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 10px', borderRadius: 999, marginRight: 6, marginBottom: 6 }}>{text}</span>
)

const StudentOnboarding = () => {
  const [skills, setSkills] = useState(['JavaScript', 'React'])
  const [newSkill, setNewSkill] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const addSkill = () => {
    const v = newSkill.trim()
    if (!v) return
    if (skills.includes(v)) return
    setSkills([...skills, v])
    setNewSkill('')
  }

  const saveAndContinue = () => {
    const profile = { name, email, skills }
    try { sessionStorage.setItem('studentProfile', JSON.stringify(profile)) } catch {}
    navigate('/recommendations')
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'radial-gradient(900px 500px at 100% 0%, #321f63 0%, rgba(11,16,32,0.6) 50%), #0b1020',
      color: 'white',
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      padding: '24px clamp(16px, 6vw, 48px)'
    }}>
      <h1 style={{ marginTop: 0 }}>Complete your student profile</h1>
      <p style={{ color: '#cfd3e6', marginTop: 6 }}>Tell us about your background so we can recommend the best internships.</p>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr', marginTop: 16 }}>
        <div style={{ display: 'grid', gap: 10 }}>
          <label>Full Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" type="email" style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'grid', gap: 10 }}>
          <label>Upload Resume</label>
          <input type="file" accept=".pdf,.doc,.docx" style={{ padding: 10, borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'grid', gap: 10 }}>
          <label>Skills</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={newSkill} onChange={e=>setNewSkill(e.target.value)} placeholder="Add a skill and press +" style={{ flex: 1, padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
            <button onClick={addSkill} style={{ padding: '12px 14px', borderRadius: 10, background: 'linear-gradient(135deg,#6EE7F9,#A78BFA)', color: '#0b1020', fontWeight: 800, border: 'none' }}>+</button>
          </div>
          <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap' }}>
            {skills.map(s => <Chip key={s} text={s} />)}
          </div>
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'grid', gap: 10 }}>
          <label>Preferred Roles</label>
          <textarea placeholder="e.g., Frontend Developer Intern, Data Analyst Intern" rows={3} style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)', color: 'white', resize: 'vertical' }} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <button onClick={saveAndContinue} style={{ padding: '12px 18px', borderRadius: 12, background: 'linear-gradient(135deg,#6EE7F9,#A78BFA)', color: '#0b1020', fontWeight: 800, border: 'none' }}>Save and Continue</button>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}

export default StudentOnboarding 
import React from 'react'

const Feature = ({ title, desc }) => (
  <div style={{
    borderRadius: 16,
    padding: 18,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <div style={{ fontWeight: 800 }}>{title}</div>
    <div style={{ color: '#a8adc0', marginTop: 6 }}>{desc}</div>
  </div>
)

const Features = () => {
  return (
    <div style={{
      minHeight: '100dvh',
      background: 'radial-gradient(900px 500px at 100% 0%, #321f63 0%, rgba(11,16,32,0.6) 50%), #0b1020',
      color: 'white',
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      padding: '24px clamp(16px, 6vw, 48px)'
    }}>
      <h1 style={{ marginTop: 0 }}>Features</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 16 }}>
        <Feature title="Smart Matching" desc="We analyze student skills and company needs to rank internships by fit." />
        <Feature title="Skill Gap Insights" desc="See which skills you’re missing for each role to plan learning." />
        <Feature title="Seamless Apply" desc="Apply directly to top matches and track your applications." />
        <Feature title="Company Dashboard" desc="Companies see top candidates first, saving time." />
        <Feature title="Privacy First" desc="Your data stays secure; share only what you choose." />
        <Feature title="Scalable" desc="Built with React and Node.js to scale across users and partners." />
      </div>
      <style>{`
        @media (max-width: 980px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}

export default Features 
import React from 'react'

const companies = [
  { id: 'c1', name: 'TCS', roles: ['Full‑Stack Intern', 'Data Analyst'], tags: ['IT', 'Global'] },
  { id: 'c2', name: 'Infosys', roles: ['AI/ML Intern', 'UI/UX'], tags: ['Consulting', 'Cloud'] },
  { id: 'c3', name: 'Wipro', roles: ['Cybersecurity', 'DevOps'], tags: ['Security', 'Automation'] },
  { id: 'c4', name: 'Accenture', roles: ['Strategy', 'Data Eng'], tags: ['Strategy', 'Analytics'] },
]

const Card = ({ title, subtitle, tags }) => (
  <div style={{
    borderRadius: 16,
    padding: 18,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <div style={{ fontWeight: 700 }}>{title}</div>
    <div style={{ fontSize: 12, color: '#a8adc0', marginTop: 2 }}>{subtitle}</div>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
      {tags.map(t => (
        <span key={t} style={{ fontSize: 11, color: '#cfd3e6', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 10px', borderRadius: 999 }}>{t}</span>
      ))}
    </div>
  </div>
)

const Companies = () => {
  return (
    <div style={{
      minHeight: '100dvh',
      background: 'radial-gradient(900px 500px at 100% 0%, #321f63 0%, rgba(11,16,32,0.6) 50%), #0b1020',
      color: 'white',
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      padding: '24px clamp(16px, 6vw, 48px)'
    }}>
      <h1 style={{ marginTop: 0 }}>Companies</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 16 }}>
        {companies.map(c => (
          <Card key={c.id} title={c.name} subtitle={c.roles.join(' • ')} tags={c.tags} />
        ))}
      </div>
      <style>{`
        @media (max-width: 980px) { .grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}

export default Companies 
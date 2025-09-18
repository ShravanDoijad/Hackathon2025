import React, { useMemo } from 'react'

// Temporary in-memory profile store via sessionStorage
const getStudentProfile = () => {
  try {
    const raw = sessionStorage.getItem('studentProfile')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const sampleCompanies = [
  { id: 'r1', name: 'TCS', role: 'Full‑Stack Intern', requiredSkills: ['JavaScript', 'React', 'Node.js'], location: 'Remote' },
  { id: 'r2', name: 'Infosys', role: 'AI/ML Intern', requiredSkills: ['Python', 'Pandas', 'Machine Learning'], location: 'Bengaluru' },
  { id: 'r3', name: 'Wipro', role: 'DevOps Intern', requiredSkills: ['Linux', 'Docker', 'CI/CD'], location: 'Hyderabad' },
  { id: 'r4', name: 'Accenture', role: 'Data Analyst Intern', requiredSkills: ['SQL', 'Excel', 'Power BI'], location: 'Gurugram' },
]

const matchScore = (studentSkills, requiredSkills) => {
  const have = new Set(studentSkills.map(s => s.toLowerCase()))
  const need = requiredSkills.map(s => s.toLowerCase())
  const matched = need.filter(s => have.has(s))
  const missing = need.filter(s => !have.has(s))
  const score = Math.round((matched.length / need.length) * 100)
  return { score, matched, missing }
}

const Badge = ({ children, kind='neutral' }) => {
  const styles = {
    neutral: { color: '#cfd3e6', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)' },
    success: { color: '#0b1020', bg: 'linear-gradient(135deg,#6EE7F9,#A78BFA)', border: 'transparent' },
    warning: { color: '#ffd1e6', bg: 'rgba(244,114,182,0.15)', border: 'rgba(244,114,182,0.4)' },
  }[kind]
  return (
    <span style={{
      fontSize: 11, padding: '6px 10px', borderRadius: 999,
      background: styles.bg, color: styles.color, border: `1px solid ${styles.border}`,
      display: 'inline-flex', alignItems: 'center', gap: 6
    }}>{children}</span>
  )
}

const Card = ({ company, studentSkills }) => {
  const { score, matched, missing } = useMemo(() => matchScore(studentSkills, company.requiredSkills), [studentSkills, company.requiredSkills])
  const isStrong = score >= 70 && missing.length <= 1

  return (
    <div style={{
      borderRadius: 16,
      padding: 18,
      background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
      border: '1px solid rgba(255,255,255,0.1)',
      display: 'grid', gap: 10
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontWeight: 800 }}>{company.name}</div>
        <Badge kind={isStrong ? 'success' : 'neutral'}>{score}% match</Badge>
      </div>
      <div style={{ color: '#a8adc0', fontSize: 13 }}>{company.role} • {company.location}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {company.requiredSkills.map(s => (
          <Badge key={s} kind={studentSkills.map(x=>x.toLowerCase()).includes(s.toLowerCase()) ? 'neutral' : 'warning'}>
            {s}
          </Badge>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {missing.length > 0 && (
          <div style={{ fontSize: 12, color: '#f8b9d3' }}>Skill gap: {missing.join(', ')}</div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button style={{ padding: '10px 14px', borderRadius: 10, background: 'linear-gradient(135deg,#6EE7F9,#A78BFA)', color: '#0b1020', fontWeight: 800, border: 'none' }}>Apply</button>
        <button style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.12)' }}>Save</button>
      </div>
    </div>
  )
}

const Recommendations = () => {
  const profile = getStudentProfile() || { skills: ['JavaScript', 'React'] }
  const studentSkills = profile.skills || []

  const sorted = useMemo(() => {
    return [...sampleCompanies].sort((a, b) => {
      const sa = matchScore(studentSkills, a.requiredSkills).score
      const sb = matchScore(studentSkills, b.requiredSkills).score
      return sb - sa
    })
  }, [studentSkills])

  const exactMatches = sorted.filter(c => matchScore(studentSkills, c.requiredSkills).missing.length === 0)
  const nearMatches = sorted.filter(c => matchScore(studentSkills, c.requiredSkills).missing.length > 0)

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'radial-gradient(900px 500px at 100% 0%, #321f63 0%, rgba(11,16,32,0.6) 50%), #0b1020',
      color: 'white',
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      padding: '24px clamp(16px, 6vw, 48px)'
    }}>
      <h1 style={{ marginTop: 0 }}>Recommended Internships</h1>
      <div style={{ color: '#cfd3e6', marginBottom: 12 }}>Based on your skills: {studentSkills.join(', ') || 'No skills added yet'}</div>

      <h2>Strong matches</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 16 }}>
        {exactMatches.length === 0 && <div style={{ color: '#a8adc0' }}>No perfect matches yet. See near matches below.</div>}
        {exactMatches.map(c => (
          <Card key={c.id} company={c} studentSkills={studentSkills} />
        ))}
      </div>

      <h2 style={{ marginTop: 24 }}>Near matches</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 16 }}>
        {nearMatches.map(c => (
          <Card key={c.id} company={c} studentSkills={studentSkills} />
        ))}
      </div>

      <style>{`
        @media (max-width: 980px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}

export default Recommendations 
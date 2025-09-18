import React from 'react'

const CompanyPost = () => {
  return (
    <div style={{
      minHeight: '100dvh',
      background: 'radial-gradient(900px 500px at 100% 0%, #321f63 0%, rgba(11,16,32,0.6) 50%), #0b1020',
      color: 'white',
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      padding: '24px clamp(16px, 6vw, 48px)'
    }}>
      <h1 style={{ marginTop: 0 }}>Post an Internship</h1>
      <p style={{ color: '#cfd3e6', marginTop: 6 }}>Describe your requirements to get high-quality, AI-matched candidates.</p>

      <div style={{ display: 'grid', gap: 12, maxWidth: 820 }}>
        <input placeholder="Company Name" style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
        <input placeholder="Internship Title" style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
        <textarea placeholder="Description" rows={5} style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)', color: 'white', resize: 'vertical' }} />
        <input placeholder="Required Skills (comma-separated)" style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <input placeholder="Location (Remote/City)" style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
          <input placeholder="Stipend (optional)" style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
        </div>
        <button style={{ width: 'fit-content', padding: '12px 18px', borderRadius: 12, background: 'linear-gradient(135deg,#6EE7F9,#A78BFA)', color: '#0b1020', fontWeight: 800, border: 'none' }}>Publish</button>
      </div>
    </div>
  )
}

export default CompanyPost 
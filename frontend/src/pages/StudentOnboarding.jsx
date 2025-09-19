import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Example fixed skill list for autocomplete
const possibleSkills = [
  "JavaScript", "React", "Node.js", "Python", "Data Analysis",
  "Machine Learning", "UI Design", "SQL", "HTML", "CSS"
];

// Chip component with delete option
const Chip = ({ text, onDelete }) => (
  <span style={{
    fontSize: 12,
    color: '#cfd3e6',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '6px 10px',
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 6,
    display: 'flex',
    alignItems: 'center',
    gap: 6
  }}>
    {text} <button onClick={onDelete} style={{
      border: 'none', background: 'transparent', color: '#ff6b6b', cursor: 'pointer'
    }}>×</button>
  </span>
);

// Simple email validation regex
const validateEmail = (email) => {
  return /^[\w.-]+@[\w.-]+\.\w+$/.test(email);
};

// Simple phone number validation (10 digits)
const validatePhone = (phone) => {
  return /^\d{10}$/.test(phone);
};

const StudentOnboarding = () => {
  const navigate = useNavigate();

  // Pre-fill from session storage
// Pre-fill from session storage OR fixed defaults (simulating post-login data)
const [name, setName] = useState(() => sessionStorage.getItem('studentName') || 'Shravan Doijjad');
const [email, setEmail] = useState(() => sessionStorage.getItem('studentEmail') || 'shravan@gmail.com');
const [phone, setPhone] = useState(() => sessionStorage.getItem('studentPhone') || '8999032682');

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [preferredRoles, setPreferredRoles] = useState('');
  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (skillInput.trim() === '') {
      setFilteredSkills([]);
      return;
    }
    const filtered = possibleSkills.filter(skill =>
      skill.toLowerCase().startsWith(skillInput.toLowerCase()) &&
      !skills.includes(skill)
    );
    setFilteredSkills(filtered);
  }, [skillInput, skills]);

  const addSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setSkillInput('');
    setFilteredSkills([]);
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      validateEmail(email) &&
      validatePhone(phone) &&
      skills.length > 0 &&
      degree.trim() !== '' &&
      institution.trim() !== '' &&
      graduationYear.trim() !== ''
    );
  };

  const saveAndContinue = () => {
    if (!isFormValid()) {
      alert('Please fill all required fields correctly: Name, Email, Phone (10 digits), Degree, Institution, Graduation Year, and at least one Skill.');
      return;
    }

    const profile = {
      name,
      email,
      phone,
      degree,
      institution,
      graduationYear,
      skills,
      preferredRoles,
      resumeName: resume?.name || '',
    };

    sessionStorage.setItem('studentProfile', JSON.stringify(profile));
    navigate('/recommendations');
  };

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'radial-gradient(900px 500px at 100% 0%, #321f63 0%, rgba(11,16,32,0.6) 50%), #0b1020',
      color: 'white',
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      padding: '24px clamp(16px, 6vw, 48px)'
    }}>
      <h1 style={{ marginTop: 0 }}>Complete your student profile</h1>
      <p style={{ color: '#cfd3e6', marginTop: 6 }}>Help us recommend the best internships for you.</p>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr', marginTop: 16 }}>
        {/* Name */}
        <div style={{ display: 'grid', gap: 6 }}>
          <label>Full Name</label>
          <input
            value={name}
            readOnly
            style={{
              padding: '12px 14px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.12)',
              color: '#cfd3e6',
              cursor: 'not-allowed'
            }}
          />
        </div>

        {/* Email */}
        <div style={{ display: 'grid', gap: 6 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            readOnly
            style={{
              padding: '12px 14px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.12)',
              color: '#cfd3e6',
              cursor: 'not-allowed'
            }}
          />
        </div>


        {/* Phone */}
        <div style={{ display: 'grid', gap: 6 }}>
          <label>Phone Number</label>
          <input
            value={phone}
            readOnly
            style={{
              padding: '12px 14px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.12)',
              color: '#cfd3e6',
              cursor: 'not-allowed'
            }}
          />
        </div>

        {/* Degree */}
        <div style={{ display: 'grid', gap: 6 }}>
          <label>Degree <span style={{ color: '#ff6b6b' }}>*</span></label>
          <input value={degree} onChange={e => setDegree(e.target.value)} placeholder="e.g. B.Tech, B.Sc" style={{
            padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.06)', color: 'white'
          }} />
        </div>

        {/* Institution */}
        <div style={{ display: 'grid', gap: 6 }}>
          <label>Institution <span style={{ color: '#ff6b6b' }}>*</span></label>
          <input value={institution} onChange={e => setInstitution(e.target.value)} placeholder="Your university/college" style={{
            padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.06)', color: 'white'
          }} />
        </div>

        {/* Graduation Year */}
        <div style={{ display: 'grid', gap: 6 }}>
          <label>Graduation Year <span style={{ color: '#ff6b6b' }}>*</span></label>
          <input type="number" min="2022" max="2035" value={graduationYear} onChange={e => setGraduationYear(e.target.value)} placeholder="e.g. 2025" style={{
            padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.06)', color: 'white'
          }} />
        </div>

        {/* Resume Upload */}
        <div style={{ gridColumn: '1 / -1', display: 'grid', gap: 6 }}>
          <label>Upload Resume</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} style={{
            padding: 10, borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.06)', color: 'white'
          }} />
          {resume && <span style={{ color: '#cfd3e6', fontSize: 12 }}>Selected file: {resume.name}</span>}
        </div>

        {/* Skills Input */}
        <div style={{ gridColumn: '1 / -1', display: 'grid', gap: 6 }}>
          <label>Skills <span style={{ color: '#ff6b6b' }}>*</span></label>
          <input
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            placeholder="Type and select skill"
            style={{
              padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.06)', color: 'white'
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && filteredSkills.length > 0) {
                e.preventDefault();
                addSkill(filteredSkills[0]);
              }
            }}
          />
          {/* Autocomplete suggestions */}
          <div style={{ background: '#12172c', borderRadius: 8, marginTop: 4, maxHeight: 100, overflowY: 'auto' }}>
            {filteredSkills.map(skill => (
              <div
                key={skill}
                onClick={() => addSkill(skill)}
                style={{ padding: '8px 12px', cursor: 'pointer', color: '#a78bfa' }}
                onMouseDown={e => e.preventDefault()}
              >
                {skill}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap' }}>
            {skills.map(skill => <Chip key={skill} text={skill} onDelete={() => removeSkill(skill)} />)}
          </div>
        </div>

        {/* Preferred Roles */}
        <div style={{ gridColumn: '1 / -1', display: 'grid', gap: 6 }}>
          <label>Preferred Roles</label>
          <textarea value={preferredRoles} onChange={e => setPreferredRoles(e.target.value)} placeholder="e.g., Frontend Developer Intern, Data Analyst Intern" rows={3} style={{
            padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.06)', color: 'white', resize: 'vertical'
          }} />
        </div>

        {/* Save Button */}
        <div style={{ gridColumn: '1 / -1' }}>
          <button
            onClick={saveAndContinue}
            disabled={!isFormValid()}
            style={{
              padding: '12px 18px', borderRadius: 12,
              background: isFormValid() ? 'linear-gradient(135deg,#6EE7F9,#A78BFA)' : 'rgba(111,231,249,0.5)',
              color: '#0b1020',
              fontWeight: 800,
              border: 'none',
              width: '100%',
              cursor: isFormValid() ? 'pointer' : 'not-allowed'
            }}>
            Save and Continue
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) { 
          div[style*='grid-template-columns'] {
            grid-template-columns: 1fr !important; 
          } 
        }
      `}</style>
    </div>
  );
};

export default StudentOnboarding;

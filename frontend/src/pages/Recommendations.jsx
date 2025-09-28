import React, { useState, useMemo, useEffect } from 'react';
import { aiMatchingEngine } from '../utils/aiMatching.js'; // removed companiesDatabase

// Badge Component
const Badge = ({ children, type = 'neutral', size = 'sm' }) => {
  const baseStyle = {
    fontSize: size === 'sm' ? '11px' : '12px',
    fontWeight: 600,
    padding: size === 'sm' ? '4px 8px' : '6px 12px',
    borderRadius: 999,
    display: 'inline-block',
    userSelect: 'none',
    transition: 'background-color 0.3s ease, color 0.3s ease'
  };

  const variants = {
    success: { backgroundColor: '#dcfce7', color: '#166534' },
    warning: { backgroundColor: '#fef3c7', color: '#92400e' },
    error: { backgroundColor: '#fee2e2', color: '#991b1b' },
    info: { backgroundColor: '#dbeafe', color: '#1e40af' },
    neutral: { backgroundColor: '#f3f4f6', color: '#374151' }
  };

  return <span style={{ ...baseStyle, ...variants[type] }}>{children}</span>;
};

// Loader Component (3 bouncing dots)
const Loader = () => {
  const dotStyle = {
    width: '8px',
    height: '8px',
    margin: '0 4px',
    backgroundColor: '#3b82f6',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'bounce 1.4s infinite ease-in-out both'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '16px', color: '#e2e8f0' }}>Analyzing your profile...</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span style={{ ...dotStyle, animationDelay: '0s' }}></span>
        <span style={{ ...dotStyle, animationDelay: '0.2s' }}></span>
        <span style={{ ...dotStyle, animationDelay: '0.4s' }}></span>
      </div>
      {/* Keyframes inside a <style> tag */}
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

// Company Card Component
const CompanyCard = ({ recommendation, studentProfile, onViewDetails }) => {
  const { company, role, match } = recommendation;
  const isPerfect = match.score >= 90;
  const isGood = match.score >= 60 && match.score < 90;

  return (
    <div
      style={{
        backgroundColor: isPerfect ? '#0f172a' : isGood ? '#1e293b' : '#334155',
        border: `1px solid ${isPerfect ? '#10b981' : isGood ? '#f59e0b' : '#6b7280'}`,
        borderRadius: 12,
        padding: 20,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
        cursor: 'pointer',
        boxShadow: '0 0 10px transparent'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.4)';
        e.currentTarget.style.backgroundColor = isPerfect ? '#065f46' : isGood ? '#78350f' : '#4b5563';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 0 10px transparent';
        e.currentTarget.style.backgroundColor = isPerfect ? '#0f172a' : isGood ? '#1e293b' : '#334155';
      }}
      onClick={() => onViewDetails(recommendation)}
      className='fade-in-anim'
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src={company.logo}
            alt={company.name}
            style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'contain', backgroundColor: 'white', padding: 4 }}
            onError={e => { e.target.style.display = 'none'; }}
          />
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: 18, fontWeight: 700 }}>{company.name}</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#94a3b8' }}>{role.title}</p>
          </div>
        </div>
        <Badge
          type={isPerfect ? 'success' : isGood ? 'warning' : 'error'}
          size='sm'
        >
          {match.score}% match
        </Badge>
      </div>

      {/* Info */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 12, color: '#cbd5e1' }}>
        <span>📍 {role.location || company.location}</span>
        <span>⏱️ {role.duration}</span>
        <span>💰 {role.stipend}</span>
      </div>

      {/* Skills */}
      {match.matchedSkills.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0', marginBottom: 6 }}>Your Skills Match:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {match.matchedSkills.slice(0, 5).map((skill, idx) => (
              <Badge key={idx} type="success" size="sm">{skill.original}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills */}
      {match.missingSkills.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#fbbf24', marginBottom: 6 }}>Skills to Learn:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {match.missingSkills.slice(0, 3).map((skill, idx) => (
              <Badge key={idx} type="warning" size="sm">{skill.original}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          style={{
            flex: 1, padding: '10px 16px', borderRadius: 8, border: 'none',
            background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', color: 'white',
            fontWeight: 600, cursor: 'pointer', fontSize: 14
          }}
          onClick={() => console.log("Applied:", company.name)}
        >
          Apply Now
        </button>
        <button
          style={{
            flex: 1, padding: '10px 16px', borderRadius: 8,
            border: '1px solid #475569', background: 'transparent',
            color: '#cbd5e1', fontWeight: 600, cursor: 'pointer', fontSize: 14
          }}
          onClick={() => alert(`Viewing details for ${company.name}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// Main Recommendations Component
const Recommendations = () => {
  const [studentProfile, setStudentProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('match');

  useEffect(() => {
    const savedProfile = sessionStorage.getItem('studentProfile');
    if (savedProfile) setStudentProfile(JSON.parse(savedProfile));
    else {
      setStudentProfile({
        fullName: "John Doe",
        email: "john@example.com",
        skills: ["React", "Node.js"],
        interests: ["Web Development"]
      });
    }
  }, []);

  useEffect(() => {
    if (!studentProfile) return;
    setLoading(true);

    // Fake delay for realism (5s)
    setTimeout(() => {
      const aiRecommendations = aiMatchingEngine.generateRecommendations(studentProfile, 20);
      setRecommendations(aiRecommendations);
      setLoading(false);
    }, 5000);
  }, [studentProfile]);

  const sorted = useMemo(() => {
    if (!recommendations) return [];
    let filtered = recommendations;
    if (filter === 'perfect') filtered = recommendations.filter(r => r.match.score >= 90);
    else if (filter === 'good') filtered = recommendations.filter(r => r.match.score >= 60 && r.match.score < 90);
    else if (filter === 'learning') filtered = recommendations.filter(r => r.match.score >= 30 && r.match.score < 60);

    return filtered.sort((a, b) => {
      if (sortBy === 'match') return b.match.score - a.match.score;
      if (sortBy === 'company') return a.company.name.localeCompare(b.company.name);
      if (sortBy === 'stipend') {
        const aNum = parseFloat(a.role.stipend.replace(/[^0-9.-]+/g, "") || 0);
        const bNum = parseFloat(b.role.stipend.replace(/[^0-9.-]+/g, "") || 0);
        return bNum - aNum;
      }
      return 0;
    });
  }, [recommendations, filter, sortBy]);
  if (loading || !studentProfile)
    return (
      <div style={{
        padding: 24,
        fontFamily: 'Inter, sans-serif',
        backgroundColor: '#0b0f1a',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', maxWidth: 500 }}>
          {/* AI Glowing Pulse */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              margin: '0 auto 20px',
              background: 'radial-gradient(circle, #3b82f6, #0ea5e9)',
              animation: 'pulseGlow 2s infinite',
            }}
          />
  
          {/* Typing AI Text */}
          <h2 style={{ fontSize: 22, marginBottom: 12 }}>
            <span className="typing-text">AI is analyzing your profile...</span>
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>
            Our intelligent matching engine is scanning thousands of opportunities
          </p>
  
          {/* Progress Stages */}
          <div style={{ textAlign: 'left', margin: '0 auto', maxWidth: 400 }}>
            {[
              'Analyzing Skills',
              'Matching with Companies',
              'Optimizing Recommendations',
            ].map((stage, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    fontSize: 14,
                    marginBottom: 4,
                    color: '#cbd5e1',
                  }}
                >
                  {stage}
                </div>
                <div
                  style={{
                    height: 8,
                    borderRadius: 4,
                    background: '#1e293b',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    className="loading-bar"
                    style={{
                      height: '100%',
                      width: '0%',
                      background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
                      animation: `loadBar ${3 + i}s ease forwards ${i * 1.5}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
  
          {/* Flowing Dots */}
          <div style={{ marginTop: 30 }}>
            <div className="flow-dots">
              {Array(12)
                .fill()
                .map((_, i) => (
                  <span key={i} className="dot" />
                ))}
            </div>
          </div>
  
          <Badge type="info" size="sm" style={{ marginTop: 24 }}>
            AI Powered
          </Badge>
        </div>
  
        <style>{`
          @keyframes pulseGlow {
            0% { box-shadow: 0 0 0px rgba(96,165,250, 0.4); transform: scale(0.95); }
            50% { box-shadow: 0 0 30px rgba(96,165,250, 0.7); transform: scale(1.05); }
            100% { box-shadow: 0 0 0px rgba(96,165,250, 0.4); transform: scale(0.95); }
          }
          @keyframes loadBar {
            from { width: 0%; }
            to { width: 100%; }
          }
          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }
          .typing-text {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid #60a5fa;
            animation: typing 3s steps(30, end) infinite alternate;
          }
          .flow-dots {
            display: flex;
            justify-content: center;
            gap: 6px;
          }
          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #60a5fa;
            opacity: 0.3;
            animation: blink 1.2s infinite;
          }
          .dot:nth-child(1) { animation-delay: 0s; }
          .dot:nth-child(2) { animation-delay: 0.1s; }
          .dot:nth-child(3) { animation-delay: 0.2s; }
          .dot:nth-child(4) { animation-delay: 0.3s; }
          .dot:nth-child(5) { animation-delay: 0.4s; }
          .dot:nth-child(6) { animation-delay: 0.5s; }
          .dot:nth-child(7) { animation-delay: 0.6s; }
          .dot:nth-child(8) { animation-delay: 0.7s; }
          .dot:nth-child(9) { animation-delay: 0.8s; }
          .dot:nth-child(10) { animation-delay: 0.9s; }
          .dot:nth-child(11) { animation-delay: 1s; }
          .dot:nth-child(12) { animation-delay: 1.1s; }
          @keyframes blink {
            0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
            40% { opacity: 1; transform: scale(1.2); }
          }
        `}</style>
      </div>
    );
  

  return (
    <div style={{
      padding: 24,
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#0b0f1a',
      color: 'white',
      minHeight: '100vh'
    }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: '0 0 8px 0' }}>
          AI-Powered Internship Recommendations
          <Badge type="info" size="sm" style={{ marginLeft: 12 }}>ML Powered</Badge>
        </h1>
      </header>

      {sorted.length === 0 ? (
        <p>No matches found. Update your profile.</p>
      ) : (
        <div style={{ display: 'grid', gap: 24 }}>
          {sorted.map(rec => (
            <CompanyCard key={rec.id} recommendation={rec} studentProfile={studentProfile} onViewDetails={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { aiMatchingEngine, companiesDatabase } from '../utils/aiMatching.js'

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=ffffff&size=120',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
    educationLevel: 'Undergraduate',
    location: 'Remote',
    interests: ['Web Development', 'Machine Learning', 'Cloud Computing']
  })
  
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)

  // Load user data from session storage or API
  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedProfile = sessionStorage.getItem('studentProfile')
        if (savedProfile) {
          const profileData = JSON.parse(savedProfile)
          setUser(prev => ({ ...prev, ...profileData }))
        }
      } catch (error) {
        console.error('Error loading user profile:', error)
      }
    }
    
    loadUserData()
  }, [])

  // Generate AI recommendations
  useEffect(() => {
    const generateRecommendations = () => {
      setLoading(true)
      try {
        const aiRecommendations = aiMatchingEngine.generateRecommendations(user, 8)
        setRecommendations(aiRecommendations)
      } catch (error) {
        console.error('Error generating recommendations:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user.skills && user.skills.length > 0) {
      generateRecommendations()
    }
  }, [user])

  const handleEditProfile = () => {
    navigate('/student/onboarding')
  }

  const handleCompanyClick = (companyId) => {
    navigate(`/companies?company=${companyId}`)
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      padding: '24px 16px'
    }}>
      {/* Main Container */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}>
        
        {/* Profile Card */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          textAlign: 'center'
        }}>
          {/* Avatar */}
          <img 
            src={user.avatar} 
            alt="Profile Avatar"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              margin: '0 auto 16px',
              border: '2px solid #f3f4f6'
            }}
          />
          
          {/* User Info */}
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 8px 0'
          }}>
            {user.name}
          </h1>
          
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            margin: '0 0 24px 0'
          }}>
            {user.email}
          </p>
          
          {/* Edit Button */}
          <button
            onClick={handleEditProfile}
            style={{
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#4f46e5'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6366f1'}
          >
            Edit Student Information
          </button>
        </div>

        {/* AI Recommendations Section */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '4px'
            }}>
              <span style={{
                backgroundColor: '#f3f4f6',
                color: '#374151',
                fontSize: '12px',
                fontWeight: '500',
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid #d1d5db'
              }}>
                AI Recommendations
              </span>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: '0'
            }}>
              Mentor Insight
            </p>
          </div>

          {/* AI Recommendations */}
          {loading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              color: '#6b7280'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid #e5e7eb',
                borderTop: '2px solid #6366f1',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginRight: '8px'
              }}></div>
              Analyzing your profile...
            </div>
          ) : recommendations.length > 0 ? (
            <>
              {/* Company Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '12px',
                marginBottom: '16px'
              }}>
                {recommendations.slice(0, 6).map((rec, index) => (
                  <div
                    key={rec.id}
                    onClick={() => handleCompanyClick(rec.company.id)}
                    style={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#f1f5f9'
                      e.target.style.borderColor = '#cbd5e1'
                      e.target.style.transform = 'translateY(-1px)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#f8fafc'
                      e.target.style.borderColor = '#e2e8f0'
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    {/* Match Score Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      backgroundColor: rec.match.score >= 80 ? '#dcfce7' : rec.match.score >= 60 ? '#fef3c7' : '#fee2e2',
                      color: rec.match.score >= 80 ? '#166534' : rec.match.score >= 60 ? '#92400e' : '#991b1b',
                      fontSize: '11px',
                      fontWeight: '600',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {rec.match.score}% match
                    </div>
                    
                    {/* Company Logo */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <img
                        src={rec.company.logo}
                        alt={rec.company.name}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          marginRight: '8px',
                          objectFit: 'contain'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                      <div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1f2937',
                          marginBottom: '2px'
                        }}>
                          {rec.company.name}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#6b7280'
                        }}>
                          {rec.role.title}
                        </div>
                      </div>
                    </div>
                    
                    {/* Matched Skills */}
                    {rec.match.matchedSkills.length > 0 && (
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px',
                        marginBottom: '8px'
                      }}>
                        {rec.match.matchedSkills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            style={{
                              backgroundColor: '#e0f2fe',
                              color: '#0369a1',
                              fontSize: '10px',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontWeight: '500'
                            }}
                          >
                            {skill.original}
                          </span>
                        ))}
                        {rec.match.matchedSkills.length > 3 && (
                          <span style={{
                            fontSize: '10px',
                            color: '#6b7280'
                          }}>
                            +{rec.match.matchedSkills.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Company Info */}
                    <div style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>{rec.company.industry}</span>
                      <span>{rec.role.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* View All Button */}
              <div style={{
                textAlign: 'center',
                marginBottom: '16px'
              }}>
                <button
                  onClick={() => navigate('/recommendations')}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#6366f1',
                    border: '1px solid #6366f1',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#6366f1'
                    e.target.style.color = 'white'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#6366f1'
                  }}
                >
                  View All Recommendations →
                </button>
              </div>
            </>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '20px',
              color: '#6b7280'
            }}>
              <p style={{ margin: '0 0 8px 0' }}>No recommendations available</p>
              <p style={{ fontSize: '12px', margin: '0' }}>
                Complete your profile to get personalized recommendations
              </p>
            </div>
          )}

          {/* Description */}
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.5',
            margin: '0'
          }}>
            {loading ? 'Our AI is analyzing your skills and preferences...' : 
             recommendations.length > 0 ? 
             'These companies match your skills and career goals. Click any card to explore opportunities.' :
             'Complete your profile with skills and preferences to get personalized recommendations.'}
          </p>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Profile

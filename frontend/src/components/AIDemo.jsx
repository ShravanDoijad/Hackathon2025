import React, { useState, useEffect } from 'react';
import { aiMatchingEngine } from '../utils/aiMatching.js';

// Demo component to showcase AI matching capabilities
const AIDemo = () => {
  const [demoProfiles] = useState([
    {
      name: 'Frontend Developer',
      skills: ['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript'],
      educationLevel: 'Undergraduate',
      location: 'Remote'
    },
    {
      name: 'Data Scientist',
      skills: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'SQL'],
      educationLevel: 'Graduate',
      location: 'San Francisco, CA'
    },
    {
      name: 'Full Stack Developer',
      skills: ['JavaScript', 'Node.js', 'React', 'PostgreSQL', 'AWS'],
      educationLevel: 'Undergraduate',
      location: 'Remote'
    },
    {
      name: 'Mobile Developer',
      skills: ['React Native', 'JavaScript', 'iOS', 'Android', 'Firebase'],
      educationLevel: 'Undergraduate',
      location: 'New York, NY'
    }
  ]);

  const [selectedProfile, setSelectedProfile] = useState(demoProfiles[0]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateRecommendations = async (profile) => {
    setLoading(true);
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      const recs = aiMatchingEngine.generateRecommendations(profile, 6);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateRecommendations(selectedProfile);
  }, [selectedProfile]);

  return (
    <div style={{
      padding: '24px',
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          AI Matching Demo
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          See how our AI matches different student profiles with companies
        </p>

        {/* Profile Selector */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#1f2937'
          }}>
            Select a Student Profile
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '12px'
          }}>
            {demoProfiles.map((profile, index) => (
              <button
                key={index}
                onClick={() => setSelectedProfile(profile)}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  border: selectedProfile.name === profile.name ? '2px solid #6366f1' : '1px solid #e5e7eb',
                  backgroundColor: selectedProfile.name === profile.name ? '#f0f9ff' : 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  {profile.name}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '8px'
                }}>
                  {profile.educationLevel} • {profile.location}
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '4px'
                }}>
                  {profile.skills.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '12px',
                        padding: '2px 6px',
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        borderRadius: '4px'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                  {profile.skills.length > 4 && (
                    <span style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      +{profile.skills.length - 4} more
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#1f2937'
          }}>
            AI Recommendations for {selectedProfile.name}
          </h2>

          {loading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '48px',
              color: '#6b7280'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                border: '3px solid #e5e7eb',
                borderTop: '3px solid #6366f1',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginRight: '12px'
              }}></div>
              AI is analyzing and matching...
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {recommendations.map((rec, index) => (
                <div
                  key={rec.id}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '16px',
                    backgroundColor: '#fafafa',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={rec.company.logo}
                        alt={rec.company.name}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          objectFit: 'contain',
                          backgroundColor: 'white',
                          padding: '2px'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          {rec.company.name}
                        </div>
                        <div style={{
                          fontSize: '14px',
                          color: '#6b7280'
                        }}>
                          {rec.role.title}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      backgroundColor: rec.match.score >= 80 ? '#dcfce7' : rec.match.score >= 60 ? '#fef3c7' : '#fee2e2',
                      color: rec.match.score >= 80 ? '#166534' : rec.match.score >= 60 ? '#92400e' : '#991b1b',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}>
                      {rec.match.score}% match
                    </div>
                  </div>

                  {/* Company Info */}
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '12px',
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    <span>📍 {rec.role.location || rec.company.location}</span>
                    <span>⏱️ {rec.role.duration}</span>
                    <span>💰 {rec.role.stipend}</span>
                  </div>

                  {/* Matched Skills */}
                  {rec.match.matchedSkills.length > 0 && (
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '6px'
                      }}>
                        Matched Skills:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {rec.match.matchedSkills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '10px',
                              padding: '2px 6px',
                              backgroundColor: '#dbeafe',
                              color: '#1e40af',
                              borderRadius: '4px'
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
                    </div>
                  )}

                  {/* Missing Skills */}
                  {rec.match.missingSkills.length > 0 && (
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#f59e0b',
                        marginBottom: '6px'
                      }}>
                        Skills to Learn:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {rec.match.missingSkills.slice(0, 2).map((skill, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '10px',
                              padding: '2px 6px',
                              backgroundColor: '#fef3c7',
                              color: '#92400e',
                              borderRadius: '4px'
                            }}
                          >
                            {skill.original}
                          </span>
                        ))}
                        {rec.match.missingSkills.length > 2 && (
                          <span style={{
                            fontSize: '10px',
                            color: '#6b7280'
                          }}>
                            +{rec.match.missingSkills.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Match Breakdown */}
                  <div style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    backgroundColor: '#f9fafb',
                    padding: '8px',
                    borderRadius: '4px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ marginBottom: '4px' }}>Match Breakdown:</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                      <span>Required Skills: {rec.match.breakdown.requiredSkills.toFixed(0)}%</span>
                      <span>Preferred Skills: {rec.match.breakdown.preferredSkills.toFixed(0)}%</span>
                      <span>Experience: {rec.match.breakdown.experience.toFixed(0)}%</span>
                      <span>Location: {rec.match.breakdown.location.toFixed(0)}%</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button style={{
                    width: '100%',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Features Showcase */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginTop: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#1f2937'
          }}>
            AI Matching Features
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            <div style={{
              padding: '16px',
              backgroundColor: '#f0f9ff',
              borderRadius: '8px',
              border: '1px solid #bae6fd'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1e40af',
                margin: '0 0 8px 0'
              }}>
                🧠 Intelligent Matching
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#1e40af',
                margin: 0
              }}>
                Advanced algorithms analyze skills, experience, and preferences to find the best matches.
              </p>
            </div>
            <div style={{
              padding: '16px',
              backgroundColor: '#f0fdf4',
              borderRadius: '8px',
              border: '1px solid #bbf7d0'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#166534',
                margin: '0 0 8px 0'
              }}>
                📊 Skill Gap Analysis
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#166534',
                margin: 0
              }}>
                Identifies missing skills and provides personalized learning recommendations.
              </p>
            </div>
            <div style={{
              padding: '16px',
              backgroundColor: '#fefce8',
              borderRadius: '8px',
              border: '1px solid #fde68a'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#92400e',
                margin: '0 0 8px 0'
              }}>
                🎯 Personalized Scoring
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#92400e',
                margin: 0
              }}>
                Multi-factor scoring considers skills, experience level, location, and company culture.
              </p>
            </div>
            <div style={{
              padding: '16px',
              backgroundColor: '#fdf2f8',
              borderRadius: '8px',
              border: '1px solid #f9a8d4'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#be185d',
                margin: '0 0 8px 0'
              }}>
                🚀 Real-time Updates
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#be185d',
                margin: 0
              }}>
                Recommendations update instantly as you add skills or change preferences.
              </p>
            </div>
          </div>
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
  );
};

export default AIDemo;

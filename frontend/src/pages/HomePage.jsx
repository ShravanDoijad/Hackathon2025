import React, { useMemo } from 'react';

// Simple placeholder auth state; replace with real auth from context/store later
const useAuth = () => {
  // toggle to false to simulate logged-out
  const isAuthenticated = false;
  const user = isAuthenticated ? { name: 'Aarav Sharma' } : null;
  return { isAuthenticated, user };
};

const metricsPlaceholder = {
  users: 12870,
  companies: 342,
  matches: 5842,
};

const featuredCompaniesPlaceholder = [
  {
    id: 'comp-1',
    name: 'TCS (Tata Consultancy Services)',
    logo: 'https://logos-world.net/wp-content/uploads/2021/08/TCS-Logo.png',
    roles: ['Full‑Stack Intern', 'Data Analyst Intern'],
    tags: ['IT Services', 'Global', 'Graduate Friendly'],
  },
  {
    id: 'comp-2',
    name: 'Infosys',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Infosys_logo.svg',
    roles: ['AI/ML Intern', 'UI/UX Intern'],
    tags: ['Consulting', 'Cloud', 'Design'],
  },
  {
    id: 'comp-3',
    name: 'Wipro',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Wipro_Primary_Logo_Color_RGB.svg',
    roles: ['Cybersecurity Intern', 'DevOps Intern'],
    tags: ['Enterprise', 'Security', 'Automation'],
  },
  {
    id: 'comp-4',
    name: 'Accenture',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Accenture.svg',
    roles: ['Strategy Intern', 'Data Engineering Intern'],
    tags: ['Consulting', 'Strategy', 'Analytics'],
  },
  {
    id: 'comp-5',
    name: 'MCA Partner Startup',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png',
    roles: ['Product Intern', 'Backend Intern'],
    tags: ['Startup', 'Impact', 'Fast‑paced'],
  },
  {
    id: 'comp-6',
    name: 'Deloitte',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Deloitte_Logo.png',
    roles: ['Risk Advisory Intern', 'Data Viz Intern'],
    tags: ['Advisory', 'Data', 'Finance'],
  },
];

const GradientText = ({ children }) => (
  <span style={{
    background: 'linear-gradient(90deg, #6EE7F9 0%, #A78BFA 40%, #F472B6 80%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  }}>{children}</span>
);

const Stat = ({ label, value, accent }) => (
  <div style={{
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: '18px 20px',
    backdropFilter: 'blur(6px)',
    minWidth: 160,
  }}>
    <div style={{ fontSize: 26, fontWeight: 800, color: accent }}>{value.toLocaleString()}</div>
    <div style={{ fontSize: 13, color: '#c7c7d3', marginTop: 4 }}>{label}</div>
  </div>
);

const CompanyCard = ({ company }) => (
  <div style={{
    position: 'relative',
    borderRadius: 18,
    padding: 18,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 10px 24px rgba(0,0,0,0.2)',
    transition: 'transform 200ms ease, box-shadow 200ms ease',
    cursor: 'pointer',
  }}
  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: '#0b1020',
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <img src={company.logo} alt={`${company.name} logo`} style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
      </div>
      <div>
        <div style={{ fontWeight: 700, color: 'white' }}>{company.name}</div>
        <div style={{ fontSize: 12, color: '#a8adc0', marginTop: 2 }}>{company.roles.join(' • ')}</div>
      </div>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
      {company.tags.map(tag => (
        <span key={tag} style={{
          fontSize: 11,
          color: '#cfd3e6',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '6px 10px',
          borderRadius: 999,
        }}>{tag}</span>
      ))}
    </div>
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      borderRadius: 18,
      padding: 1,
      background: 'linear-gradient(140deg, rgba(110,231,249,0.25), rgba(167,139,250,0.25), rgba(244,114,182,0.2))',
      WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      pointerEvents: 'none'
    }} />
  </div>
);

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  const greet = useMemo(() => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'radial-gradient(1000px 600px at 10% -20%, #1e2a6e 0%, #0b1020 50%), radial-gradient(900px 500px at 100% 0%, #321f63 0%, rgba(11,16,32,0.6) 50%)',
      color: 'white',
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    }}>
      {/* Top nav */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px clamp(16px, 6vw, 48px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg,#6EE7F9,#A78BFA)', display: 'grid', placeItems: 'center', fontWeight: 900, color: '#0b1020' }}>AI</div>
          <div>
            <div style={{ fontWeight: 800 }}>InternMatch</div>
            <div style={{ fontSize: 11, color: '#b8bdd3' }}>SIH25033 — Ministry of Corporate Affairs</div>
          </div>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {['Features','Companies','How it works','Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g,'-')}`} style={{ color: '#cfd3e6', textDecoration: 'none', fontSize: 14 }}>{item}</a>
          ))}
          {isAuthenticated ? (
            <button aria-label="Profile" title="Profile" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 14px', borderRadius: 999,
              background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.12)'
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#6EE7F9,#A78BFA)', display: 'inline-block'
              }} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>{greet}, {user?.name?.split(' ')[0]}</span>
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="/login" style={{ padding: '10px 14px', borderRadius: 999, color: '#cfd3e6', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.18)' }}>Log in</a>
              <a href="/signup" style={{ padding: '10px 14px', borderRadius: 999, background: 'linear-gradient(135deg,#6EE7F9,#A78BFA)', color: '#0b1020', textDecoration: 'none', fontWeight: 800 }}>Sign up</a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero */}
      <section id="hero" style={{
        padding: '10px clamp(16px, 6vw, 48px) 0',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: 28,
          alignItems: 'center',
        }}>
          <div style={{ padding: '0 clamp(16px, 6vw, 48px)' }}>
            <h1 style={{ fontSize: 'clamp(28px, 4.6vw, 56px)', lineHeight: 1.08, margin: 0 }}>
              AI‑Based <GradientText>Internship Recommendations</GradientText>
            </h1>
            <p style={{ marginTop: 14, color: '#cfd3e6', fontSize: 'clamp(14px, 1.5vw, 18px)' }}>
              Like Tinder for internships—swipe right on perfect matches. Students discover roles that fit their skills, and companies find vetted interns fast.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
              <a href="/student/onboarding" style={{ padding: '12px 18px', borderRadius: 12, background: 'linear-gradient(135deg,#6EE7F9,#A78BFA)', color: '#0b1020', fontWeight: 800, textDecoration: 'none' }}>Get started — I’m a Student</a>
              <a href="/company/post" style={{ padding: '12px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: 'white', textDecoration: 'none', fontWeight: 700 }}>Post an Internship</a>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
              <Stat label="Registered Students" value={metricsPlaceholder.users} accent="#6EE7F9" />
              <Stat label="Partner Companies" value={metricsPlaceholder.companies} accent="#A78BFA" />
              <Stat label="Successful Matches" value={metricsPlaceholder.matches} accent="#F472B6" />
            </div>
          </div>

          <div style={{ position: 'relative', paddingRight: 'clamp(16px, 6vw, 48px)' }}>
            <div style={{
              aspectRatio: '4/3',
              borderRadius: 20,
              overflow: 'hidden',
              background: 'radial-gradient(600px 300px at 20% 0%, rgba(110,231,249,0.25), transparent 60%), radial-gradient(600px 300px at 80% 100%, rgba(167,139,250,0.25), transparent 60%)',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'grid',
              placeItems: 'center'
            }}>
              <div style={{
                display: 'grid', gap: 12, gridTemplateColumns: 'repeat(2, minmax(0,1fr))', width: '86%',
              }}>
                {featuredCompaniesPlaceholder.slice(0,4).map(c => (
                  <CompanyCard key={c.id} company={c} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured companies */}
      <section id="companies" style={{ padding: '42px clamp(16px, 6vw, 48px)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0 }}>Top Listed Companies</h2>
          <a href="/companies" style={{ color: '#9aa1bf', textDecoration: 'none', fontSize: 14 }}>View all →</a>
        </div>
        <div style={{
          marginTop: 18,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
          gap: 16,
        }}>
          {featuredCompaniesPlaceholder.map(c => (
            <CompanyCard key={c.id} company={c} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding: '20px clamp(16px, 6vw, 48px) 56px' }}>
        <h2 style={{ margin: 0 }}>How it works</h2>
        <ol style={{
          marginTop: 12,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
          gap: 16,
          listStyle: 'none',
          counterReset: 'step'
        }}>
          {[
            'Students upload resume and skills',
            'Companies post internship requirements',
            'AI suggests best matches for both',
          ].map(step => (
            <li key={step} style={{
              position: 'relative',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              padding: 18,
            }}>
              <div style={{ fontWeight: 700 }}>{step}</div>
              <div style={{ fontSize: 13, color: '#a8adc0', marginTop: 6 }}>Our matching begins with clean inputs, then applies ranking and fit scores to present the top roles or candidates.</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '18px clamp(16px, 6vw, 48px) 42px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        color: '#a8adc0'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>© {new Date().getFullYear()} InternMatch • Built for SIH25033</div>
          <div style={{ display: 'flex', gap: 14 }}>
            <a href="/privacy" style={{ color: '#a8adc0', textDecoration: 'none' }}>Privacy</a>
            <a href="/terms" style={{ color: '#a8adc0', textDecoration: 'none' }}>Terms</a>
            <a href="mailto:contact@internmatch.ai" style={{ color: '#a8adc0', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>

      {/* Responsive tweaks */}
      <style>{`
        @media (max-width: 980px) {
          #hero > div { grid-template-columns: 1fr; }
          #companies > div:nth-child(2) { grid-template-columns: repeat(2, minmax(0,1fr)); }
          #how-it-works > ol { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          #companies > div:nth-child(2) { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;

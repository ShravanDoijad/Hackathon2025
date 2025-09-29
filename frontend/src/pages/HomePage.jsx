import React, { useMemo } from "react";

// Simple placeholder auth state; replace with real auth from context/store later
const useAuth = () => {
  const isAuthenticated = false;
  const user = isAuthenticated ? { name: "Aarav Sharma" } : null;
  return { isAuthenticated, user };
};

const metricsPlaceholder = {
  users: 12870,
  companies: 342,
  matches: 5842,
};

const featuredCompaniesPlaceholder = [
  {
    id: "comp-1",
    name: "TCS (Tata Consultancy Services)",
    logo: "https://logos-world.net/wp-content/uploads/2021/08/TCS-Logo.png",
    roles: ["FullStack Intern", "Data Analyst Intern"],
    tags: ["IT Services", "Global", "Graduate Friendly"],
  },
  {
    id: "comp-2",
    name: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/60/Infosys_logo.svg",
    roles: ["AI/ML Intern", "UI/UX Intern"],
    tags: ["Consulting", "Cloud", "Design"],
  },
  {
    id: "comp-3",
    name: "Wipro",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/79/Wipro_Primary_Logo_Color_RGB.svg",
    roles: ["Cybersecurity Intern", "DevOps Intern"],
    tags: ["Enterprise", "Security", "Automation"],
  },
  {
    id: "comp-4",
    name: "Accenture",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Accenture.svg",
    roles: ["Strategy Intern", "Data Engineering Intern"],
    tags: ["Consulting", "Strategy", "Analytics"],
  },
  {
    id: "comp-5",
    name: "MCA Partner Startup",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
    roles: ["Product Intern", "Backend Intern"],
    tags: ["Startup", "Impact", "Fastpaced"],
  },
  {
    id: "comp-6",
    name: "Deloitte",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/Deloitte_Logo.png",
    roles: ["Risk Advisory Intern", "Data Viz Intern"],
    tags: ["Advisory", "Data", "Finance"],
  },
];

// --- Matching data and helpers ---
const sampleCompaniesForMatching = [
  { id: "r1", name: "TCS", role: "FullStack Intern", requiredSkills: ["JavaScript", "React", "Node.js"], location: "Remote" },
  { id: "r2", name: "Infosys", role: "AI/ML Intern", requiredSkills: ["Python", "Pandas", "Machine Learning"], location: "Bengaluru" },
  { id: "r3", name: "Wipro", role: "DevOps Intern", requiredSkills: ["Linux", "Docker", "CI/CD"], location: "Hyderabad" },
  { id: "r4", name: "Accenture", role: "Data Analyst Intern", requiredSkills: ["SQL", "Excel", "Power BI"], location: "Gurugram" },
  { id: "r5", name: "MCA Startup", role: "Frontend Intern", requiredSkills: ["JavaScript", "React", "Tailwind"], location: "Pune" },
  { id: "r6", name: "Deloitte", role: "Data Viz Intern", requiredSkills: ["Power BI", "SQL", "Python"], location: "Mumbai" },
];

const pastStudents = [
  { id: "s1", name: "Ananya Verma", avatar: "https://i.pravatar.cc/80?img=5", skills: ["React", "Node.js"], company: "TCS", role: "FullStack Intern", year: 2024, email: "ananya@example.com" },
  { id: "s2", name: "Rohit Menon", avatar: "https://i.pravatar.cc/80?img=12", skills: ["Python", "Machine Learning"], company: "Infosys", role: "AI/ML Intern", year: 2023, email: "rohit@example.com" },
  { id: "s3", name: "Sara Khan", avatar: "https://i.pravatar.cc/80?img=32", skills: ["SQL", "Power BI"], company: "Accenture", role: "Data Analyst Intern", year: 2024, email: "sara@example.com" },
];

const getStudentProfile = () => {
  try {
    const raw = sessionStorage.getItem("studentProfile");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const matchScore = (studentSkills, requiredSkills) => {
  const have = new Set((studentSkills || []).map(s => s.toLowerCase()));
  const need = (requiredSkills || []).map(s => s.toLowerCase());
  const matched = need.filter(s => have.has(s));
  const missing = need.filter(s => !have.has(s));
  const score = need.length === 0 ? 0 : Math.round((matched.length / need.length) * 100);
  return { score, matched, missing };
};

// Design System Components
const Card = ({ children, style = {} }) => (
  <div style={{
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    ...style
  }}>
    {children}
  </div>
);

const PrimaryButton = ({ children, href, onClick, style = {} }) => {
  const ButtonContent = () => (
    <button style={{
      background: "#3b82f6",
      color: "#ffffff",
      border: "none",
      borderRadius: 8,
      padding: "12px 24px",
      fontSize: 16,
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
      ...style
    }} onClick={onClick}>
      {children}
    </button>
  );

  return href ? <a href={href} style={{ textDecoration: "none" }}><ButtonContent /></a> : <ButtonContent />;
};

const SecondaryButton = ({ children, href, onClick, style = {} }) => {
  const ButtonContent = () => (
    <button style={{
      background: "#f8fafc",
      color: "#111827",
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      padding: "12px 24px",
      fontSize: 16,
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
      ...style
    }} onClick={onClick}>
      {children}
    </button>
  );

  return href ? <a href={href} style={{ textDecoration: "none" }}><ButtonContent /></a> : <ButtonContent />;
};

const StatCard = ({ label, value, icon }) => (
  <Card style={{ textAlign: "center", padding: 20 }}>
    <div style={{ fontSize: 32, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{value.toLocaleString()}</div>
    <div style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>{label}</div>
    {icon && <div style={{ marginTop: 12, fontSize: 24 }}>{icon}</div>}
  </Card>
);

const CompanyCard = ({ company }) => (
  <Card>
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 8,
        background: "#f8fafc",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        border: "1px solid #e5e7eb"
      }}>
        <img src={company.logo} alt={`${company.name} logo`} style={{ width: "70%", height: "70%", objectFit: "contain" }} />
      </div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 600, color: "#111827", marginBottom: 4 }}>{company.name}</div>
        <div style={{ fontSize: 14, color: "#6b7280" }}>{company.roles.join("  ")}</div>
      </div>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {company.tags.map(tag => (
        <span key={tag} style={{
          fontSize: 12,
          color: "#6b7280",
          background: "#f8fafc",
          border: "1px solid #e5e7eb",
          padding: "4px 8px",
          borderRadius: 6,
          fontWeight: 500
        }}>{tag}</span>
      ))}
    </div>
  </Card>
);

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: { color: "#6b7280", bg: "#f8fafc", border: "#e5e7eb" },
    success: { color: "#ffffff", bg: "#10b981", border: "#10b981" },
    warning: { color: "#ffffff", bg: "#f59e0b", border: "#f59e0b" },
    ai: { color: "#ffffff", bg: "#8b5cf6", border: "#8b5cf6" }
  };
  const style = variants[variant];
  return (
    <span style={{
      fontSize: 12,
      padding: "4px 8px",
      borderRadius: 6,
      background: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontWeight: 500
    }}>{children}</span>
  );
};

const MatchCard = ({ item, studentSkills }) => {
  const { score, missing } = useMemo(() => matchScore(studentSkills, item.requiredSkills), [studentSkills, item.requiredSkills]);
  const isStrong = score >= 70 && missing.length <= 1;

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: "#111827" }}>{item.name}</div>
          <Badge variant="ai"> AI</Badge>
        </div>
        <Badge variant={isStrong ? "success" : "default"}>{score}% match</Badge>
      </div>
      <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 12 }}>{item.role}  {item.location}</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {item.requiredSkills.map(s => (
          <Badge key={s} variant={(studentSkills || []).map(x=>x.toLowerCase()).includes(s.toLowerCase()) ? "default" : "warning"}>
            {s}
          </Badge>
        ))}
      </div>
      {missing.length > 0 && (
        <div style={{ fontSize: 12, color: "#f59e0b", marginBottom: 12 }}>Missing: {missing.join(", ")}</div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <PrimaryButton style={{ padding: "8px 16px", fontSize: 14 }}>Apply</PrimaryButton>
        <SecondaryButton style={{ padding: "8px 16px", fontSize: 14 }}>Save</SecondaryButton>
      </div>
    </Card>
  );
};

const StudentCard = ({ s }) => (
  <Card>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <img src={s.avatar} alt={s.name} style={{ width: 40, height: 40, borderRadius: 8 }} />
      <div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>{s.name}</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>{s.role} @ {s.company}  {s.year}</div>
      </div>
    </div>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
      {s.skills.map(k => <Badge key={k}>{k}</Badge>)}
    </div>
    <a href={`mailto:${s.email}`} style={{ textDecoration: "none" }}>
      <SecondaryButton style={{ padding: "6px 12px", fontSize: 14, width: "100%" }}>Connect</SecondaryButton>
    </a>
  </Card>
);

const QuickAction = ({ label, value, href, icon, accent = "#3b82f6" }) => (
  <a href={href} style={{ textDecoration: "none" }}>
    <Card style={{ textAlign: "center", padding: 20 }}>
      <div style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: accent, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>{label}</div>
    </Card>
  </a>
);

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  const greet = useMemo(() => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  // Read saved profile skills
  const studentSkills = useMemo(() => {
    const p = getStudentProfile();
    return p?.skills || [];
  }, []);

  const sortedCompanies = useMemo(() => {
    return [...sampleCompaniesForMatching].sort((a, b) => {
      const sa = matchScore(studentSkills, a.requiredSkills).score;
      const sb = matchScore(studentSkills, b.requiredSkills).score;
      return sb - sa;
    });
  }, [studentSkills]);

  const exactMatches = sortedCompanies.filter(c => matchScore(studentSkills, c.requiredSkills).missing.length === 0);
  const nearMatches = sortedCompanies.filter(c => matchScore(studentSkills, c.requiredSkills).missing.length > 0);

  // Dashboard stats (placeholder)
  const applications = 6;
  const profileViews = 128;
  const matches = exactMatches.length;
  const recommended = sortedCompanies.length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#ffffff",
      color: "#111827",
      fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    }}>
      {/* Top nav */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 48px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ 
            width: 36, 
            height: 36, 
            borderRadius: 8, 
            background: "#3b82f6", 
            display: "grid", 
            placeItems: "center", 
            fontWeight: 700, 
            color: "#ffffff",
            fontSize: 16
          }}></div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>InternQuest</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Smart AI Internship Engine</div>
          </div>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {["Features","Companies","How it works","Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g,"-")}`} style={{ 
              color: "#6b7280", 
              textDecoration: "none", 
              fontSize: 16,
              fontWeight: 500
            }}>{item}</a>
          ))}
          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e5e7eb" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#3b82f6" }} />
              <span style={{ fontSize: 14, fontWeight: 500 }}>{greet}, {user?.name?.split(" ")[0]}</span>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 12 }}>
              <SecondaryButton href="/login">Log in</SecondaryButton>
              <PrimaryButton href="/signup">Sign up</PrimaryButton>
            </div>
          )}
        </nav>
      </header>

      {/* Hero */}
      <section style={{ padding: "60px 48px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h1 style={{ 
              fontSize: "48px", 
              fontWeight: 700, 
              lineHeight: 1.2, 
              margin: "0 0 24px 0",
              color: "#111827"
            }}>
              AI-Powered <span style={{ color: "#3b82f6" }}>Internship Matching</span>
            </h1>
            <p style={{ 
              fontSize: "20px", 
              color: "#6b7280", 
              maxWidth: 600, 
              margin: "0 auto 40px",
              lineHeight: 1.6
            }}>
              Find internships that fit your skills. See gaps. Grow faster with AI.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton href="/student/onboarding" style={{ padding: "16px 32px", fontSize: 18 }}>
                 Get Started
              </PrimaryButton>
              <SecondaryButton href="/recommendations" style={{ padding: "16px 32px", fontSize: 18 }}>
                 View Recommendations
              </SecondaryButton>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 60 }}>
            <StatCard label="Students Registered" value={metricsPlaceholder.users} icon="" />
            <StatCard label="Partner Companies" value={metricsPlaceholder.companies} icon="" />
            <StatCard label="Successful Matches" value={metricsPlaceholder.matches} icon="" />
          </div>

          {/* Featured Companies Preview */}
          <Card style={{ padding: 32 }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px 0" }}>Featured Companies</h2>
              <p style={{ color: "#6b7280", fontSize: 16 }}>Top companies actively hiring interns</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {featuredCompaniesPlaceholder.slice(0, 4).map(c => (
                <CompanyCard key={c.id} company={c} />
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Dashboard quick actions */}
      <section style={{ padding: "40px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 8px 0" }}>Your Dashboard</h2>
            <p style={{ color: "#6b7280", fontSize: 18 }}>Quick access to your internship journey</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            <QuickAction label="Applications" value={applications} href="/applications" icon="" accent="#3b82f6" />
            <QuickAction label="Profile Views" value={profileViews} href="/profile" icon="" accent="#8b5cf6" />
            <QuickAction label="Update Profile" value="Edit" href="/student/onboarding" icon="" accent="#10b981" />
            <QuickAction label="Matches" value={matches} href="#ai-suggestions" icon="" accent="#f59e0b" />
            <QuickAction label="Recommended" value={recommended} href="/recommendations" icon="" accent="#8b5cf6" />
          </div>
        </div>
      </section>

      {/* AI Suggestions */}
      <section style={{ padding: "40px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Card>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px 0" }}>
                   AI Recommendations {studentSkills.length ? `for ${studentSkills.join(", ")}` : ""}
                </h2>
                <p style={{ color: "#6b7280", fontSize: 16 }}>Personalized matches based on your skills and interests</p>
              </div>
              <a href="/student/onboarding" style={{ color: "#3b82f6", textDecoration: "none", fontSize: 16, fontWeight: 600 }}>Edit skills </a>
            </div>

            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 16px 0" }}>Perfect Matches</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 20 }}>
                {exactMatches.length === 0 && (
                  <div style={{ color: "#6b7280", fontSize: 16, textAlign: "center", padding: 40 }}>
                    No perfect matches yet. Complete your profile to see recommendations.
                  </div>
                )}
                {exactMatches.map(item => (
                  <MatchCard key={item.id} item={item} studentSkills={studentSkills} />
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 16px 0" }}>Near Matches</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 20 }}>
                {nearMatches.map(item => (
                  <MatchCard key={item.id} item={item} studentSkills={studentSkills} />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Alumni Success Stories */}
      <section style={{ padding: "40px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 8px 0" }}>Success Stories</h2>
            <p style={{ color: "#6b7280", fontSize: 18 }}>Students who found their perfect internship match</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {pastStudents.map(s => <StudentCard key={s.id} s={s} />)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "40px 48px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 8px 0" }}>How It Works</h2>
            <p style={{ color: "#6b7280", fontSize: 18 }}>Simple steps to your dream internship</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            {[
              { step: "1", title: "Complete Your Profile", desc: "Upload your resume, add skills, and tell us about your career interests.", icon: "" },
              { step: "2", title: "AI Analysis", desc: "Our AI analyzes your profile and matches you with relevant opportunities.", icon: "" },
              { step: "3", title: "Get Matched", desc: "Receive personalized recommendations and connect with companies.", icon: "" }
            ].map(item => (
              <Card key={item.step} style={{ textAlign: "center", padding: 32 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{item.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>{item.title}</div>
                <div style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.6 }}>{item.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "40px 48px",
        borderTop: "1px solid #e5e7eb",
        background: "#f8fafc"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 16, color: "#6b7280", marginBottom: 16 }}>
            {new Date().getFullYear()} InternQuest  Built for SIH25033
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            <a href="/privacy" style={{ color: "#6b7280", textDecoration: "none", fontSize: 14 }}>Privacy</a>
            <a href="/terms" style={{ color: "#6b7280", textDecoration: "none", fontSize: 14 }}>Terms</a>
            <a href="mailto:contact@internmatch.ai" style={{ color: "#6b7280", textDecoration: "none", fontSize: 14 }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

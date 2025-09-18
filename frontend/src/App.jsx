import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Authentication from './pages/Authentication.jsx'
import StudentOnboarding from './pages/StudentOnboarding.jsx'
import CompanyPost from './pages/CompanyPost.jsx'
import Companies from './pages/Companies.jsx'
import Profile from './pages/Profile.jsx'
import Recommendations from './pages/Recommendations.jsx'
import Features from './pages/Features.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="min-h-dvh bg-slate-950 text-white">
    <GoogleOAuthProvider clientId='568878391260-73fgedc9ek5v81r5kq1a9sirv8uf010s.apps.googleusercontent.com'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Authentication />} />
          <Route path="/signup" element={<Authentication />} />
          <Route path="/student/onboarding" element={<StudentOnboarding />} />
          <Route path="/company/post" element={<CompanyPost />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/features" element={<Features />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" toastOptions={{
        style: { background: '#0f172a', color: 'white', border: '1px solid #1e293b' }
      }} />
    </GoogleOAuthProvider>
  </div>
  )
}

export default App

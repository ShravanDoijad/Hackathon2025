import React, { useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const TabButton = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-4 py-2 rounded-full border font-semibold transition ${active ? 'bg-gradient-to-r from-cyan-300 to-violet-400 text-slate-900' : 'bg-white/10 border-white/20 text-white hover:bg-white/15'}`}>
        {children}
    </button>
)

const Authentication = () => {
    const [mode, setMode] = useState('login')
    const navigate = useNavigate()

    const onGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post('https://hackathon2025-wa91.onrender.com/api/auth/google/', { token: credentialResponse.credential })
            if (response.data.success) {
                toast.success('Login successful')
                navigate('/student/onboarding')
            } else {
                toast.error('Login failed')
            }
        } catch (e) {
            toast.error('Login failed')
        }
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()

        toast.success(`${mode === 'login' ? 'Login' : 'Signup'} successful`)
        navigate('/student/onboarding')
    }

    return (
        <div className="min-h-dvh bg-gradient-to-br from-indigo-950/60 to-slate-950 grid place-items-center p-4">
            <div className="w-full max-w-xl rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6">
                <h1 className="text-2xl font-extrabold">Welcome to InternMatch</h1>
                <div className="text-slate-300 mb-3">Log in or create your account</div>

                <div className="flex gap-2 mb-4">
                    <TabButton active={mode === 'login'} onClick={() => setMode('login')}>Log in</TabButton>
                    <TabButton active={mode === 'signup'} onClick={() => setMode('signup')}>Sign up</TabButton>
                </div>

                <div className="grid gap-3">
                    <GoogleOAuthProvider clientId='568878391260-73fgedc9ek5v81r5kq1a9sirv8uf010s.apps.googleusercontent.com'>
                        <div className="flex justify-center">
                            <GoogleLogin onSuccess={onGoogleSuccess} onError={() => toast.error('Login failed')} />
                        </div>
                    </GoogleOAuthProvider>

                    <form onSubmit={onFormSubmit} className="grid gap-2">
                        <input placeholder="Email" type="email" className="px-3 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-slate-400" />
                        <input placeholder="Password" type="password" className="px-3 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-slate-400" />
                        {mode === 'signup' && (
                            <input placeholder="Full name" type="text" className="px-3 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-slate-400" />
                        )}
                        <button className="px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-300 to-violet-400 text-slate-900 font-extrabold">{mode === 'login' ? 'Log in' : 'Sign up'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Authentication

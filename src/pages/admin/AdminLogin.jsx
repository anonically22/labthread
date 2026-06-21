import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { ADMIN_HASH } from '../../config/adminConfig';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  
  const attemptsRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer(prev => prev - 1);
      }, 1000);
    } else if (lockoutTimer === 0 && attemptsRef.current >= 3) {
      attemptsRef.current = 0; // reset after lockout ends
      setError(null);
    }
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (lockoutTimer > 0 || loading) return;

    setLoading(true);
    setError(null);

    // Artificial delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const isValid = password === 'LabThread2025!';
      
      if (isValid) {
        // Create session
        sessionStorage.setItem('labthread_admin_session', crypto.randomUUID());
        sessionStorage.setItem('labthread_admin_expiry', (Date.now() + 4 * 60 * 60 * 1000).toString());
        navigate('/admin', { replace: true });
      } else {
        attemptsRef.current += 1;
        const remaining = 3 - attemptsRef.current;
        
        if (remaining <= 0) {
          setLockoutTimer(60);
          setError('Too many attempts. Try again in 60s.');
        } else {
          setError(`Incorrect password. ${remaining} attempts remaining.`);
        }
      }
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex justify-center px-4">
      <div className="w-full max-w-[400px] mt-24">
        <div className="bg-white border border-[#E2E2DF] rounded-[16px] p-8 shadow-sm">
          <div className="text-center mb-8">
            <span className="inline-block bg-[#E1F5EE] text-[#0F6E56] font-sans font-medium text-[12px] px-3 py-1 rounded-full mb-3">
              Admin access
            </span>
            <h1 className="font-serif text-2xl font-bold text-foreground">LabThread</h1>
            <p className="font-sans text-[13px] text-muted mt-1">
              Enter your password to manage the site.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-sans text-[13px] font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={lockoutTimer > 0 || loading}
                  className="w-full border border-[#E2E2DF] rounded-lg pl-4 pr-10 py-2.5 font-sans text-[15px] focus:outline-none focus:border-[#0F6E56] focus:ring-1 focus:ring-[#0F6E56] disabled:opacity-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={lockoutTimer > 0 || loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground disabled:opacity-50"
                  tabIndex="-1"
                >
                  <i className={`ti ${showPassword ? 'ti-eye-off' : 'ti-eye'} text-[18px]`}></i>
                </button>
              </div>
            </div>

            {error && !lockoutTimer && (
              <div className="flex items-center gap-2 text-[#A32D2D]">
                <i className="ti ti-alert-circle text-[16px]"></i>
                <span className="font-sans text-[13px] font-medium">{error}</span>
              </div>
            )}

            {lockoutTimer > 0 && (
              <div className="flex items-center justify-center gap-2 text-[#A32D2D] bg-[#FDF3F3] border border-[#A32D2D]/20 py-2 rounded-lg">
                <span className="font-sans text-[13px] font-medium">
                  Too many attempts. Try again in {lockoutTimer}s.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={lockoutTimer > 0 || loading || !password}
              className="w-full bg-[#0F6E56] text-white font-sans font-medium text-[15px] rounded-lg h-[44px] flex items-center justify-center hover:bg-[#0c5946] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <i className="ti ti-loader-2 text-[18px] animate-spin"></i>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

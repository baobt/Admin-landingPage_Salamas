import { useState } from 'react';
import { Input } from './ui/input.jsx';
import { Button } from './ui/button.jsx';
import { Icon } from '@iconify/react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() && password.trim()) {
      onLoginSuccess?.();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">

      {/* CARD */}
      <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-xl border border-slate-100">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center text-white">
            <Icon icon="solar:shield-keyhole-linear" width="22" />
          </div>

          <h1 className="text-2xl font-bold mt-4 text-slate-800">
            Admin Login
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Sign in to manage your dashboard
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-slate-600">
              Email
            </label>

            <div className="relative mt-2">
              <Icon
                icon="solar:letter-linear"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                width="18"
              />

              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                className="pl-10 h-11 rounded-lg border-slate-200 focus:border-teal-500"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-slate-600">
              Password
            </label>

            <div className="relative mt-2">
              <Icon
                icon="solar:lock-password-linear"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                width="18"
              />

              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 pr-10 h-11 rounded-lg border-slate-200 focus:border-teal-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <Icon
                  icon={showPassword ? 'solar:eye-linear' : 'solar:eye-closed-linear'}
                  width="18"
                />
              </button>
            </div>
          </div>

          {/* OPTIONS */}
          <div className="flex justify-between text-xs text-slate-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" className="hover:text-teal-600">
              Forgot password?
            </a>
          </div>

          {/* BUTTON */}
          <Button className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium">
            Sign in
          </Button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 Admin Dashboard
        </p>

      </div>
    </div>
  );
}
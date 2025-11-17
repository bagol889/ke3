import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Router from 'next/router';
import ToggleRole from '../components/ToggleRole';
import Layout from '../components/Layout';

export default function Index() {
  const [mode, setMode] = useState('user');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      if (mode === 'user') {
        const emailEquivalent = `${phone}@phone.local`;
        const { data, error } = await supabase.auth.signInWithPassword({ email: emailEquivalent, password });
        if (error) throw error;
        Router.push('/dashboard/user');
      } else {
        const res = await fetch('/api/owner-login', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password })
        });
        const j = await res.json();
        if (j.success) Router.push('/dashboard/owner');
        else setMsg('Password owner salah');
      }
    } catch (err) {
      setMsg(err.message || JSON.stringify(err));
    } finally { setLoading(false); }
  }

  return (
    <Layout>
      <div className="max-w-md w-full bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="logo w-16 h-16 rounded-full flex items-center justify-center text-white font-bold">☎</div>
          <h1 className="text-2xl font-bold text-white mt-3">NOORIKO LOGIN</h1>
          <p className="text-slate-300 mt-1">Pilih tipe login dan masukkan kredensial Anda</p>
        </div>

        <ToggleRole mode={mode} setMode={setMode} />

        <form onSubmit={handleLogin} className="mt-4">
          {mode === 'user' ? (
            <>
              <label className="block text-sm text-slate-200 mt-3">Nomor HP</label>
              <input className="mt-1 w-full px-4 py-3 rounded-lg bg-white/5 text-white" placeholder="Contoh: 6281234567890" value={phone} onChange={e=>setPhone(e.target.value)} />

              <label className="block text-sm text-slate-200 mt-3">Password</label>
              <input className="mt-1 w-full px-4 py-3 rounded-lg bg-white/5 text-white" type="password" placeholder="Masukkan password" value={password} onChange={e=>setPassword(e.target.value)} />
            </>
          ) : (
            <>
              <label className="block text-sm text-slate-200 mt-3">Password Owner</label>
              <input className="mt-1 w-full px-4 py-3 rounded-lg bg-white/5 text-white" type="password" placeholder="Master password" value={password} onChange={e=>setPassword(e.target.value)} />
            </>
          )}

          <button className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'LOGIN'}
          </button>
        </form>

        {msg && <p className="text-red-400 text-sm mt-3">{msg}</p>}
        <p className="text-slate-400 text-xs text-center mt-4">Belum punya password atau lupa password? Hubungi admin.</p>
      </div>
    </Layout>
  );
}

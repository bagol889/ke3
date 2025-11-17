import { useEffect, useState } from 'react';
import Router from 'next/router';

export default function Owner() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(()=>{
    if (typeof document !== 'undefined'){
      if (!document.cookie.includes('owner=1')) Router.replace('/');
    }
  },[]);

  async function createUser(){
    const r = await fetch('/api/owner-create-user', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password })});
    const j = await r.json();
    if (j.success) setMsg('User dibuat: '+j.user.id);
    else setMsg('Error: '+(j.error||JSON.stringify(j)));
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Owner Dashboard</h2>
      <div className="bg-white/5 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Buat User Baru</h4>
        <div className="flex gap-2">
          <input className="px-3 py-2 rounded bg-white/5 text-white" placeholder="email (or phone@phone.local)" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="px-3 py-2 rounded bg-white/5 text-white" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="px-4 py-2 bg-indigo-600 rounded text-white" onClick={createUser}>Create</button>
        </div>
        <p className="mt-3 text-sm text-slate-300">{msg}</p>
      </div>
    </div>
  );
}

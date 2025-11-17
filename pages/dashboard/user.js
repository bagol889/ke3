import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Router from 'next/router';

export default function User() {
  const [user, setUser] = useState(null);
  const [key, setKey] = useState('');
  const [list, setList] = useState([]);

  useEffect(()=>{
    (async ()=>{
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return Router.replace('/');
      setUser(user);
      await loadKeys(user.id);
    })();
  },[]);

  async function loadKeys(uid){
    const { data, error } = await supabase.from('user_keys').select('*').eq('user_id', uid);
    setList(data || []);
  }

  async function addKey(){
    if (!key) return;
    const { error } = await supabase.from('user_keys').insert({ user_id: user.id, key_value: key });
    if (error) return alert(error.message);
    setKey('');
    await loadKeys(user.id);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <p className="mb-4">Hi {(user && user.email) || ''}</p>
      <div className="bg-white/5 p-4 rounded-lg">
        <div className="flex gap-2">
          <input className="px-3 py-2 rounded bg-white/5 text-white" value={key} onChange={e=>setKey(e.target.value)} placeholder="Masukkan key" />
          <button className="px-4 py-2 bg-indigo-600 rounded text-white" onClick={addKey}>Tambah</button>
        </div>
        <ul className="mt-4 space-y-2">
          {list.map(k=> <li key={k.id} className="bg-white/3 p-3 rounded">{k.key_value} <small className="text-xs text-slate-400"> — {new Date(k.created_at).toLocaleString()}</small></li>)}
        </ul>
      </div>
    </div>
  );
}

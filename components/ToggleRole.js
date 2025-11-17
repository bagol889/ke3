export default function ToggleRole({ mode, setMode }){
  return (
    <div className="flex bg-slate-100/40 p-1 rounded-lg" role="tablist" aria-label="Login type">
      <button className={`flex-1 py-2 rounded-md font-semibold ${mode==='user' ? 'bg-white shadow' : ''}`} onClick={() => setMode('user')}>👤 USER</button>
      <button className={`flex-1 py-2 rounded-md font-semibold ${mode==='owner' ? 'bg-white shadow' : ''}`} onClick={() => setMode('owner')}>👑 OWNER</button>
    </div>
  );
}

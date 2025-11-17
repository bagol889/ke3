export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      {children}
    </div>
  );
}

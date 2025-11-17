import { supabaseAdmin } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });
  const cookies = req.headers.cookie || '';
  if (!cookies.includes('owner=1')) return res.status(401).json({ error: 'unauthorized' });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email & password required' });

  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });
    if (error) return res.status(500).json({ error: error.message });

    await supabaseAdmin.from('users').insert({ id: data.user.id, email, role: 'user' });
    return res.json({ success: true, user: data.user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

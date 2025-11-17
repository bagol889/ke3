import { supabase } from '../../lib/supabaseClient';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });
  const { password } = req.body;
  if (!password) return res.json({ success: false });

  try {
    const { data, error } = await supabase.from('owner_config').select('master_pass').eq('id', 1).single();
    if (error) return res.status(500).json({ success: false, error: error.message });

    const stored = data.master_pass || '';
    if (stored.startsWith('$2')) {
      const ok = bcrypt.compareSync(password, stored);
      if (!ok) return res.json({ success: false });
    } else {
      if (password !== stored) return res.json({ success: false });
    }

    // set simple cookie to mark session (HttpOnly)
    res.setHeader('Set-Cookie', `owner=1; Path=/; HttpOnly; Max-Age=${60*60*24}`);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

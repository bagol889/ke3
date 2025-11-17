import { supabaseAdmin } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });
  const cookies = req.headers.cookie || '';
  if (!cookies.includes('owner=1')) return res.status(401).json({ error: 'unauthorized' });
  const { user_id, key_value } = req.body;
  if (!user_id || !key_value) return res.status(400).json({ error: 'user_id & key_value required' });
  try {
    const { data, error } = await supabaseAdmin.from('user_keys').insert({ user_id, key_value });
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

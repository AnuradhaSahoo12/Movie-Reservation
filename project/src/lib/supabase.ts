import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'your-project-url' || 
    supabaseAnonKey === 'your-anon-key') {
  throw new Error(
    'Invalid or missing Supabase credentials. Please click the "Connect to Supabase" button in the top right corner to set up your project.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
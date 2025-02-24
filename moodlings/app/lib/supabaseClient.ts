// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://mdawyaadviicjyzydcgh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kYXd5YWFkdmlpY2p5enlkY2doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0Mjc1MzUsImV4cCI6MjA1NjAwMzUzNX0.7IUrFf7-jH7I9Xhr0rsWd2NCKHROaqWqTVcApOFyjWk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});



// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nhxflvmeuayuovqcafgx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oeGZsdm1ldWF5dW92cWNhZmd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczOTc3MzUsImV4cCI6MjA2Mjk3MzczNX0.jbazgPVCxFV8v3PQMN_lbuXxPiZE_lpgEiCijG486vI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
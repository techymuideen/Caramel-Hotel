import { createClient } from "@supabase/supabase-js";
export const supabaseUrl: string = "https://oqvmfooryylprxssgikf.supabase.co";
const supabaseKey: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xdm1mb29yeXlscHJ4c3NnaWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyODE1NzcsImV4cCI6MjAzNDg1NzU3N30.vs3_P_kXqPefDd4a-nnPTsMqm5hfvdq8nL-s42ZNPPg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

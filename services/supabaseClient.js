(function bootstrapSupabaseClient(globalScope) {
  const SUPABASE_URL = "https://qythmpzrtotvmakomydm.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_NpvAv2JSF9OMoggyjynqkw_RoktkWIp";

  if (!globalScope.supabase || typeof globalScope.supabase.createClient !== "function") {
    console.error("SDK do Supabase nao carregado. Verifique o script CDN.");
    return;
  }

  const client = globalScope.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  globalScope.CaveirinhaSupabase = {
    client,
    SUPABASE_URL
  };
})(window);

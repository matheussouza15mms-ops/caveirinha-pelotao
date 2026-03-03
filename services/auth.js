(function bootstrapAuthService(globalScope) {
  function getClient() {
    const client = globalScope.CaveirinhaSupabase?.client;
    if (!client) {
      throw new Error("Cliente Supabase nao inicializado");
    }
    return client;
  }

  function mapAuthResult(session) {
    if (!session?.user) {
      return null;
    }
    return {
      user: {
        id: session.user.id,
        email: session.user.email || "",
        nome: session.user.user_metadata?.nome || session.user.email || ""
      },
      session
    };
  }

  async function login(payload) {
    const email = String(payload?.email || "").trim().toLowerCase();
    const password = String(payload?.password || "");

    try {
      const { data, error } = await getClient().auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        throw error;
      }
      return mapAuthResult(data.session);
    } catch (error) {
      console.error("Erro no Supabase Auth login:", error);
      throw error;
    }
  }

  async function logout() {
    try {
      const { error } = await getClient().auth.signOut();
      if (error) {
        throw error;
      }
      return { ok: true };
    } catch (error) {
      console.error("Erro no Supabase Auth logout:", error);
      throw error;
    }
  }

  async function getSession() {
    try {
      const { data, error } = await getClient().auth.getSession();
      if (error) {
        throw error;
      }
      return mapAuthResult(data.session);
    } catch (error) {
      console.error("Erro ao obter sessao Supabase:", error);
      throw error;
    }
  }

  function onAuthStateChange(callback) {
    const safeCallback = typeof callback === "function" ? callback : () => {};
    return getClient().auth.onAuthStateChange((event, session) => {
      safeCallback(mapAuthResult(session), event);
    });
  }

  globalScope.CaveirinhaAuth = {
    login,
    logout,
    getSession,
    onAuthStateChange
  };
})(window);

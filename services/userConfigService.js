(function bootstrapUserConfigService(globalScope) {
  const TABLE_NAME = "usuario_config";
  const USER_CONFIG_SELECT = [
    "user_id",
    "nome_usuario",
    "imagem_cabecalho",
    "tema",
    "pelotao",
    "nome_pelotao",
    "nivel_acesso",
    "ativo"
  ].join(",");

  function getClient() {
    const client = globalScope.CaveirinhaSupabase?.client;
    if (!client) {
      throw new Error("Cliente Supabase nao inicializado");
    }
    return client;
  }

  function mapConfigRow(row) {
    if (!row) {
      return null;
    }
    return {
      userId: row.user_id,
      nomeUsuario: row.nome_usuario || "",
      imagemCabecalho: row.imagem_cabecalho || "",
      tema: row.tema || "padrao",
      pelotao: row.pelotao || "",
      nomePelotao: row.nome_pelotao || "",
      nivelAcesso: row.nivel_acesso || "operador",
      ativo: Boolean(row.ativo)
    };
  }

  async function getCurrentUserConfig() {
    try {
      const {
        data: { user },
        error: userError
      } = await getClient().auth.getUser();
      if (userError) {
        throw userError;
      }
      if (!user?.id) {
        return null;
      }

      const { data, error } = await getClient()
        .from(TABLE_NAME)
        .select(USER_CONFIG_SELECT)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return mapConfigRow(data);
    } catch (error) {
      console.error("Erro ao carregar usuario_config:", error);
      throw error;
    }
  }

  globalScope.CaveirinhaUserConfigService = {
    getCurrentUserConfig
  };
})(window);

(function bootstrapPunicoesService(globalScope) {
  const TABLE_NAME = "punicoes";
  const PUNICOES_SELECT = "id_punicao,id,fato,punicao,dias,data_inicio,data_fim,created_at,updated_at";

  function getClient() {
    const client = globalScope.CaveirinhaSupabase?.client;
    if (!client) {
      throw new Error("Cliente Supabase nao inicializado");
    }
    return client;
  }

  function mapRow(row) {
    return {
      id: row.id_punicao,
      idMilitar: row.id,
      fato: row.fato || row.enquadramento || "",
      punicao: row.punicao || row.tipo || "ADV",
      dias: Number(row.dias || 0),
      dataInicio: row.data_inicio || "",
      dataFim: row.data_fim || "",
      lastUpdate: row.updated_at || row.created_at || ""
    };
  }

  function toRow(payload, options = {}) {
    const partial = Boolean(options.partial);
    const source = payload || {};
    const row = {};

    if (!partial || source.id !== undefined) row.id_punicao = source.id;
    if (!partial || source.idMilitar !== undefined) row.id = source.idMilitar;
    if (!partial || source.fato !== undefined) row.fato = source.fato;
    if (!partial || source.punicao !== undefined) row.punicao = source.punicao;
    if (!partial || source.dias !== undefined) row.dias = Number(source.dias || 0);
    if (!partial || source.dataInicio !== undefined) row.data_inicio = source.dataInicio;
    if (!partial || source.dataFim !== undefined) row.data_fim = source.dataFim;

    Object.keys(row).forEach((key) => {
      if (row[key] === undefined) {
        delete row[key];
      }
    });

    return row;
  }

  async function getPunicoes() {
    try {
      const { data, error } = await getClient()
        .from(TABLE_NAME)
        .select(PUNICOES_SELECT)
        .order("data_inicio", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (data || []).map(mapRow);
    } catch (error) {
      console.error("Erro ao carregar punicoes no Supabase:", error);
      throw error;
    }
  }

  async function createPunicao(payload) {
    try {
      const row = toRow(payload, { partial: false });
      if (!row.id_punicao) {
        row.id_punicao = `pun-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      }

      const { data, error } = await getClient().from(TABLE_NAME).insert(row).select(PUNICOES_SELECT).single();
      if (error) {
        throw error;
      }

      return mapRow(data);
    } catch (error) {
      console.error("Erro ao criar punicao no Supabase:", error);
      throw error;
    }
  }

  async function updatePunicao(payload) {
    const id = String(payload?.id || "").trim();
    if (!id) {
      throw new Error("Payload de punicao invalido: id obrigatorio");
    }

    try {
      const row = toRow(payload, { partial: true });
      delete row.id_punicao;

      const { data, error } = await getClient()
        .from(TABLE_NAME)
        .update(row)
        .eq("id_punicao", id)
        .select(PUNICOES_SELECT)
        .single();

      if (error) {
        throw error;
      }

      return mapRow(data);
    } catch (error) {
      console.error("Erro ao atualizar punicao no Supabase:", error);
      throw error;
    }
  }

  async function deletePunicao(id) {
    const safeId = String(id || "").trim();
    if (!safeId) {
      throw new Error("ID de punicao obrigatorio para exclusao");
    }

    try {
      const { error } = await getClient().from(TABLE_NAME).delete().eq("id_punicao", safeId);
      if (error) {
        throw error;
      }
      return { ok: true };
    } catch (error) {
      console.error("Erro ao excluir punicao no Supabase:", error);
      throw error;
    }
  }

  globalScope.CaveirinhaPunicoesService = {
    getPunicoes,
    createPunicao,
    updatePunicao,
    deletePunicao
  };
})(window);


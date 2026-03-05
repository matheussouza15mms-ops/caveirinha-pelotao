(function bootstrapHistoricoObsService(globalScope) {
  const TABLE_NAME = "historico_obs";

  function getClient() {
    const client = globalScope.CaveirinhaSupabase?.client;
    if (!client) {
      throw new Error("Cliente Supabase nao inicializado");
    }
    return client;
  }

  function mapRow(row) {
    return {
      id: row.id_historico,
      idMilitar: row.id,
      texto: row.texto || "",
      autor: row.autor || "",
      data: row.data || "",
      lastUpdate: row.updated_at || row.created_at || ""
    };
  }

  function toRow(payload, options = {}) {
    const partial = Boolean(options.partial);
    const source = payload || {};
    const row = {};

    if (!partial || source.id !== undefined) row.id_historico = source.id;
    if (!partial || source.idMilitar !== undefined) row.id = source.idMilitar;
    if (!partial || source.texto !== undefined) row.texto = source.texto;
    if (!partial || source.autor !== undefined) row.autor = source.autor;
    if (!partial || source.data !== undefined) row.data = source.data;

    Object.keys(row).forEach((key) => {
      if (row[key] === undefined) {
        delete row[key];
      }
    });

    return row;
  }

  async function getHistoricoObs(idMilitar) {
    try {
      let query = getClient()
        .from(TABLE_NAME)
        .select("id_historico,id,texto,autor,data,created_at,updated_at")
        .order("data", { ascending: false })
        .order("created_at", { ascending: false });

      const idFiltro = String(idMilitar || "").trim();
      if (idFiltro) {
        query = query.eq("id", idFiltro);
      }

      const { data, error } = await query;
      if (error) {
        throw error;
      }

      return (data || []).map(mapRow);
    } catch (error) {
      console.error("Erro ao carregar historico/obs no Supabase:", error);
      throw error;
    }
  }

  async function createHistoricoObs(payload) {
    try {
      const row = toRow(payload, { partial: false });
      if (!row.id_historico) {
        row.id_historico = `hist-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      }

      const { data, error } = await getClient().from(TABLE_NAME).insert(row).select("*").single();
      if (error) {
        throw error;
      }

      return mapRow(data);
    } catch (error) {
      console.error("Erro ao criar historico/obs no Supabase:", error);
      throw error;
    }
  }

  async function updateHistoricoObs(payload) {
    const id = String(payload?.id || "").trim();
    if (!id) {
      throw new Error("Payload de historico/obs invalido: id obrigatorio");
    }

    try {
      const row = toRow(payload, { partial: true });
      delete row.id_historico;

      const { data, error } = await getClient()
        .from(TABLE_NAME)
        .update(row)
        .eq("id_historico", id)
        .select("*")
        .single();

      if (error) {
        throw error;
      }

      return mapRow(data);
    } catch (error) {
      console.error("Erro ao atualizar historico/obs no Supabase:", error);
      throw error;
    }
  }

  async function deleteHistoricoObs(id) {
    const safeId = String(id || "").trim();
    if (!safeId) {
      throw new Error("ID de historico/obs obrigatorio para exclusao");
    }

    try {
      const { error } = await getClient().from(TABLE_NAME).delete().eq("id_historico", safeId);
      if (error) {
        throw error;
      }
      return { ok: true };
    } catch (error) {
      console.error("Erro ao excluir historico/obs no Supabase:", error);
      throw error;
    }
  }

  globalScope.CaveirinhaHistoricoObsService = {
    getHistoricoObs,
    createHistoricoObs,
    updateHistoricoObs,
    deleteHistoricoObs
  };
})(window);


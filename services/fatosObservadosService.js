(function bootstrapFatosObservadosService(globalScope) {
  const TABLE_NAME = "fatos_observados";
  const FO_SELECT = "id_fo,id,data,tipo,descricao,autor,created_at,updated_at";

  function getClient() {
    const client = globalScope.CaveirinhaSupabase?.client;
    if (!client) {
      throw new Error("Cliente Supabase nao inicializado");
    }
    return client;
  }

  function mapRowToFo(row) {
    return {
      id: row.id_fo,
      idMilitar: row.id,
      data: row.data || "",
      tipo: row.tipo || "",
      descricao: row.descricao || "",
      autor: row.autor || "",
      lastUpdate: row.updated_at || row.created_at || ""
    };
  }

  function mapPayloadToRow(payload, options = {}) {
    const partial = Boolean(options.partial);
    const source = payload || {};
    const row = {};

    if (!partial || source.id !== undefined) row.id_fo = source.id;
    if (!partial || source.idMilitar !== undefined) row.id = source.idMilitar;
    if (!partial || source.data !== undefined) row.data = source.data;
    if (!partial || source.tipo !== undefined) row.tipo = source.tipo;
    if (!partial || source.descricao !== undefined) row.descricao = source.descricao;
    if (!partial || source.autor !== undefined) row.autor = source.autor;

    Object.keys(row).forEach((key) => {
      if (row[key] === undefined) {
        delete row[key];
      }
    });

    return row;
  }

  async function getFO(idMilitar) {
    try {
      let query = getClient()
        .from(TABLE_NAME)
        .select(FO_SELECT)
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

      return (data || []).map(mapRowToFo);
    } catch (error) {
      console.error("Erro ao carregar fatos observados no Supabase:", error);
      throw error;
    }
  }

  async function createFO(payload) {
    try {
      const row = mapPayloadToRow(payload, { partial: false });
      if (!row.id_fo) {
        row.id_fo = `fo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      }

      const { data, error } = await getClient().from(TABLE_NAME).insert(row).select(FO_SELECT).single();
      if (error) {
        throw error;
      }

      return mapRowToFo(data);
    } catch (error) {
      console.error("Erro ao criar fato observado no Supabase:", error);
      throw error;
    }
  }

  async function updateFO(payload) {
    const id = String(payload?.id || "").trim();
    if (!id) {
      throw new Error("Payload de FO invalido: id obrigatorio");
    }

    try {
      const row = mapPayloadToRow(payload, { partial: true });
      delete row.id_fo;

      const { data, error } = await getClient()
        .from(TABLE_NAME)
        .update(row)
        .eq("id_fo", id)
        .select(FO_SELECT)
        .single();

      if (error) {
        throw error;
      }

      return mapRowToFo(data);
    } catch (error) {
      console.error("Erro ao atualizar fato observado no Supabase:", error);
      throw error;
    }
  }

  async function deleteFO(id) {
    const safeId = String(id || "").trim();
    if (!safeId) {
      throw new Error("ID de FO obrigatorio para exclusao");
    }

    try {
      const { error } = await getClient().from(TABLE_NAME).delete().eq("id_fo", safeId);
      if (error) {
        throw error;
      }
      return { ok: true };
    } catch (error) {
      console.error("Erro ao excluir fato observado no Supabase:", error);
      throw error;
    }
  }

  globalScope.CaveirinhaFatosObservadosService = {
    getFO,
    createFO,
    updateFO,
    deleteFO
  };
})(window);

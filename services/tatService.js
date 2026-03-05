(function bootstrapTatService(globalScope) {
  const TABLE_NAME = "tat";

  function getClient() {
    const client = globalScope.CaveirinhaSupabase?.client;
    if (!client) {
      throw new Error("Cliente Supabase nao inicializado");
    }
    return client;
  }

  function mencaoNormalizada(valor) {
    const upper = String(valor || "")
      .trim()
      .toUpperCase();
    const legacyMap = {
      A: "MB",
      B: "B",
      C: "R",
      D: "I",
      F: "I"
    };
    const mapped = legacyMap[upper] || upper;
    return ["I", "R", "B", "MB", "E"].includes(mapped) ? mapped : "B";
  }

  function mapRow(row) {
    const mencao = mencaoNormalizada(row.mencao || row.classificacao || row.resultado);
    return {
      id: row.id_tat,
      idMilitar: row.id,
      data: row.data || "",
      armamento: row.armamento || "",
      pontuacao: row.pontuacao === null || row.pontuacao === undefined ? "" : row.pontuacao,
      mencao,
      classificacao: mencao,
      lastUpdate: row.updated_at || row.created_at || ""
    };
  }

  function toRow(payload, options = {}) {
    const partial = Boolean(options.partial);
    const source = payload || {};
    const row = {};
    const mencao = mencaoNormalizada(source.mencao || source.classificacao || source.resultado);

    if (!partial || source.id !== undefined) row.id_tat = source.id;
    if (!partial || source.idMilitar !== undefined) row.id = source.idMilitar;
    if (!partial || source.data !== undefined) row.data = source.data;
    if (!partial || source.armamento !== undefined) row.armamento = source.armamento;
    if (!partial || source.pontuacao !== undefined) row.pontuacao = source.pontuacao;
    if (!partial || source.mencao !== undefined || source.classificacao !== undefined || source.resultado !== undefined) {
      row.mencao = mencao;
      row.classificacao = mencao;
    }

    Object.keys(row).forEach((key) => {
      if (row[key] === undefined) {
        delete row[key];
      }
    });

    return row;
  }

  async function getTAT() {
    try {
      const { data, error } = await getClient()
        .from(TABLE_NAME)
        .select("id_tat,id,data,armamento,pontuacao,mencao,classificacao,created_at,updated_at")
        .order("data", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (data || []).map(mapRow);
    } catch (error) {
      console.error("Erro ao carregar TAT no Supabase:", error);
      throw error;
    }
  }

  async function createTAT(payload) {
    try {
      const row = toRow(payload, { partial: false });
      if (!row.id_tat) {
        row.id_tat = `tat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      }

      const { data, error } = await getClient().from(TABLE_NAME).insert(row).select("*").single();
      if (error) {
        throw error;
      }

      return mapRow(data);
    } catch (error) {
      console.error("Erro ao criar TAT no Supabase:", error);
      throw error;
    }
  }

  async function updateTAT(payload) {
    const id = String(payload?.id || "").trim();
    if (!id) {
      throw new Error("Payload de TAT invalido: id obrigatorio");
    }

    try {
      const row = toRow(payload, { partial: true });
      delete row.id_tat;

      const { data, error } = await getClient()
        .from(TABLE_NAME)
        .update(row)
        .eq("id_tat", id)
        .select("*")
        .single();

      if (error) {
        throw error;
      }

      return mapRow(data);
    } catch (error) {
      console.error("Erro ao atualizar TAT no Supabase:", error);
      throw error;
    }
  }

  globalScope.CaveirinhaTatService = {
    getTAT,
    createTAT,
    updateTAT
  };
})(window);


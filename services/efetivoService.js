(function bootstrapEfetivoService(globalScope) {
  const TABLE_NAME = "efetivo";

  function getClient() {
    const client = globalScope.CaveirinhaSupabase?.client;
    if (!client) {
      throw new Error("Cliente Supabase nao inicializado");
    }
    return client;
  }

  function dataReferenciaFromIso(isoDateTime) {
    const match = /^(\d{4}-\d{2}-\d{2})/.exec(String(isoDateTime || ""));
    if (match) {
      return match[1];
    }
    return new Date().toISOString().slice(0, 10);
  }

  function mapRow(row) {
    const dataRef = String(row.data_referencia || "");
    const situacao = normalizarSituacao(row.situacao);
    const emForma = Boolean(row.em_forma) || situacao === "em_forma";
    return {
      idMilitar: row.id,
      emForma,
      situacao: emForma ? "em_forma" : situacao,
      dataAtualizacao: dataRef ? `${dataRef}T00:00:00.000Z` : ""
    };
  }

  function hojeIsoDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function normalizarSituacao(valor) {
    const normalized = String(valor || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (!normalized) return "";
    if (normalized === "em_forma") return "em_forma";
    if (normalized === "ferias") return "ferias";
    if (normalized === "dispensado") return "dispensado";
    if (normalized === "missao") return "missao";
    if (normalized === "servico") return "servico";
    if (normalized === "s sv" || normalized === "s_sv" || normalized === "servico; s sv") return "s_sv";
    if (normalized === "atrasado") return "atrasado";
    if (normalized === "outro" || normalized === "outros") return "outros";
    if (normalized === "falta") return "falta";
    if (normalized === "baixado") return "baixado";
    return "";
  }

  async function getEfetivo(dataReferencia) {
    try {
      let dataRef = String(dataReferencia || "").trim();
      if (!dataRef) {
        dataRef = hojeIsoDate();
      }

      const { data, error } = await getClient()
        .from(TABLE_NAME)
        .select("id,data_referencia,em_forma,situacao")
        .eq("data_referencia", dataRef);

      if (error) {
        throw error;
      }

      return (data || []).map(mapRow);
    } catch (error) {
      console.error("Erro ao carregar efetivo no Supabase:", error);
      throw error;
    }
  }

  async function updateEfetivo(payload) {
    const idMilitar = String(payload?.idMilitar || "").trim();
    if (!idMilitar) {
      throw new Error("Payload de efetivo invalido: idMilitar obrigatorio");
    }

    const dataReferencia = dataReferenciaFromIso(payload?.dataAtualizacao);
    const emForma = Boolean(payload?.emForma);
    const situacao = emForma ? "em_forma" : normalizarSituacao(payload?.situacao);
    const idEfetivo = `ef-${idMilitar}-${dataReferencia}`;

    const row = {
      id_efetivo: idEfetivo,
      id: idMilitar,
      data_referencia: dataReferencia,
      em_forma: emForma,
      situacao
    };

    try {
      const { data, error } = await getClient()
        .from(TABLE_NAME)
        .upsert(row, { onConflict: "id,data_referencia" })
        .select("id,data_referencia,em_forma,situacao")
        .single();
      if (error) {
        throw error;
      }
      return mapRow(data);
    } catch (error) {
      console.error("Erro ao atualizar efetivo no Supabase:", error);
      throw error;
    }
  }

  globalScope.CaveirinhaEfetivoService = {
    getEfetivo,
    updateEfetivo
  };
})(window);


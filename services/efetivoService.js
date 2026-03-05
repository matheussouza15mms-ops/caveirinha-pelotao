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
    const situacao = String(row.situacao || "");
    const emForma = Boolean(row.em_forma) || situacao === "em_forma";
    return {
      idMilitar: row.id,
      emForma,
      situacao: emForma ? "em_forma" : situacao,
      dataAtualizacao: dataRef ? `${dataRef}T00:00:00.000Z` : ""
    };
  }

  async function getLatestDate() {
    const { data, error } = await getClient()
      .from(TABLE_NAME)
      .select("data_referencia")
      .order("data_referencia", { ascending: false })
      .limit(1);
    if (error) {
      throw error;
    }
    return data?.[0]?.data_referencia || "";
  }

  async function getEfetivo(dataReferencia) {
    try {
      let dataRef = String(dataReferencia || "").trim();
      if (!dataRef) {
        dataRef = await getLatestDate();
      }
      if (!dataRef) {
        return [];
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
    const situacao = emForma ? "em_forma" : String(payload?.situacao || "").trim();
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


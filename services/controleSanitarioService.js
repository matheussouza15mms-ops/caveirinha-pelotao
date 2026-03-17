(function bootstrapControleSanitarioService(globalScope) {
  const TABLE_NAME = "controle_sanitario";

  function getClient() {
    const client = globalScope.CaveirinhaSupabase?.client;
    if (!client) {
      throw new Error("Cliente Supabase nao inicializado");
    }
    return client;
  }

  function mapRow(row) {
    return {
      idControleSanitario: row.id_controle_sanitario,
      idMilitar: row.id,
      sheetRowId: row.sheet_row_id || "",
      origemPlanilha: row.origem_planilha || "google_sheets",
      dataVisita: row.data_visita || "",
      situacao: row.situacao || "",
      dispensado: Boolean(row.dispensado),
      baixado: Boolean(row.baixado),
      internado: Boolean(row.internado),
      diasAfastamento: Number(row.dias_afastamento || 0),
      dataInicioAfastamento: row.data_inicio_afastamento || "",
      dataFimAfastamento: row.data_fim_afastamento || "",
      observacao: row.observacao || "",
      rawPayload: row.raw_payload || {},
      motivo: row.motivo || "",
      prescricao: row.prescricao || "",
      atendidoPor: row.atendido_por || "",
      su: row.su || "",
      pelotao: row.pelotao || "",
      createdAt: row.created_at || "",
      updatedAt: row.updated_at || ""
    };
  }

  async function getControleSanitario() {
    try {
      const { data, error } = await getClient()
        .from(TABLE_NAME)
        .select([
          "id_controle_sanitario",
          "id",
          "sheet_row_id",
          "origem_planilha",
          "data_visita",
          "situacao",
          "dispensado",
          "baixado",
          "internado",
          "dias_afastamento",
          "data_inicio_afastamento",
          "data_fim_afastamento",
          "observacao",
          "raw_payload",
          "motivo",
          "prescricao",
          "atendido_por",
          "su",
          "pelotao",
          "created_at",
          "updated_at"
        ].join(","))
        .order("data_visita", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (data || []).map(mapRow);
    } catch (error) {
      console.error("Erro ao carregar controle sanitario no Supabase:", error);
      throw error;
    }
  }

  globalScope.CaveirinhaControleSanitarioService = {
    getControleSanitario
  };
})(window);

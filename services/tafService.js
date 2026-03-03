(function bootstrapTafService(globalScope) {
  const TABLE_NAME = "taf";
  const TESTES = ["barra", "flexao", "abdominal", "corrida"];

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
    return ["I", "R", "B", "MB", "E"].includes(upper) ? upper : "B";
  }

  function parseTipoTeste(tipoTeste) {
    const match = /^([123])TAF_(barra|flexao|abdominal|corrida)$/i.exec(String(tipoTeste || ""));
    if (!match) {
      return null;
    }
    return {
      ciclo: Number(match[1]),
      teste: match[2].toLowerCase()
    };
  }

  function buildDashboardFromRows(idMilitar, rows) {
    const base = [1, 2, 3].map((ciclo) => ({
      ciclo,
      data: "",
      mencoes: { barra: "B", flexao: "B", abdominal: "B", corrida: "B" }
    }));
    const byCiclo = new Map(base.map((item) => [item.ciclo, item]));

    rows
      .filter((row) => String(row.idMilitar || "") === String(idMilitar || ""))
      .forEach((row) => {
        const parsed = parseTipoTeste(row.tipoTeste);
        if (!parsed) {
          return;
        }
        const atual = byCiclo.get(parsed.ciclo);
        if (!atual) {
          return;
        }
        atual.mencoes[parsed.teste] = mencaoNormalizada(row.resultado);
        if (row.data) {
          atual.data = String(row.data);
        }
      });

    return base;
  }

  function mapRowSchemaA(row) {
    return {
      id: row.id,
      idMilitar: row.id_militar,
      data: row.data,
      tipoTeste: row.tipo_teste,
      resultado: row.resultado,
      observacao: row.observacao,
      lastUpdate: row.updated_at || row.created_at || ""
    };
  }

  function mapRowSchemaB(row) {
    return {
      id: row.taf_id,
      idMilitar: row.id,
      data: row.data,
      tipoTeste: row.tipo_teste,
      resultado: row.resultado,
      observacao: row.observacao,
      lastUpdate: row.updated_at || row.created_at || ""
    };
  }

  async function getRowsSchemaA() {
    const { data, error } = await getClient()
      .from(TABLE_NAME)
      .select("id,id_militar,data,tipo_teste,resultado,observacao,created_at,updated_at");
    if (error) {
      throw error;
    }
    return (data || []).map(mapRowSchemaA);
  }

  async function getRowsSchemaB() {
    const { data, error } = await getClient()
      .from(TABLE_NAME)
      .select("taf_id,id,data,tipo_teste,resultado,observacao,created_at,updated_at");
    if (error) {
      throw error;
    }
    return (data || []).map(mapRowSchemaB);
  }

  async function getTAF() {
    try {
      return await getRowsSchemaA();
    } catch (errorA) {
      try {
        return await getRowsSchemaB();
      } catch (errorB) {
        console.error("Erro ao carregar TAF no Supabase:", errorA, errorB);
        throw errorB;
      }
    }
  }

  async function getTAFDashboard(idMilitar) {
    try {
      const rows = await getTAF();
      return buildDashboardFromRows(idMilitar, rows);
    } catch (error) {
      console.error("Erro ao montar dashboard TAF no Supabase:", error);
      throw error;
    }
  }

  async function persistSchemaA(records) {
    for (const record of records) {
      const { data: updatedRows, error: updateError } = await getClient()
        .from(TABLE_NAME)
        .update({
          data: record.data,
          resultado: record.resultado,
          observacao: record.observacao
        })
        .eq("id_militar", record.id_militar)
        .eq("tipo_teste", record.tipo_teste)
        .select("id")
        .limit(1);

      if (updateError) {
        throw updateError;
      }

      if (Array.isArray(updatedRows) && updatedRows.length > 0) {
        continue;
      }

      const { error: insertError } = await getClient().from(TABLE_NAME).insert(record);
      if (insertError) {
        throw insertError;
      }
    }
  }

  async function persistSchemaB(records) {
    for (const record of records) {
      const { data: updatedRows, error: updateError } = await getClient()
        .from(TABLE_NAME)
        .update({
          data: record.data,
          resultado: record.resultado,
          observacao: record.observacao
        })
        .eq("id", record.id)
        .eq("tipo_teste", record.tipo_teste)
        .select("taf_id")
        .limit(1);

      if (updateError) {
        throw updateError;
      }

      if (Array.isArray(updatedRows) && updatedRows.length > 0) {
        continue;
      }

      const { error: insertError } = await getClient().from(TABLE_NAME).insert(record);
      if (insertError) {
        throw insertError;
      }
    }
  }

  async function updateTAFDashboard(payload) {
    const idMilitar = String(payload?.idMilitar || "");
    const ciclo = Number(payload?.ciclo || 0);
    const data = String(payload?.data || "").slice(0, 10);
    const mencoes = payload?.mencoes || {};

    if (!idMilitar || !ciclo || !data) {
      throw new Error("Payload de TAF invalido");
    }

    try {
      const recordsA = TESTES.map((teste) => ({
        id: `${idMilitar}-${ciclo}TAF_${teste}`,
        id_militar: idMilitar,
        data,
        tipo_teste: `${ciclo}TAF_${teste}`,
        resultado: mencaoNormalizada(mencoes[teste]),
        observacao: `ciclo:${ciclo}`
      }));
      await persistSchemaA(recordsA);
    } catch (errorA) {
      try {
        const recordsB = TESTES.map((teste) => ({
          taf_id: `${idMilitar}-${ciclo}TAF_${teste}`,
          id: idMilitar,
          data,
          tipo_teste: `${ciclo}TAF_${teste}`,
          resultado: mencaoNormalizada(mencoes[teste]),
          observacao: `ciclo:${ciclo}`
        }));
        await persistSchemaB(recordsB);
      } catch (errorB) {
        console.error("Erro ao atualizar TAF no Supabase:", errorA, errorB);
        throw errorB;
      }
    }

    return getTAFDashboard(idMilitar);
  }

  globalScope.CaveirinhaTafService = {
    getTAF,
    getTAFDashboard,
    updateTAFDashboard
  };
})(window);

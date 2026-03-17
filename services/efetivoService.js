(function bootstrapEfetivoService(globalScope) {
  const TABLE_NAME = "efetivo";
  const DEFAULT_TIMEZONE = "America/Sao_Paulo";
  let efetivoSubscription = null;
  let quadroSubscription = null;

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
    return hojeIsoDate();
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
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: DEFAULT_TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    return formatter.format(new Date());
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

      try {
        await prepararEfetivoDia(dataRef);
      } catch (seedError) {
        console.warn("Nao foi possivel preparar o efetivo do dia no Supabase:", seedError);
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

    try {
      const { error } = await getClient().rpc("upsert_efetivo", {
        p_id: idMilitar,
        p_data: dataReferencia,
        p_situacao: situacao,
        p_em_forma: emForma
      });
      if (error) {
        return updateEfetivoFallback({
          idMilitar,
          dataReferencia,
          emForma,
          situacao
        });
      }

      return carregarRegistroEfetivo(idMilitar, dataReferencia);
    } catch (error) {
      console.error("Erro ao atualizar efetivo no Supabase:", error);
      throw error;
    }
  }

  async function prepararEfetivoDia(dataReferencia) {
    const dataRef = String(dataReferencia || "").trim() || hojeIsoDate();
    const { error } = await getClient().rpc("seed_efetivo_dia", {
      p_data: dataRef
    });

    if (error) {
      const message = String(error.message || "").toLowerCase();
      if (message.includes("could not find the function") || message.includes("function public.seed_efetivo_dia")) {
        return;
      }
      throw error;
    }
  }

  async function carregarRegistroEfetivo(idMilitar, dataReferencia) {
    const { data, error } = await getClient()
      .from(TABLE_NAME)
      .select("id,data_referencia,em_forma,situacao")
      .eq("id", idMilitar)
      .single();

    if (error) {
      throw error;
    }

    const registro = mapRow(data);
    if (dataReferencia) {
      registro.dataAtualizacao = `${dataReferencia}T00:00:00.000Z`;
    }
    return registro;
  }

  async function updateEfetivoFallback({ idMilitar, dataReferencia, emForma, situacao }) {
    const row = {
      id_efetivo: `ef-${idMilitar}`,
      id: idMilitar,
      data_referencia: dataReferencia,
      em_forma: emForma,
      situacao
    };

    const { data, error } = await getClient()
      .from(TABLE_NAME)
      .upsert(row, { onConflict: "id" })
      .select("id,data_referencia,em_forma,situacao")
      .single();

    if (error) {
      throw error;
    }

    return mapRow(data);
  }

  function subscribeRealtime(handler) {
    unsubscribeRealtime();

    const client = getClient();
    const callback = typeof handler === "function" ? handler : () => {};

    efetivoSubscription = client
      .channel("caveirinha-efetivo-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: TABLE_NAME },
        (payload) => callback({ origem: "efetivo", payload })
      )
      .subscribe();

    quadroSubscription = client
      .channel("caveirinha-quadro-efetivo-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "quadro_organizacional" },
        (payload) => callback({ origem: "quadro_organizacional", payload })
      )
      .subscribe();
  }

  function unsubscribeRealtime() {
    const client = globalScope.CaveirinhaSupabase?.client;
    if (!client) {
      efetivoSubscription = null;
      quadroSubscription = null;
      return;
    }

    if (efetivoSubscription) {
      client.removeChannel(efetivoSubscription);
      efetivoSubscription = null;
    }

    if (quadroSubscription) {
      client.removeChannel(quadroSubscription);
      quadroSubscription = null;
    }
  }

  globalScope.CaveirinhaEfetivoService = {
    getEfetivo,
    updateEfetivo,
    subscribeRealtime,
    unsubscribeRealtime,
    hojeIsoDate
  };
})(window);


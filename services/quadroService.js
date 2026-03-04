(function bootstrapQuadroService(globalScope) {
  const TABLE_NAME = "quadro_organizacional";
  const FOTO_BUCKET = "militares-fotos";
  const FOTO_SIGNED_URL_TTL_SECONDS = 3600;

  function getClient() {
    const client = globalScope.CaveirinhaSupabase?.client;
    if (!client) {
      throw new Error("Cliente Supabase nao inicializado");
    }
    return client;
  }

  function normalizeFotoPath(path) {
    const raw = String(path || "").trim();
    if (!raw) {
      return "";
    }

    if (/^https?:\/\//i.test(raw)) {
      return raw;
    }

    if (/^(\.\/|\/)?assets\//i.test(raw)) {
      return raw;
    }

    const semPrefixoBucket = raw.replace(new RegExp(`^${FOTO_BUCKET}/`, "i"), "");
    return semPrefixoBucket.replace(/^\/+/, "");
  }

  async function resolveFotoUrl(path) {
    const normalized = normalizeFotoPath(path);
    if (!normalized) {
      return "";
    }

    if (/^https?:\/\//i.test(normalized) || /^(\.\/|\/)?assets\//i.test(normalized)) {
      return normalized;
    }

    try {
      const storage = getClient().storage.from(FOTO_BUCKET);

      // Primeiro tenta URL assinada (bucket privado).
      const { data: signedData, error: signedError } = await storage.createSignedUrl(
        normalized,
        FOTO_SIGNED_URL_TTL_SECONDS
      );
      if (!signedError && signedData?.signedUrl) {
        return signedData.signedUrl;
      }

      // Fallback para bucket publico.
      const { data: publicData } = storage.getPublicUrl(normalized);
      return publicData?.publicUrl || "";
    } catch (error) {
      console.error("Erro ao montar URL publica da foto no Supabase Storage:", error);
      return "";
    }
  }

  async function rowToMilitar(row) {
    return {
      id: row.id,
      pg: row.pg || "",
      numero: row.numero === null || row.numero === undefined ? "" : row.numero,
      nomeGuerra: row.nome_guerra || "",
      funcao: row.funcao || "",
      aba: row.fracao || "",
      fracao: row.fracao || "",
      nomeCompleto: row.nome_completo || "",
      dataNascimento: row.data_nascimento || "",
      identidade: row.identidade || "",
      dataPraca: row.data_praca || "",
      endereco: row.endereco || "",
      celular: row.celular || "",
      nomePai: row.nome_pai || "",
      nomeMae: row.nome_mae || "",
      contatoEmergencia: row.contato_emergencia || "",
      comportamento: row.comportamento || "",
      habilidade: row.habilidade || "",
      foto: await resolveFotoUrl(row.foto),
      lastUpdate: row.updated_at || row.last_update || ""
    };
  }

  function militarToRow(data, options = {}) {
    const partial = Boolean(options.partial);
    const row = {};

    const source = data || {};
    if (!partial || source.id !== undefined) row.id = source.id;
    if (!partial || source.pg !== undefined) row.pg = source.pg;
    if (!partial || source.numero !== undefined) row.numero = source.numero;
    if (!partial || source.nomeGuerra !== undefined) row.nome_guerra = source.nomeGuerra;
    if (!partial || source.funcao !== undefined) row.funcao = source.funcao;
    if (!partial || source.aba !== undefined || source.fracao !== undefined) {
      row.fracao = source.fracao !== undefined ? source.fracao : source.aba;
    }
    if (!partial || source.nomeCompleto !== undefined) row.nome_completo = source.nomeCompleto;
    if (!partial || source.dataNascimento !== undefined) row.data_nascimento = source.dataNascimento;
    if (!partial || source.identidade !== undefined) row.identidade = source.identidade;
    if (!partial || source.dataPraca !== undefined) row.data_praca = source.dataPraca;
    if (!partial || source.endereco !== undefined) row.endereco = source.endereco;
    if (!partial || source.celular !== undefined) row.celular = source.celular;
    if (!partial || source.nomePai !== undefined) row.nome_pai = source.nomePai;
    if (!partial || source.nomeMae !== undefined) row.nome_mae = source.nomeMae;
    if (!partial || source.contatoEmergencia !== undefined) row.contato_emergencia = source.contatoEmergencia;
    if (!partial || source.comportamento !== undefined) row.comportamento = source.comportamento;
    if (!partial || source.habilidade !== undefined) row.habilidade = source.habilidade;
    if (!partial || source.foto !== undefined) row.foto = source.foto;

    Object.keys(row).forEach((key) => {
      if (row[key] === undefined) {
        delete row[key];
      }
    });

    return row;
  }

  async function getQuadro() {
    try {
      const { data, error } = await getClient()
        .from(TABLE_NAME)
        .select("*")
        .order("pg", { ascending: true })
        .order("nome_guerra", { ascending: true });

      if (error) {
        throw error;
      }

      return Promise.all((data || []).map((row) => rowToMilitar(row)));
    } catch (error) {
      console.error("Erro ao carregar quadro no Supabase:", error);
      throw error;
    }
  }

  async function getMilitarById(id) {
    try {
      const { data, error } = await getClient().from(TABLE_NAME).select("*").eq("id", id).single();
      if (error) {
        throw error;
      }
      return rowToMilitar(data);
    } catch (error) {
      console.error("Erro ao buscar militar por id no Supabase:", error);
      throw error;
    }
  }

  async function addMilitar(data) {
    try {
      const payload = militarToRow(data, { partial: false });
      const { data: inserted, error } = await getClient().from(TABLE_NAME).insert(payload).select("*").single();
      if (error) {
        throw error;
      }
      return rowToMilitar(inserted);
    } catch (error) {
      console.error("Erro ao adicionar militar no Supabase:", error);
      throw error;
    }
  }

  async function updateMilitar(id, data) {
    try {
      const payload = militarToRow(data, { partial: true });
      const { data: updated, error } = await getClient()
        .from(TABLE_NAME)
        .update(payload)
        .eq("id", id)
        .select("*")
        .single();

      if (error) {
        throw error;
      }
      return rowToMilitar(updated);
    } catch (error) {
      console.error("Erro ao atualizar militar no Supabase:", error);
      throw error;
    }
  }

  async function deleteMilitar(id) {
    try {
      const { error } = await getClient().from(TABLE_NAME).delete().eq("id", id);
      if (error) {
        throw error;
      }
      return { ok: true };
    } catch (error) {
      console.error("Erro ao excluir militar no Supabase:", error);
      throw error;
    }
  }

  globalScope.CaveirinhaQuadroService = {
    getQuadro,
    getMilitarById,
    addMilitar,
    updateMilitar,
    deleteMilitar
  };
})(window);

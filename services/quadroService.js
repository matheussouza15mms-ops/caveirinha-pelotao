(function bootstrapQuadroService(globalScope) {
  const TABLE_NAME = "quadro_organizacional";
  const FOTO_SIGNED_URL_TTL_SECONDS = 3600;
  const DEFAULT_MILITAR_FOTO = "assets/imagens/militar-base.png";
  const QUADRO_LIST_SELECT = [
    "id",
    "pg",
    "numero",
    "nome_guerra",
    "funcao",
    "fracao",
    "pelotao",
    "celular",
    "updated_at"
  ].join(",");
  const QUADRO_DETAIL_SELECT = [
    QUADRO_LIST_SELECT,
    "nome_completo",
    "data_nascimento",
    "identidade",
    "data_praca",
    "endereco",
    "nome_pai",
    "nome_mae",
    "contato_emergencia",
    "comportamento",
    "habilidade",
    "foto"
  ].join(",");
  const PELOTAO_BUCKET_MAP = {
    "1 pel": "imagens-1pel",
    "2 pel": "imagens-2pel",
    "3 pel": "imagens-3pel",
    "pel ap": "imagens-pelap",
    "sec cmdo": "imagens-seccmdo"
  };

  function getClient() {
    const client = globalScope.CaveirinhaSupabase?.client;
    if (!client) {
      throw new Error("Cliente Supabase nao inicializado");
    }
    return client;
  }

  function normalizarPelotao(valor) {
    return String(valor || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[º°]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function bucketPorPelotao(pelotao) {
    const key = normalizarPelotao(pelotao);
    return PELOTAO_BUCKET_MAP[key] || "";
  }

  function normalizarLabelFracao(valor) {
    const texto = String(valor || "").trim();
    if (!texto) {
      return "";
    }

    return texto
      .replace(/^([123])o(\s+)/i, "$1º$2")
      .replace(/^sec(\s+cmdo)$/i, "Seç$1");
  }

  function parseBucketAndPath(rawPath, pelotao) {
    const trimmed = String(rawPath || "").trim();
    if (!trimmed) {
      return { bucket: "", path: "" };
    }

    if (/^https?:\/\//i.test(trimmed) || /^(\.\/|\/)?assets\//i.test(trimmed)) {
      return { bucket: "", path: trimmed };
    }

    const matchBucketPrefix = /^(imagens-[^/]+)\/(.+)$/i.exec(trimmed);
    if (matchBucketPrefix) {
      return {
        bucket: matchBucketPrefix[1],
        path: matchBucketPrefix[2].replace(/^\/+/, "")
      };
    }

    return {
      bucket: bucketPorPelotao(pelotao),
      path: trimmed.replace(/^\/+/, "")
    };
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

    return raw.replace(/^\/+/, "");
  }

  async function isPublicUrlAvailable(url) {
    const alvo = String(url || "").trim();
    if (!alvo) {
      return false;
    }

    try {
      const response = await fetch(alvo, { method: "HEAD" });
      if (response.ok) {
        return true;
      }
      // Alguns provedores podem nao aceitar HEAD, mas a URL segue valida para <img>.
      return response.status === 405;
    } catch (error) {
      return false;
    }
  }

  async function resolveFotoUrl(path, pelotao) {
    const normalized = normalizeFotoPath(path);
    if (!normalized) {
      return DEFAULT_MILITAR_FOTO;
    }

    if (/^https?:\/\//i.test(normalized) || /^(\.\/|\/)?assets\//i.test(normalized)) {
      return normalized;
    }

    const resolved = parseBucketAndPath(normalized, pelotao);
    if (!resolved.bucket || !resolved.path) {
      return DEFAULT_MILITAR_FOTO;
    }

    try {
      const storage = getClient().storage.from(resolved.bucket);

      // Primeiro tenta URL assinada (bucket privado).
      const { data: signedData, error: signedError } = await storage.createSignedUrl(
        resolved.path,
        FOTO_SIGNED_URL_TTL_SECONDS
      );
      if (!signedError && signedData?.signedUrl) {
        return signedData.signedUrl;
      }

      // Fallback para bucket publico.
      const { data: publicData } = storage.getPublicUrl(resolved.path);
      const publicUrl = publicData?.publicUrl || "";
      if (await isPublicUrlAvailable(publicUrl)) {
        return publicUrl;
      }
      return DEFAULT_MILITAR_FOTO;
    } catch (error) {
      console.error("Erro ao montar URL publica da foto no Supabase Storage:", error);
      return DEFAULT_MILITAR_FOTO;
    }
  }

  async function rowToMilitar(row, options = {}) {
    const includeFoto = Boolean(options.includeFoto);
    return {
      id: row.id,
      pg: row.pg || "",
      numero: row.numero === null || row.numero === undefined ? "" : row.numero,
      nomeGuerra: row.nome_guerra || "",
      funcao: row.funcao || "",
      aba: normalizarLabelFracao(row.fracao || ""),
      fracao: normalizarLabelFracao(row.fracao || ""),
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
      pelotao: row.pelotao || "",
      foto: includeFoto
        ? await resolveFotoUrl(row.foto, row.pelotao || row.fracao || "")
        : DEFAULT_MILITAR_FOTO,
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
    if (!partial || source.pelotao !== undefined) row.pelotao = source.pelotao;
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
        .select(QUADRO_LIST_SELECT)
        .order("pg", { ascending: true })
        .order("nome_guerra", { ascending: true });

      if (error) {
        throw error;
      }

      return Promise.all((data || []).map((row) => rowToMilitar(row, { includeFoto: false })));
    } catch (error) {
      console.error("Erro ao carregar quadro no Supabase:", error);
      throw error;
    }
  }

  async function getMilitarById(id) {
    try {
      const { data, error } = await getClient().from(TABLE_NAME).select(QUADRO_DETAIL_SELECT).eq("id", id).single();
      if (error) {
        throw error;
      }
      return rowToMilitar(data, { includeFoto: true });
    } catch (error) {
      console.error("Erro ao buscar militar por id no Supabase:", error);
      throw error;
    }
  }

  async function addMilitar(data) {
    try {
      const payload = militarToRow(data, { partial: false });
      const { data: inserted, error } = await getClient()
        .from(TABLE_NAME)
        .insert(payload)
        .select(QUADRO_DETAIL_SELECT)
        .single();
      if (error) {
        throw error;
      }
      return rowToMilitar(inserted, { includeFoto: false });
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
        .select(QUADRO_DETAIL_SELECT)
        .single();

      if (error) {
        throw error;
      }
      return rowToMilitar(updated, { includeFoto: false });
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



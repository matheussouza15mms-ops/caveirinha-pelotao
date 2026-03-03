(function bootstrapDataService(globalScope) {
  const CSV_PATHS = {
    efetivo: "./data/efetivo.csv",
    fatosObservados: "./data/fatos_observados.csv",
    historicoObs: "./data/historico_obs.csv",
    punicoes: "./data/punicoes.csv",
    taf: "./data/taf.csv",
    tat: "./data/tat.csv"
  };
  const IMAGENS_DIR = "./assets/imagens";
  const IMAGENS_EXTENSOES = ["jpg", "jpeg", "png", "webp"];

  const COLLECTION_DEFAULTS = {
    quadroOrganizacional: [],
    efetivo: [],
    fatosObservados: [],
    historicoObs: [],
    punicoes: [],
    taf: [],
    tat: []
  };
  const SESSION_STORAGE_KEY = "caveirinha_auth_session";
  const AUTH_USERS = [
    {
      id: "usr-admin",
      email: "admin@caveirinha.app",
      password: "123456",
      nome: "Administrador"
    }
  ];

  let dbCache = null;

  function nowIso() {
    return new Date().toISOString();
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function assertRequired(value, fieldName) {
    if (value === undefined || value === null || value === "") {
      throw new Error(`Campo obrigatorio ausente: ${fieldName}`);
    }
  }

  function createId(prefix) {
    const random = Math.random().toString(36).slice(2, 7);
    return `${prefix}-${Date.now()}-${random}`;
  }

  function ensureCollectionsShape(db) {
    const safeDb = { ...COLLECTION_DEFAULTS, ...(db || {}) };
    Object.keys(COLLECTION_DEFAULTS).forEach((key) => {
      if (!Array.isArray(safeDb[key])) {
        safeDb[key] = [];
      }
    });
    return safeDb;
  }

  function parseBoolean(value) {
    const normalized = String(value || "")
      .trim()
      .toLowerCase();
    return normalized === "true" || normalized === "1" || normalized === "sim";
  }

  function safeStorageGet(key) {
    try {
      return globalScope.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      globalScope.localStorage.setItem(key, value);
    } catch (error) {
      // no-op
    }
  }

  function safeStorageRemove(key) {
    try {
      globalScope.localStorage.removeItem(key);
    } catch (error) {
      // no-op
    }
  }

  function normalizeEmail(value) {
    return String(value || "")
      .trim()
      .toLowerCase();
  }

  function validarCredenciaisLogin(email, senha) {
    const emailNormalizado = normalizeEmail(email);
    const senhaNormalizada = String(senha || "").trim();

    const user = AUTH_USERS.find(
      (item) => normalizeEmail(item.email) === emailNormalizado && String(item.password) === senhaNormalizada
    );
    if (!user) {
      throw new Error("Email ou senha invalidos");
    }

    return {
      id: user.id,
      email: user.email,
      nome: user.nome
    };
  }

  function carregarSessao() {
    const raw = safeStorageGet(SESSION_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.user || !parsed.user.email) {
        return null;
      }
      return parsed;
    } catch (error) {
      return null;
    }
  }

  function normalizeTatMencao(value) {
    const upper = String(value || "")
      .trim()
      .toUpperCase();
    const legacyMap = {
      A: "MB",
      B: "B",
      C: "R",
      D: "I",
      F: "I"
    };
    const normalized = legacyMap[upper] || upper;
    return ["I", "R", "B", "MB", "E"].includes(normalized) ? normalized : "B";
  }

  function isAbsoluteUrl(value) {
    return /^https?:\/\//i.test(String(value || "").trim());
  }

  function isRelativeAssetPath(value) {
    return /^(\.\/|\/)?assets\//i.test(String(value || "").trim());
  }

  function resolveMilitarFoto(idMilitar, fotoCsv) {
    const fotoRaw = String(fotoCsv || "").trim();
    if (fotoRaw) {
      if (isAbsoluteUrl(fotoRaw) || isRelativeAssetPath(fotoRaw)) {
        return fotoRaw;
      }

      if (/\.(jpg|jpeg|png|webp)$/i.test(fotoRaw)) {
        return `${IMAGENS_DIR}/${fotoRaw}`;
      }
    }

    const id = String(idMilitar || "").trim();
    if (!id) {
      return "";
    }

    return `${IMAGENS_DIR}/${id}.${IMAGENS_EXTENSOES[0]}`;
  }

  function parseCsvLine(line) {
    const values = [];
    let current = "";
    let inQuotes = false;

    for (let index = 0; index < line.length; index += 1) {
      const char = line[index];

      if (char === '"') {
        const next = line[index + 1];
        if (inQuotes && next === '"') {
          current += '"';
          index += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }

      if (char === "," && !inQuotes) {
        values.push(current);
        current = "";
        continue;
      }

      current += char;
    }

    values.push(current);
    return values;
  }

  function parseCsv(csvText) {
    const text = String(csvText || "").replace(/^\uFEFF/, "");
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trimEnd())
      .filter((line) => line.length > 0);

    if (!lines.length) {
      return [];
    }

    const headers = parseCsvLine(lines[0]).map((item) => item.trim());

    return lines.slice(1).map((line) => {
      const columns = parseCsvLine(line);
      const row = {};
      headers.forEach((header, idx) => {
        row[header] = columns[idx] === undefined ? "" : columns[idx];
      });
      return row;
    });
  }

  async function loadCsvFile(path) {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Falha ao carregar CSV: ${path} (${response.status})`);
    }

    const text = await response.text();
    return parseCsv(text);
  }

  function normalizeQuadro(rows) {
    return rows.map((row) => {
      const numeroRaw = String(row.numero || "").trim();
      return {
        id: row.id || "",
        pg: row.pg || "",
        numero: numeroRaw === "" ? "" : Number.isNaN(Number(numeroRaw)) ? numeroRaw : Number(numeroRaw),
        nomeGuerra: row.nomeGuerra || "",
        funcao: row.funcao || "",
        aba: row.aba || "",
        foto: resolveMilitarFoto(row.id, row.foto),
        lastUpdate: row.lastUpdate || "",
        nomeCompleto: row.nomeCompleto || "",
        dataNascimento: row.dataNascimento || "",
        identidade: row.identidade || "",
        dataPraca: row.dataPraca || "",
        fracao: row.fracao || "",
        endereco: row.endereco || "",
        celular: row.celular || "",
        nomePai: row.nomePai || "",
        nomeMae: row.nomeMae || "",
        contatoEmergencia: row.contatoEmergencia || "",
        comportamento: row.comportamento || "",
        habilidade: row.habilidade || ""
      };
    });
  }

  function normalizeEfetivo(rows) {
    return rows.map((row) => ({
      idMilitar: row.id || row.idMilitar || "",
      emForma: parseBoolean(row.emForma),
      situacao: row.situacao || "",
      dataAtualizacao: row.dataAtualizacao || ""
    }));
  }

  function normalizeFatosObservados(rows) {
    return rows.map((row) => ({
      id: row.foId || (row.idMilitar ? row.id : createId("fo")),
      idMilitar: row.id || row.idMilitar || "",
      data: row.data || "",
      tipo: row.tipo || "",
      descricao: row.descricao || "",
      autor: row.autor || "",
      lastUpdate: row.lastUpdate || ""
    }));
  }

  function normalizeHistoricoObs(rows) {
    return rows.map((row) => ({
      id: row.historicoId || (row.idMilitar ? row.id : createId("hist")),
      idMilitar: row.id || row.idMilitar || "",
      texto: row.texto || "",
      autor: row.autor || "",
      data: row.data || "",
      lastUpdate: row.lastUpdate || ""
    }));
  }

  function normalizeTaf(rows) {
    return rows.map((row) => ({
      id: row.tafId || (row.idMilitar ? row.id : createId("taf")),
      idMilitar: row.id || row.idMilitar || "",
      data: row.data || "",
      tipoTeste: row.tipoTeste || "",
      resultado: row.resultado || "",
      observacao: row.observacao || "",
      lastUpdate: row.lastUpdate || ""
    }));
  }

  function normalizeTat(rows) {
    return rows.map((row) => ({
      id: row.tatId || (row.idMilitar ? row.id : createId("tat")),
      idMilitar: row.id || row.idMilitar || "",
      data: row.data || "",
      armamento: row.armamento || "",
      pontuacao: row.pontuacao || "",
      mencao: normalizeTatMencao(row.mencao || row.classificacao || row.resultado),
      classificacao: normalizeTatMencao(row.classificacao || row.mencao || row.resultado),
      lastUpdate: row.lastUpdate || ""
    }));
  }

  function normalizePunicoes(rows) {
    return rows.map((row) => ({
      id: row.punicaoId || row.id || createId("pun"),
      idMilitar: row.id || row.idMilitar || "",
      fato: row.fato || row.enquadramento || "",
      punicao: row.punicao || row.tipo || "",
      dias: Number(row.dias || 0),
      dataInicio: row.dataInicio || "",
      dataFim: row.dataFim || "",
      lastUpdate: row.lastUpdate || ""
    }));
  }

  async function loadDb() {
    if (dbCache) {
      return dbCache;
    }

    const [efetivoRows, foRows, historicoRows, punicoesRows, tafRows, tatRows] = await Promise.all([
      loadCsvFile(CSV_PATHS.efetivo),
      loadCsvFile(CSV_PATHS.fatosObservados),
      loadCsvFile(CSV_PATHS.historicoObs),
      loadCsvFile(CSV_PATHS.punicoes),
      loadCsvFile(CSV_PATHS.taf),
      loadCsvFile(CSV_PATHS.tat)
    ]);

    dbCache = ensureCollectionsShape({
      quadroOrganizacional: [],
      efetivo: normalizeEfetivo(efetivoRows),
      fatosObservados: normalizeFatosObservados(foRows),
      historicoObs: normalizeHistoricoObs(historicoRows),
      punicoes: normalizePunicoes(punicoesRows),
      taf: normalizeTaf(tafRows),
      tat: normalizeTat(tatRows)
    });

    return dbCache;
  }

  function updateOrInsertById(collection, idKey, payload, withTimestampField) {
    const index = collection.findIndex((item) => item[idKey] === payload[idKey]);
    const nextValue = { ...payload };

    if (withTimestampField) {
      nextValue[withTimestampField] = nowIso();
    }

    if (index >= 0) {
      collection[index] = { ...collection[index], ...nextValue };
      return collection[index];
    }

    collection.push(nextValue);
    return nextValue;
  }

  function buildMilitarDadosFromRecord(militar) {
    return {
      id: militar.id,
      nomeCompleto: militar.nomeCompleto || `${militar.pg || ""} ${militar.nomeGuerra || ""}`.trim(),
      nomeGuerra: militar.nomeGuerra || "",
      pg: militar.pg || "",
      dataNascimento: militar.dataNascimento || "",
      numero: militar.numero === null || militar.numero === undefined ? "" : militar.numero,
      identidade: militar.identidade || "",
      dataPraca: militar.dataPraca || "",
      funcao: militar.funcao || "",
      fracao: militar.fracao || militar.aba || "",
      endereco: militar.endereco || "",
      celular: militar.celular || "",
      nomePai: militar.nomePai || "",
      nomeMae: militar.nomeMae || "",
      contatoEmergencia: militar.contatoEmergencia || "",
      comportamento: militar.comportamento || "",
      habilidade: militar.habilidade || ""
    };
  }

  function parseTafTipoTeste(tipoTeste) {
    const match = /^([123])TAF_(barra|flexao|abdominal|corrida)$/i.exec(String(tipoTeste || ""));
    if (!match) {
      return null;
    }
    return {
      ciclo: Number(match[1]),
      teste: match[2].toLowerCase()
    };
  }

  function buildTafDashboard(idMilitar, tafRows) {
    const base = [1, 2, 3].map((ciclo) => ({
      ciclo,
      data: "",
      mencoes: {
        barra: "B",
        flexao: "B",
        abdominal: "B",
        corrida: "B"
      }
    }));

    const byCiclo = new Map(base.map((item) => [item.ciclo, item]));

    tafRows
      .filter((row) => row.idMilitar === idMilitar)
      .forEach((row) => {
        const parsed = parseTafTipoTeste(row.tipoTeste);
        if (!parsed) {
          return;
        }

        const atual = byCiclo.get(parsed.ciclo);
        if (!atual) {
          return;
        }

        atual.mencoes[parsed.teste] = String(row.resultado || "B").toUpperCase();
        if (row.data) {
          atual.data = row.data;
        }
      });

    return base;
  }

  async function handleAction(action, payload = {}) {
    const db = await loadDb();

    switch (action) {
      case "getMilitares":
        return clone(db.quadroOrganizacional);
      case "addMilitar": {
        const record = {
          id: payload.data?.id || createId("mil"),
          pg: payload.data?.pg || "",
          numero: payload.data?.numero || "",
          nomeGuerra: payload.data?.nomeGuerra || "",
          funcao: payload.data?.funcao || "",
          aba: payload.data?.aba || payload.data?.fracao || "",
          fracao: payload.data?.fracao || payload.data?.aba || "",
          lastUpdate: nowIso()
        };
        db.quadroOrganizacional.push(record);
        return clone(record);
      }
      case "updateMilitar": {
        assertRequired(payload.id, "id");
        const index = db.quadroOrganizacional.findIndex((item) => item.id === payload.id);
        if (index < 0) {
          throw new Error("Militar nao encontrado");
        }
        db.quadroOrganizacional[index] = {
          ...db.quadroOrganizacional[index],
          ...payload.data,
          lastUpdate: nowIso()
        };
        return clone(db.quadroOrganizacional[index]);
      }
      case "deleteMilitar": {
        assertRequired(payload.id, "id");
        const index = db.quadroOrganizacional.findIndex((item) => item.id === payload.id);
        if (index < 0) {
          throw new Error("Militar nao encontrado");
        }
        const [deleted] = db.quadroOrganizacional.splice(index, 1);
        return clone(deleted);
      }
      case "getEfetivo":
        return clone(db.efetivo);
      case "getMilitarDados": {
        assertRequired(payload.idMilitar, "idMilitar");
        const militar = db.quadroOrganizacional.find((item) => item.id === payload.idMilitar);
        if (!militar) {
          throw new Error("Militar nao encontrado");
        }
        return clone(buildMilitarDadosFromRecord(militar));
      }
      case "updateMilitarDados": {
        assertRequired(payload.idMilitar, "idMilitar");
        const index = db.quadroOrganizacional.findIndex((item) => item.id === payload.idMilitar);
        if (index < 0) {
          throw new Error("Militar nao encontrado");
        }
        db.quadroOrganizacional[index] = {
          ...db.quadroOrganizacional[index],
          ...payload.dados,
          lastUpdate: nowIso()
        };
        return clone(buildMilitarDadosFromRecord(db.quadroOrganizacional[index]));
      }
      case "updateEfetivo": {
        assertRequired(payload.idMilitar, "idMilitar");
        const row = updateOrInsertById(
          db.efetivo,
          "idMilitar",
          {
            idMilitar: payload.idMilitar,
            emForma: Boolean(payload.emForma),
            situacao: payload.situacao || "",
            dataAtualizacao: payload.dataAtualizacao || nowIso()
          },
          null
        );
        return clone(row);
      }
      case "getFO":
        return clone(db.fatosObservados);
      case "createFO": {
        assertRequired(payload.idMilitar, "idMilitar");
        const record = {
          id: payload.id || createId("fo"),
          idMilitar: payload.idMilitar,
          data: payload.data || "",
          tipo: payload.tipo || "",
          descricao: payload.descricao || "",
          autor: payload.autor || "",
          lastUpdate: nowIso()
        };
        db.fatosObservados.push(record);
        return clone(record);
      }
      case "updateFO": {
        assertRequired(payload.id, "id");
        const row = updateOrInsertById(db.fatosObservados, "id", { ...payload, lastUpdate: nowIso() }, null);
        return clone(row);
      }
      case "deleteFO": {
        assertRequired(payload.id, "id");
        const index = db.fatosObservados.findIndex((item) => item.id === payload.id);
        if (index < 0) {
          throw new Error("FO nao encontrado");
        }
        const [deleted] = db.fatosObservados.splice(index, 1);
        return clone(deleted);
      }
      case "getHistoricoObs": {
        if (!payload.idMilitar) {
          return clone(db.historicoObs);
        }
        return clone(db.historicoObs.filter((row) => row.idMilitar === payload.idMilitar));
      }
      case "createHistoricoObs": {
        assertRequired(payload.idMilitar, "idMilitar");
        const record = {
          id: payload.id || createId("hist"),
          idMilitar: payload.idMilitar,
          texto: payload.texto || "",
          autor: payload.autor || "",
          data: payload.data || nowIso().slice(0, 10),
          lastUpdate: nowIso()
        };
        db.historicoObs.push(record);
        return clone(record);
      }
      case "updateHistoricoObs": {
        assertRequired(payload.id, "id");
        const row = updateOrInsertById(
          db.historicoObs,
          "id",
          {
            ...payload,
            texto: payload.texto || "",
            autor: payload.autor || "",
            data: payload.data || nowIso().slice(0, 10),
            lastUpdate: nowIso()
          },
          null
        );
        return clone(row);
      }
      case "deleteHistoricoObs": {
        assertRequired(payload.id, "id");
        const index = db.historicoObs.findIndex((item) => item.id === payload.id);
        if (index < 0) {
          throw new Error("Historico/Obs nao encontrado");
        }
        const [deleted] = db.historicoObs.splice(index, 1);
        return clone(deleted);
      }
      case "getPunicoes":
        if (!payload.idMilitar) {
          return clone(db.punicoes);
        }
        return clone(db.punicoes.filter((row) => row.idMilitar === payload.idMilitar));
      case "createPunicao": {
        assertRequired(payload.idMilitar, "idMilitar");
        const record = {
          id: payload.id || createId("pun"),
          idMilitar: payload.idMilitar,
          fato: payload.fato || "",
          punicao: payload.punicao || "ADV",
          dias: Number(payload.dias || 0),
          dataInicio: payload.dataInicio || "",
          dataFim: payload.dataFim || "",
          lastUpdate: nowIso()
        };
        db.punicoes.push(record);
        return clone(record);
      }
      case "updatePunicao": {
        assertRequired(payload.id, "id");
        const row = updateOrInsertById(
          db.punicoes,
          "id",
          {
            ...payload,
            fato: payload.fato || "",
            punicao: payload.punicao || "ADV",
            dias: Number(payload.dias || 0),
            dataInicio: payload.dataInicio || "",
            dataFim: payload.dataFim || "",
            lastUpdate: nowIso()
          },
          null
        );
        return clone(row);
      }
      case "deletePunicao": {
        assertRequired(payload.id, "id");
        const index = db.punicoes.findIndex((item) => item.id === payload.id);
        if (index < 0) {
          throw new Error("Punicao nao encontrada");
        }
        const [deleted] = db.punicoes.splice(index, 1);
        return clone(deleted);
      }
      case "getTAF":
        return clone(db.taf);
      case "createTAF": {
        assertRequired(payload.idMilitar, "idMilitar");
        const record = {
          id: payload.id || createId("taf"),
          idMilitar: payload.idMilitar,
          data: payload.data || "",
          tipoTeste: payload.tipoTeste || "",
          resultado: payload.resultado || "",
          observacao: payload.observacao || "",
          lastUpdate: nowIso()
        };
        db.taf.push(record);
        return clone(record);
      }
      case "updateTAF": {
        assertRequired(payload.id, "id");
        const row = updateOrInsertById(db.taf, "id", { ...payload, lastUpdate: nowIso() }, null);
        return clone(row);
      }
      case "getTAFDashboard": {
        assertRequired(payload.idMilitar, "idMilitar");
        return clone(buildTafDashboard(payload.idMilitar, db.taf));
      }
      case "updateTAFDashboard": {
        assertRequired(payload.idMilitar, "idMilitar");
        assertRequired(payload.ciclo, "ciclo");
        const ciclo = Number(payload.ciclo);
        const data = payload.data || nowIso().slice(0, 10);
        const mencoes = payload.mencoes || {};
        const testes = ["barra", "flexao", "abdominal", "corrida"];

        testes.forEach((teste) => {
          const tipoTeste = `${ciclo}TAF_${teste}`;
          const existenteIndex = db.taf.findIndex(
            (row) => row.idMilitar === payload.idMilitar && row.tipoTeste === tipoTeste
          );

          const registro = {
            id: existenteIndex >= 0 ? db.taf[existenteIndex].id : createId(`taf-${teste}`),
            idMilitar: payload.idMilitar,
            data,
            tipoTeste,
            resultado: String(mencoes[teste] || "B").toUpperCase(),
            observacao: `ciclo:${ciclo}`,
            lastUpdate: nowIso()
          };

          if (existenteIndex >= 0) {
            db.taf[existenteIndex] = { ...db.taf[existenteIndex], ...registro };
          } else {
            db.taf.push(registro);
          }
        });

        return clone(buildTafDashboard(payload.idMilitar, db.taf));
      }
      case "getTAT":
        return clone(db.tat);
      case "createTAT": {
        assertRequired(payload.idMilitar, "idMilitar");
        const mencao = normalizeTatMencao(payload.mencao || payload.classificacao || payload.resultado);
        const record = {
          id: payload.id || createId("tat"),
          idMilitar: payload.idMilitar,
          data: payload.data || "",
          armamento: payload.armamento || "",
          pontuacao: payload.pontuacao || "",
          mencao,
          classificacao: mencao,
          lastUpdate: nowIso()
        };
        db.tat.push(record);
        return clone(record);
      }
      case "updateTAT": {
        assertRequired(payload.id, "id");
        const mencao = normalizeTatMencao(payload.mencao || payload.classificacao || payload.resultado);
        const row = updateOrInsertById(
          db.tat,
          "id",
          { ...payload, mencao, classificacao: mencao, lastUpdate: nowIso() },
          null
        );
        return clone(row);
      }
      case "login": {
        assertRequired(payload.email, "email");
        assertRequired(payload.password, "password");
        const user = validarCredenciaisLogin(payload.email, payload.password);
        const sessao = {
          user,
          createdAt: nowIso()
        };
        safeStorageSet(SESSION_STORAGE_KEY, JSON.stringify(sessao));
        return clone(sessao);
      }
      case "logout":
        safeStorageRemove(SESSION_STORAGE_KEY);
        return { ok: true };
      case "getSession": {
        const sessao = carregarSessao();
        return clone(sessao);
      }
      default:
        throw new Error(`Acao nao suportada: ${action}`);
    }
  }

  globalScope.CaveirinhaDataService = {
    handleAction
  };
})(window);

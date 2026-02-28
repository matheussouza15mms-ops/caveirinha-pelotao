(function bootstrapApiLayer(globalScope) {
  const BASE_URL = "mock";
  const MOCK_DB_PATH = "./mock/db.json";

  const COLLECTION_DEFAULTS = {
    militares: [],
    efetivo: [],
    fo: [],
    punicoes: [],
    taf: [],
    tat: []
  };

  let mockDbCache = null;

  function nowIso() {
    return new Date().toISOString();
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
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

  async function loadMockDb() {
    if (mockDbCache) {
      return mockDbCache;
    }

    const response = await fetch(MOCK_DB_PATH, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Falha ao carregar mock local: ${response.status}`);
    }

    const db = await response.json();
    mockDbCache = ensureCollectionsShape(db);
    return mockDbCache;
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

  function assertRequired(value, fieldName) {
    if (value === undefined || value === null || value === "") {
      throw new Error(`Campo obrigatorio ausente: ${fieldName}`);
    }
  }

  async function handleMockAction(action, payload) {
    const db = await loadMockDb();

    switch (action) {
      case "getMilitares":
        return clone(db.militares);
      case "getEfetivo":
        return clone(db.efetivo);
      case "updateEfetivo": {
        assertRequired(payload.idMilitar, "idMilitar");
        const row = updateOrInsertById(
          db.efetivo,
          "idMilitar",
          {
            idMilitar: payload.idMilitar,
            emForma: Boolean(payload.emForma),
            situacao: payload.situacao || ""
          },
          "dataAtualizacao"
        );
        return clone(row);
      }
      case "getFO":
        return clone(db.fo);
      case "createFO": {
        assertRequired(payload.idMilitar, "idMilitar");
        const record = {
          id: payload.id || `fo-${Date.now()}`,
          idMilitar: payload.idMilitar,
          data: payload.data || "",
          tipo: payload.tipo || "",
          descricao: payload.descricao || "",
          autor: payload.autor || "",
          lastUpdate: nowIso()
        };
        db.fo.push(record);
        return clone(record);
      }
      case "updateFO": {
        assertRequired(payload.id, "id");
        const row = updateOrInsertById(
          db.fo,
          "id",
          { ...payload, lastUpdate: nowIso() },
          null
        );
        return clone(row);
      }
      case "getPunicoes":
        return clone(db.punicoes);
      case "createPunicao": {
        assertRequired(payload.idMilitar, "idMilitar");
        const record = {
          id: payload.id || `pun-${Date.now()}`,
          idMilitar: payload.idMilitar,
          tipo: payload.tipo || "",
          enquadramento: payload.enquadramento || "",
          dataInicio: payload.dataInicio || "",
          dataFim: payload.dataFim || "",
          status: payload.status || "",
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
          { ...payload, lastUpdate: nowIso() },
          null
        );
        return clone(row);
      }
      case "getTAF":
        return clone(db.taf);
      case "createTAF": {
        assertRequired(payload.idMilitar, "idMilitar");
        const record = {
          id: payload.id || `taf-${Date.now()}`,
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
        const row = updateOrInsertById(
          db.taf,
          "id",
          { ...payload, lastUpdate: nowIso() },
          null
        );
        return clone(row);
      }
      case "getTAT":
        return clone(db.tat);
      case "createTAT": {
        assertRequired(payload.idMilitar, "idMilitar");
        const record = {
          id: payload.id || `tat-${Date.now()}`,
          idMilitar: payload.idMilitar,
          data: payload.data || "",
          armamento: payload.armamento || "",
          pontuacao: payload.pontuacao || "",
          classificacao: payload.classificacao || "",
          lastUpdate: nowIso()
        };
        db.tat.push(record);
        return clone(record);
      }
      case "updateTAT": {
        assertRequired(payload.id, "id");
        const row = updateOrInsertById(
          db.tat,
          "id",
          { ...payload, lastUpdate: nowIso() },
          null
        );
        return clone(row);
      }
      default:
        throw new Error(`Acao nao suportada: ${action}`);
    }
  }

  async function apiRequest(action, payload = {}) {
    if (BASE_URL === "mock") {
      return handleMockAction(action, payload);
    }

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, payload })
    });

    if (!response.ok) {
      throw new Error(`Falha na requisicao remota: ${response.status}`);
    }

    return response.json();
  }

  function getMilitares() {
    return apiRequest("getMilitares");
  }

  function getEfetivo() {
    return apiRequest("getEfetivo");
  }

  function updateEfetivo(payload) {
    return apiRequest("updateEfetivo", payload);
  }

  function getFO() {
    return apiRequest("getFO");
  }

  function createFO(payload) {
    return apiRequest("createFO", payload);
  }

  function updateFO(payload) {
    return apiRequest("updateFO", payload);
  }

  function getPunicoes() {
    return apiRequest("getPunicoes");
  }

  function createPunicao(payload) {
    return apiRequest("createPunicao", payload);
  }

  function updatePunicao(payload) {
    return apiRequest("updatePunicao", payload);
  }

  function getTAF() {
    return apiRequest("getTAF");
  }

  function createTAF(payload) {
    return apiRequest("createTAF", payload);
  }

  function updateTAF(payload) {
    return apiRequest("updateTAF", payload);
  }

  function getTAT() {
    return apiRequest("getTAT");
  }

  function createTAT(payload) {
    return apiRequest("createTAT", payload);
  }

  function updateTAT(payload) {
    return apiRequest("updateTAT", payload);
  }

  globalScope.CaveirinhaAPI = {
    BASE_URL,
    apiRequest,
    getMilitares,
    getEfetivo,
    updateEfetivo,
    getFO,
    createFO,
    updateFO,
    getPunicoes,
    createPunicao,
    updatePunicao,
    getTAF,
    createTAF,
    updateTAF,
    getTAT,
    createTAT,
    updateTAT
  };
})(window);

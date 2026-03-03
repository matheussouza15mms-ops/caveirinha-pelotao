(function bootstrapApiLayer(globalScope) {
  const BASE_URL = "mock";

  function hasSupabaseAuth() {
    return (
      Boolean(globalScope.CaveirinhaAuth) &&
      typeof globalScope.CaveirinhaAuth.login === "function" &&
      typeof globalScope.CaveirinhaAuth.logout === "function" &&
      typeof globalScope.CaveirinhaAuth.getSession === "function"
    );
  }

  function hasSupabaseQuadro() {
    return (
      Boolean(globalScope.CaveirinhaQuadroService) &&
      typeof globalScope.CaveirinhaQuadroService.getQuadro === "function"
    );
  }

  async function apiRequest(action, payload = {}) {
    if (BASE_URL === "mock") {
      if (!globalScope.CaveirinhaDataService || typeof globalScope.CaveirinhaDataService.handleAction !== "function") {
        throw new Error("CaveirinhaDataService nao foi inicializado");
      }

      return globalScope.CaveirinhaDataService.handleAction(action, payload);
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

  async function getMilitares() {
    if (hasSupabaseQuadro()) {
      return globalScope.CaveirinhaQuadroService.getQuadro();
    }
    return apiRequest("getMilitares");
  }

  async function addMilitar(data) {
    if (hasSupabaseQuadro() && typeof globalScope.CaveirinhaQuadroService.addMilitar === "function") {
      return globalScope.CaveirinhaQuadroService.addMilitar(data);
    }
    return apiRequest("addMilitar", { data });
  }

  async function updateMilitar(id, data) {
    if (hasSupabaseQuadro() && typeof globalScope.CaveirinhaQuadroService.updateMilitar === "function") {
      return globalScope.CaveirinhaQuadroService.updateMilitar(id, data);
    }
    return apiRequest("updateMilitar", { id, data });
  }

  async function deleteMilitar(id) {
    if (hasSupabaseQuadro() && typeof globalScope.CaveirinhaQuadroService.deleteMilitar === "function") {
      return globalScope.CaveirinhaQuadroService.deleteMilitar(id);
    }
    return apiRequest("deleteMilitar", { id });
  }

  function getEfetivo() {
    return apiRequest("getEfetivo");
  }

  async function getMilitarDados(idMilitar) {
    if (hasSupabaseQuadro() && typeof globalScope.CaveirinhaQuadroService.getMilitarById === "function") {
      return globalScope.CaveirinhaQuadroService.getMilitarById(idMilitar);
    }
    return apiRequest("getMilitarDados", { idMilitar });
  }

  async function updateMilitarDados(idMilitar, dados) {
    return updateMilitar(idMilitar, dados);
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

  function deleteFO(id) {
    return apiRequest("deleteFO", { id });
  }

  function getHistoricoObs(idMilitar) {
    return apiRequest("getHistoricoObs", { idMilitar });
  }

  function createHistoricoObs(payload) {
    return apiRequest("createHistoricoObs", payload);
  }

  function updateHistoricoObs(payload) {
    return apiRequest("updateHistoricoObs", payload);
  }

  function deleteHistoricoObs(id) {
    return apiRequest("deleteHistoricoObs", { id });
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

  function deletePunicao(id) {
    return apiRequest("deletePunicao", { id });
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

  function getTAFDashboard(idMilitar) {
    return apiRequest("getTAFDashboard", { idMilitar });
  }

  function updateTAFDashboard(payload) {
    return apiRequest("updateTAFDashboard", payload);
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

  async function login(payload) {
    if (hasSupabaseAuth()) {
      return globalScope.CaveirinhaAuth.login(payload);
    }
    return apiRequest("login", payload);
  }

  async function logout() {
    if (hasSupabaseAuth()) {
      return globalScope.CaveirinhaAuth.logout();
    }
    return apiRequest("logout");
  }

  async function getSession() {
    if (hasSupabaseAuth()) {
      return globalScope.CaveirinhaAuth.getSession();
    }
    return apiRequest("getSession");
  }

  globalScope.CaveirinhaAPI = {
    BASE_URL,
    apiRequest,
    getMilitares,
    addMilitar,
    updateMilitar,
    deleteMilitar,
    getEfetivo,
    getMilitarDados,
    updateMilitarDados,
    updateEfetivo,
    getFO,
    createFO,
    updateFO,
    deleteFO,
    getHistoricoObs,
    createHistoricoObs,
    updateHistoricoObs,
    deleteHistoricoObs,
    getPunicoes,
    createPunicao,
    updatePunicao,
    deletePunicao,
    getTAF,
    createTAF,
    updateTAF,
    getTAFDashboard,
    updateTAFDashboard,
    getTAT,
    createTAT,
    updateTAT,
    login,
    logout,
    getSession
  };
})(window);

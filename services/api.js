(function bootstrapApiLayer(globalScope) {
  const BASE_URL = "mock";

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

  function getMilitares() {
    return apiRequest("getMilitares");
  }

  function getEfetivo() {
    return apiRequest("getEfetivo");
  }

  function getMilitarDados(idMilitar) {
    return apiRequest("getMilitarDados", { idMilitar });
  }

  function updateMilitarDados(idMilitar, dados) {
    return apiRequest("updateMilitarDados", { idMilitar, dados });
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

  function login(payload) {
    return apiRequest("login", payload);
  }

  function logout() {
    return apiRequest("logout");
  }

  function getSession() {
    return apiRequest("getSession");
  }

  globalScope.CaveirinhaAPI = {
    BASE_URL,
    apiRequest,
    getMilitares,
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

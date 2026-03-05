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

  function hasSupabaseTaf() {
    return (
      Boolean(globalScope.CaveirinhaTafService) &&
      typeof globalScope.CaveirinhaTafService.getTAFDashboard === "function" &&
      typeof globalScope.CaveirinhaTafService.updateTAFDashboard === "function"
    );
  }

  function hasSupabaseFatosObservados() {
    return (
      Boolean(globalScope.CaveirinhaFatosObservadosService) &&
      typeof globalScope.CaveirinhaFatosObservadosService.getFO === "function" &&
      typeof globalScope.CaveirinhaFatosObservadosService.createFO === "function" &&
      typeof globalScope.CaveirinhaFatosObservadosService.updateFO === "function" &&
      typeof globalScope.CaveirinhaFatosObservadosService.deleteFO === "function"
    );
  }

  function hasSupabasePunicoes() {
    return (
      Boolean(globalScope.CaveirinhaPunicoesService) &&
      typeof globalScope.CaveirinhaPunicoesService.getPunicoes === "function" &&
      typeof globalScope.CaveirinhaPunicoesService.createPunicao === "function" &&
      typeof globalScope.CaveirinhaPunicoesService.updatePunicao === "function" &&
      typeof globalScope.CaveirinhaPunicoesService.deletePunicao === "function"
    );
  }

  function hasSupabaseTat() {
    return (
      Boolean(globalScope.CaveirinhaTatService) &&
      typeof globalScope.CaveirinhaTatService.getTAT === "function" &&
      typeof globalScope.CaveirinhaTatService.createTAT === "function" &&
      typeof globalScope.CaveirinhaTatService.updateTAT === "function"
    );
  }

  function hasSupabaseHistoricoObs() {
    return (
      Boolean(globalScope.CaveirinhaHistoricoObsService) &&
      typeof globalScope.CaveirinhaHistoricoObsService.getHistoricoObs === "function" &&
      typeof globalScope.CaveirinhaHistoricoObsService.createHistoricoObs === "function" &&
      typeof globalScope.CaveirinhaHistoricoObsService.updateHistoricoObs === "function" &&
      typeof globalScope.CaveirinhaHistoricoObsService.deleteHistoricoObs === "function"
    );
  }

  function hasSupabaseUserConfig() {
    return (
      Boolean(globalScope.CaveirinhaUserConfigService) &&
      typeof globalScope.CaveirinhaUserConfigService.getCurrentUserConfig === "function"
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
    if (hasSupabaseFatosObservados()) {
      return globalScope.CaveirinhaFatosObservadosService.getFO();
    }
    return apiRequest("getFO");
  }

  function createFO(payload) {
    if (hasSupabaseFatosObservados()) {
      return globalScope.CaveirinhaFatosObservadosService.createFO(payload);
    }
    return apiRequest("createFO", payload);
  }

  function updateFO(payload) {
    if (hasSupabaseFatosObservados()) {
      return globalScope.CaveirinhaFatosObservadosService.updateFO(payload);
    }
    return apiRequest("updateFO", payload);
  }

  function deleteFO(id) {
    if (hasSupabaseFatosObservados()) {
      return globalScope.CaveirinhaFatosObservadosService.deleteFO(id);
    }
    return apiRequest("deleteFO", { id });
  }

  function getHistoricoObs(idMilitar) {
    if (hasSupabaseHistoricoObs()) {
      return globalScope.CaveirinhaHistoricoObsService.getHistoricoObs(idMilitar);
    }
    return apiRequest("getHistoricoObs", { idMilitar });
  }

  function createHistoricoObs(payload) {
    if (hasSupabaseHistoricoObs()) {
      return globalScope.CaveirinhaHistoricoObsService.createHistoricoObs(payload);
    }
    return apiRequest("createHistoricoObs", payload);
  }

  function updateHistoricoObs(payload) {
    if (hasSupabaseHistoricoObs()) {
      return globalScope.CaveirinhaHistoricoObsService.updateHistoricoObs(payload);
    }
    return apiRequest("updateHistoricoObs", payload);
  }

  function deleteHistoricoObs(id) {
    if (hasSupabaseHistoricoObs()) {
      return globalScope.CaveirinhaHistoricoObsService.deleteHistoricoObs(id);
    }
    return apiRequest("deleteHistoricoObs", { id });
  }

  function getPunicoes() {
    if (hasSupabasePunicoes()) {
      return globalScope.CaveirinhaPunicoesService.getPunicoes();
    }
    return apiRequest("getPunicoes");
  }

  function createPunicao(payload) {
    if (hasSupabasePunicoes()) {
      return globalScope.CaveirinhaPunicoesService.createPunicao(payload);
    }
    return apiRequest("createPunicao", payload);
  }

  function updatePunicao(payload) {
    if (hasSupabasePunicoes()) {
      return globalScope.CaveirinhaPunicoesService.updatePunicao(payload);
    }
    return apiRequest("updatePunicao", payload);
  }

  function deletePunicao(id) {
    if (hasSupabasePunicoes()) {
      return globalScope.CaveirinhaPunicoesService.deletePunicao(id);
    }
    return apiRequest("deletePunicao", { id });
  }

  function getTAF() {
    if (hasSupabaseTaf()) {
      return globalScope.CaveirinhaTafService.getTAF();
    }
    return apiRequest("getTAF");
  }

  function createTAF(payload) {
    return apiRequest("createTAF", payload);
  }

  function updateTAF(payload) {
    return apiRequest("updateTAF", payload);
  }

  function getTAFDashboard(idMilitar) {
    if (hasSupabaseTaf()) {
      return globalScope.CaveirinhaTafService.getTAFDashboard(idMilitar);
    }
    return apiRequest("getTAFDashboard", { idMilitar });
  }

  function updateTAFDashboard(payload) {
    if (hasSupabaseTaf()) {
      return globalScope.CaveirinhaTafService.updateTAFDashboard(payload);
    }
    return apiRequest("updateTAFDashboard", payload);
  }

  function getTAT() {
    if (hasSupabaseTat()) {
      return globalScope.CaveirinhaTatService.getTAT();
    }
    return apiRequest("getTAT");
  }

  function createTAT(payload) {
    if (hasSupabaseTat()) {
      return globalScope.CaveirinhaTatService.createTAT(payload);
    }
    return apiRequest("createTAT", payload);
  }

  function updateTAT(payload) {
    if (hasSupabaseTat()) {
      return globalScope.CaveirinhaTatService.updateTAT(payload);
    }
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

  async function getUserConfig() {
    if (hasSupabaseUserConfig()) {
      return globalScope.CaveirinhaUserConfigService.getCurrentUserConfig();
    }
    return null;
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
    getSession,
    getUserConfig
  };
})(window);

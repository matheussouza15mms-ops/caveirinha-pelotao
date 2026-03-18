let organizacao = [];
let indiceMilitares = [];
const cardIdToMilitarId = new Map();

const sidebar = document.getElementById("sidebar");
const iconSidebar = document.querySelector(".icon-sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");
const menuItems = document.querySelectorAll(".menu-item");
const screenTitle = document.getElementById("screenTitle");
const quadroScreen = document.getElementById("quadroScreen");
const efetivoScreen = document.getElementById("efetivoScreen");
const controleScreen = document.getElementById("controleScreen");
const missoesScreen = document.getElementById("missoesScreen");
const configScreen = document.getElementById("configScreen");
const fichaScreen = document.getElementById("fichaScreen");
const tabsContainer = document.getElementById("tabsContainer");
const cardsArea = document.getElementById("cardsArea");
const backToQuadro = document.getElementById("backToQuadro");
const searchToggle = document.getElementById("searchToggle");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const kpiTotalLabel = document.getElementById("kpiTotalLabel");
const kpiTotalPelotao = document.getElementById("kpiTotalPelotao");
const kpiEmForma = document.getElementById("kpiEmForma");
const kpiDestinos = document.getElementById("kpiDestinos");
const kpiBaixados = document.getElementById("kpiBaixados");
const efetivoTabsContainer = document.getElementById("efetivoTabsContainer");
const efetivoDataInput = document.getElementById("efetivoDataInput");
const efetivoTableBody = document.getElementById("efetivoTableBody");
const controleKpiDispensados = document.getElementById("controleKpiDispensados");
const controleKpiBaixados = document.getElementById("controleKpiBaixados");
const controleKpiInternados = document.getElementById("controleKpiInternados");
const controleRefreshBtn = document.getElementById("controleRefreshBtn");
const controleTableBody = document.getElementById("controleTableBody");
const controlePelotaoHead = document.getElementById("controlePelotaoHead");

const fichaFoto = document.getElementById("fichaFoto");
const fichaNome = document.getElementById("fichaNome");
const fichaFuncao = document.getElementById("fichaFuncao");
const fichaWhatsappBtn = document.getElementById("fichaWhatsappBtn");
const fichaDadosBtn = document.getElementById("fichaDadosBtn");
const fichaMedicaBtn = document.getElementById("fichaMedicaBtn");
const fichaTafBtn = document.getElementById("fichaTafBtn");
const fichaTatBtn = document.getElementById("fichaTatBtn");
const fichaPunicoesBtn = document.getElementById("fichaPunicoesBtn");
const fichaFoBtn = document.getElementById("fichaFoBtn");
const dadosModal = document.getElementById("dadosModal");
const dadosModalClose = document.getElementById("dadosModalClose");
const dadosModalBody = document.getElementById("dadosModalBody");
const configProfilePreview = document.getElementById("configProfilePreview");
const configProfileInput = document.getElementById("configProfileInput");
const configChangePhotoBtn = document.getElementById("configChangePhotoBtn");
const configDisplayNameInput = document.getElementById("configDisplayNameInput");
const configScreenDisplayName = document.getElementById("configScreenDisplayName");
const configSaveNameBtn = document.getElementById("configSaveNameBtn");
const configThemeSelect = document.getElementById("configThemeSelect");
const configColorOptions = document.getElementById("configColorOptions");
const configNotificationsToggle = document.getElementById("configNotificationsToggle");
const configHelpBtn = document.getElementById("configHelpBtn");
const configReportBtn = document.getElementById("configReportBtn");
const configSecurityBtn = document.getElementById("configSecurityBtn");
const configTermsBtn = document.getElementById("configTermsBtn");
const configAppVersion = document.getElementById("configAppVersion");
const reportProblemModal = document.getElementById("reportProblemModal");
const reportProblemClose = document.getElementById("reportProblemClose");
const reportProblemCancel = document.getElementById("reportProblemCancel");
const reportProblemForm = document.getElementById("reportProblemForm");
const reportProblemDate = document.getElementById("reportProblemDate");
const reportProblemMessage = document.getElementById("reportProblemMessage");
const fichaMedicaModal = document.getElementById("fichaMedicaModal");
const fichaMedicaModalClose = document.getElementById("fichaMedicaModalClose");
const fichaMedicaStatusBadge = document.getElementById("fichaMedicaStatusBadge");
const fichaMedicaTableBody = document.getElementById("fichaMedicaTableBody");
const foModal = document.getElementById("foModal");
const foModalClose = document.getElementById("foModalClose");
const foTabPlus = document.getElementById("foTabPlus");
const foTabMinus = document.getElementById("foTabMinus");
const foNovoBtn = document.getElementById("foNovoBtn");
const foTableBody = document.getElementById("foTableBody");
const foEditorModal = document.getElementById("foEditorModal");
const foEditorClose = document.getElementById("foEditorClose");
const foEditorCancel = document.getElementById("foEditorCancel");
const foEditorForm = document.getElementById("foEditorForm");
const foDescricaoInput = document.getElementById("foDescricaoInput");
const foAutorInput = document.getElementById("foAutorInput");
const foDataInput = document.getElementById("foDataInput");
const foEditorTitle = document.getElementById("foEditorTitle");
const fichaHistoricoBtn = document.getElementById("fichaHistoricoBtn");
const historicoModal = document.getElementById("historicoModal");
const historicoModalClose = document.getElementById("historicoModalClose");
const historicoNovoBtn = document.getElementById("historicoNovoBtn");
const historicoTableBody = document.getElementById("historicoTableBody");
const historicoEditorModal = document.getElementById("historicoEditorModal");
const historicoEditorClose = document.getElementById("historicoEditorClose");
const historicoEditorCancel = document.getElementById("historicoEditorCancel");
const historicoEditorForm = document.getElementById("historicoEditorForm");
const historicoTextoInput = document.getElementById("historicoTextoInput");
const historicoAutorInput = document.getElementById("historicoAutorInput");
const historicoEditorTitle = document.getElementById("historicoEditorTitle");
const punicoesModal = document.getElementById("punicoesModal");
const punicoesModalClose = document.getElementById("punicoesModalClose");
const punicoesNovoBtn = document.getElementById("punicoesNovoBtn");
const punicoesTableBody = document.getElementById("punicoesTableBody");
const punicoesEditorModal = document.getElementById("punicoesEditorModal");
const punicoesEditorClose = document.getElementById("punicoesEditorClose");
const punicoesEditorCancel = document.getElementById("punicoesEditorCancel");
const punicoesEditorForm = document.getElementById("punicoesEditorForm");
const punicoesEditorTitle = document.getElementById("punicoesEditorTitle");
const punicoesFatoInput = document.getElementById("punicoesFatoInput");
const punicoesTipoInput = document.getElementById("punicoesTipoInput");
const punicoesInicioInput = document.getElementById("punicoesInicioInput");
const punicoesFimInput = document.getElementById("punicoesFimInput");
const punicoesDiasInput = document.getElementById("punicoesDiasInput");
const punicoesComportamentoValue = document.getElementById("punicoesComportamentoValue");
const tafModal = document.getElementById("tafModal");
const tafModalClose = document.getElementById("tafModalClose");
const tafCardsWrap = document.getElementById("tafCardsWrap");
const tafEditorModal = document.getElementById("tafEditorModal");
const tafEditorClose = document.getElementById("tafEditorClose");
const tafEditorCancel = document.getElementById("tafEditorCancel");
const tafEditorForm = document.getElementById("tafEditorForm");
const tafEditorTitle = document.getElementById("tafEditorTitle");
const tafDataInput = document.getElementById("tafDataInput");
const tafBarraInput = document.getElementById("tafBarraInput");
const tafFlexaoInput = document.getElementById("tafFlexaoInput");
const tafAbdominalInput = document.getElementById("tafAbdominalInput");
const tafCorridaInput = document.getElementById("tafCorridaInput");
const tatModal = document.getElementById("tatModal");
const tatModalClose = document.getElementById("tatModalClose");
const tatArmamentoValue = document.getElementById("tatArmamentoValue");
const tatMencaoValue = document.getElementById("tatMencaoValue");
const tatEditBtn = document.getElementById("tatEditBtn");
const tatEditorForm = document.getElementById("tatEditorForm");
const tatMencaoInput = document.getElementById("tatMencaoInput");
const tatEditorCancel = document.getElementById("tatEditorCancel");
const appHeaderLogo = document.querySelector(".app-header .app-brand-logo");
const appHeaderGreeting = document.getElementById("appHeaderGreeting");
const appHeaderSubtitle = document.getElementById("appHeaderSubtitle");
const loginGate = document.getElementById("loginGate");
const loginForm = document.getElementById("loginForm");
const loginEmailInput = document.getElementById("loginEmailInput");
const loginPasswordInput = document.getElementById("loginPasswordInput");
const loginRememberInput = document.getElementById("loginRememberInput");
const loginError = document.getElementById("loginError");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");
const logoutBtn = document.getElementById("logoutBtn");

let abaAtiva = 0;
let ultimoCardEncontrado = null;
let militarSelecionadoId = null;
let foTipoAtivo = "FO+";
let foListaCache = [];
let foEditandoId = null;
let foEditandoTipo = "FO+";
let historicoListaCache = [];
let historicoEditandoId = null;
let punicoesListaCache = [];
let punicoesEditandoId = null;
let controleSanitarioListaCache = [];
let tafDashboardCache = [];
let tafEditandoCiclo = 1;
let tatListaCache = [];
let tatRegistroAtual = null;
let appJaInicializado = false;
let usuarioSessao = null;
let usuarioConfigAtual = null;
let ultimoScrollY = window.scrollY || 0;
let efetivoPelotaoAtivo = "__todos__";
let realtimeRefreshHandle = null;
let searchRenderHandle = null;
let lastTabsRenderKey = "";
let lastCardsRenderKey = "";
let lastEfetivoTabsRenderKey = "";
let lastEfetivoRenderKey = "";

const opcoesSituacao = ["ferias", "dispensado", "missao", "servico", "s_sv", "atrasado", "outros", "falta", "baixado"];
const efetivoState = new Map();
const mencoesOrdenadas = ["I", "R", "B", "MB", "E"];
const tiposPunicao = ["ADV", "IMP", "DET", "REP", "PRISAO"];
const comportamentoCodigos = ["EXCELENTE", "OTIMO", "BOM", "INSUFICIENTE", "MAU"];
const AUTH_REMEMBER_KEY = "caveirinha_auth_remember";
const AUTH_KEEP_SESSION_KEY = "caveirinha_auth_keep_session";
const HEADER_IMAGE_SIGNED_TTL_SECONDS = 3600;
const DEFAULT_HEADER_LOGO = "assets/imagens/cabecalho-base.png";
const DEFAULT_MILITAR_FOTO = "assets/imagens/militar-base.png";
const DEFAULT_HEADER_SUBTITLE = "PELOPES";
const APP_SETTINGS_STORAGE_KEY = "caveirinha_app_settings";
const APP_CACHE_PREFIX = "caveirinha_cache_v1";
const CACHE_TTL_USUARIO_CONFIG_MS = 5 * 60 * 1000;
const CACHE_TTL_QUADRO_MS = 5 * 60 * 1000;
const CACHE_TTL_EFETIVO_MS = 2 * 60 * 1000;
const CACHE_TTL_MILITAR_DETALHE_MS = 10 * 60 * 1000;
const CACHE_TTL_STORAGE_URL_MS = 55 * 60 * 1000;
const SEARCH_DEBOUNCE_MS = 120;
const APP_VERSION = "1.5.0";
const DEV_WHATSAPP_NUMBER = "5524981130508";
const PELOTAO_BUCKET_MAP = {
  "1 pel": "imagens-1pel",
  "2 pel": "imagens-2pel",
  "3 pel": "imagens-3pel",
  "pel ap": "imagens-pelap",
  "sec cmdo": "imagens-seccmdo"
};
const camposDadosMilitar = [
  { key: "nomeCompleto", label: "Nome completo" },
  { key: "nomeGuerra", label: "Nome de guerra" },
  { key: "pg", label: "P/G" },
  { key: "dataNascimento", label: "Data de nascimento" },
  { key: "numero", label: "Numero" },
  { key: "identidade", label: "Identidade" },
  { key: "dataPraca", label: "Data de praca" },
  { key: "funcao", label: "Funcao" },
  { key: "fracao", label: "Fracao" },
  { key: "endereco", label: "Endereco" },
  { key: "celular", label: "Celular" },
  { key: "nomePai", label: "Nome do pai" },
  { key: "nomeMae", label: "Nome da mae" },
  { key: "contatoEmergencia", label: "Contato de emergencia" },
  { key: "comportamento", label: "Comportamento" },
  { key: "habilidade", label: "Habilidade" }
];

let appSettings = {
  displayName: "",
  profilePhoto: DEFAULT_MILITAR_FOTO,
  theme: "light",
  colorScheme: "classic",
  notificationsEnabled: true
};

function normalizarEmail(valor) {
  return String(valor || "")
    .trim()
    .toLowerCase();
}

function normalizarTextoBusca(valor) {
  return String(valor || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function normalizarTelefoneWhatsapp(valor) {
  const digitos = String(valor || "").replace(/\D/g, "");
  if (!digitos) {
    return "";
  }
  if (digitos.startsWith("55")) {
    return digitos;
  }
  return `55${digitos}`;
}

function montarLinkWhatsapp(militar) {
  const telefone = normalizarTelefoneWhatsapp(militar?.celular);
  if (!telefone) {
    return "";
  }
  return `https://wa.me/${telefone}`;
}

function setLoginError(mensagem) {
  loginError.textContent = mensagem || "";
}

function salvarCredenciaisLembradas(email, senha) {
  try {
    localStorage.setItem(
      AUTH_REMEMBER_KEY,
      JSON.stringify({
        email: normalizarEmail(email)
      })
    );
  } catch (error) {
    // no-op
  }
}

function limparCredenciaisLembradas() {
  try {
    localStorage.removeItem(AUTH_REMEMBER_KEY);
  } catch (error) {
    // no-op
  }
}

function setManterSessaoAtivo(ativo) {
  try {
    if (ativo) {
      localStorage.setItem(AUTH_KEEP_SESSION_KEY, "1");
      return;
    }
    localStorage.removeItem(AUTH_KEEP_SESSION_KEY);
  } catch (error) {
    // no-op
  }
}

function isManterSessaoAtivo() {
  try {
    return localStorage.getItem(AUTH_KEEP_SESSION_KEY) === "1";
  } catch (error) {
    return false;
  }
}

function preencherLoginLembrado() {
  try {
    const raw = localStorage.getItem(AUTH_REMEMBER_KEY);
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.email) {
      return;
    }

    loginEmailInput.value = String(parsed.email);
    loginRememberInput.checked = true;
  } catch (error) {
    // no-op
  }
}

function setHeaderLogoBackground(imageUrl) {
  if (!appHeaderLogo) {
    return;
  }
  const url = String(imageUrl || "").trim() || DEFAULT_HEADER_LOGO;
  appHeaderLogo.style.backgroundImage = `url("${url}")`;
}

function setHeaderSubtitle(text) {
  if (!appHeaderSubtitle) {
    return;
  }
  const safeText = String(text || "").trim() || DEFAULT_HEADER_SUBTITLE;
  appHeaderSubtitle.textContent = safeText;
}

function saudacaoPorHorario() {
  const horaAtual = new Date().getHours();
  if (horaAtual < 12) {
    return "Bom dia";
  }
  if (horaAtual < 18) {
    return "Boa tarde";
  }
  return "Boa noite";
}

function atualizarCabecalhoUsuario() {
  if (!appHeaderGreeting) {
    return;
  }
  appHeaderGreeting.textContent = `${saudacaoPorHorario()}, ${nomeUsuarioConfigurado()}`;
}

function lerAppSettingsSalvos() {
  try {
    const raw = localStorage.getItem(APP_SETTINGS_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    return parsed;
  } catch (error) {
    return null;
  }
}

function cacheNamespaceUsuario() {
  return normalizarEmail(usuarioSessao?.email || "anon");
}

function cacheKeyUsuarioConfig() {
  return `${APP_CACHE_PREFIX}:usuario_config:${cacheNamespaceUsuario()}`;
}

function cacheKeyQuadro() {
  return `${APP_CACHE_PREFIX}:quadro:${cacheNamespaceUsuario()}`;
}

function cacheKeyEfetivo(dataReferencia) {
  return `${APP_CACHE_PREFIX}:efetivo:${cacheNamespaceUsuario()}:${String(dataReferencia || "").trim()}`;
}

function cacheKeyMilitarDetalhe(idMilitar) {
  return `${APP_CACHE_PREFIX}:militar_detalhe:${cacheNamespaceUsuario()}:${String(idMilitar || "").trim()}`;
}

function cacheKeyStorageUrl(tipo, path, pelotao) {
  return `${APP_CACHE_PREFIX}:storage_url:${cacheNamespaceUsuario()}:${String(tipo || "").trim()}:${encodeURIComponent(
    `${String(pelotao || "").trim()}::${String(path || "").trim()}`
  )}`;
}

function salvarCacheLocal(chave, dados) {
  try {
    localStorage.setItem(
      chave,
      JSON.stringify({
        savedAt: Date.now(),
        data: dados
      })
    );
  } catch (error) {
    // no-op
  }
}

function lerCacheLocal(chave, ttlMs) {
  try {
    const raw = localStorage.getItem(chave);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    const savedAt = Number(parsed.savedAt || 0);
    if (!savedAt || Date.now() - savedAt > ttlMs) {
      localStorage.removeItem(chave);
      return null;
    }

    return parsed.data ?? null;
  } catch (error) {
    return null;
  }
}

function limparCacheSessaoAtual() {
  try {
    const prefixo = `${APP_CACHE_PREFIX}:`;
    const namespace = cacheNamespaceUsuario();
    const remover = [];

    for (let index = 0; index < localStorage.length; index += 1) {
      const chave = localStorage.key(index);
      if (!chave || !chave.startsWith(prefixo) || !chave.includes(`:${namespace}`)) {
        continue;
      }
      remover.push(chave);
    }

    remover.forEach((chave) => localStorage.removeItem(chave));
  } catch (error) {
    // no-op
  }
}

async function obterUsuarioConfigComCache(options = {}) {
  const force = Boolean(options.force);
  const cacheKey = cacheKeyUsuarioConfig();

  if (!force) {
    const cached = lerCacheLocal(cacheKey, CACHE_TTL_USUARIO_CONFIG_MS);
    if (cached) {
      return cached;
    }
  }

  const config = await window.CaveirinhaAPI.getUserConfig();
  if (config) {
    salvarCacheLocal(cacheKey, config);
  }
  return config;
}

async function obterMilitaresComCache(options = {}) {
  const force = Boolean(options.force);
  const cacheKey = cacheKeyQuadro();

  if (!force) {
    const cached = lerCacheLocal(cacheKey, CACHE_TTL_QUADRO_MS);
    if (Array.isArray(cached) && cached.length) {
      return cached;
    }
  }

  const militares = await window.CaveirinhaAPI.getMilitares();
  salvarCacheLocal(cacheKey, militares || []);
  return militares;
}

async function obterEfetivoComCache(dataReferencia, options = {}) {
  const force = Boolean(options.force);
  const cacheKey = cacheKeyEfetivo(dataReferencia);

  if (!force) {
    const cached = lerCacheLocal(cacheKey, CACHE_TTL_EFETIVO_MS);
    if (Array.isArray(cached)) {
      return cached;
    }
  }

  const efetivo = await window.CaveirinhaAPI.getEfetivo(dataReferencia);
  salvarCacheLocal(cacheKey, efetivo || []);
  return efetivo;
}

async function obterMilitarDetalhadoComCache(idMilitar, options = {}) {
  const force = Boolean(options.force);
  const cacheKey = cacheKeyMilitarDetalhe(idMilitar);

  if (!force) {
    const cached = lerCacheLocal(cacheKey, CACHE_TTL_MILITAR_DETALHE_MS);
    if (cached) {
      return cached;
    }
  }

  const militar = await window.CaveirinhaAPI.getMilitarDados(idMilitar);
  if (militar) {
    salvarCacheLocal(cacheKey, militar);
  }
  return militar;
}

function atualizarCacheMilitarDetalhado(idMilitar, dados) {
  const cacheKey = cacheKeyMilitarDetalhe(idMilitar);
  const atual = lerCacheLocal(cacheKey, CACHE_TTL_MILITAR_DETALHE_MS) || {};
  salvarCacheLocal(cacheKey, { ...atual, ...(dados || {}) });
}

function dataEfetivoSelecionada() {
  return efetivoDataInput?.value || hojeISODate();
}

function snapshotEfetivoAtual() {
  return Array.from(efetivoState.entries())
    .map(([cardId, estado]) => {
      const idMilitar = cardIdToMilitarId.get(cardId);
      if (!idMilitar) {
        return null;
      }
      return {
        idMilitar,
        emForma: Boolean(estado?.emForma),
        situacao: estado?.emForma ? "em_forma" : normalizarSituacaoEfetivo(estado?.situacao),
        dataAtualizacao: estado?.dataAtualizacao || ""
      };
    })
    .filter(Boolean);
}

function atualizarCacheQuadroLista(militares) {
  salvarCacheLocal(cacheKeyQuadro(), Array.isArray(militares) ? militares : []);
}

function atualizarCacheEfetivoLista(dataReferencia, efetivo) {
  salvarCacheLocal(cacheKeyEfetivo(dataReferencia), Array.isArray(efetivo) ? efetivo : []);
}

function militarResumoFromQuadroRow(row) {
  if (!row?.id) {
    return null;
  }

  return {
    id: row.id,
    pg: row.pg || "",
    numero: row.numero === null || row.numero === undefined ? "" : row.numero,
    nomeGuerra: row.nome_guerra || "",
    funcao: row.funcao || "",
    aba: normalizarLabelFracao(row.fracao || ""),
    fracao: normalizarLabelFracao(row.fracao || ""),
    pelotao: row.pelotao || "",
    celular: row.celular || "",
    foto: DEFAULT_MILITAR_FOTO,
    lastUpdate: row.updated_at || row.last_update || ""
  };
}

function efetivoFromRealtimeRow(row) {
  if (!row?.id) {
    return null;
  }

  const emForma = Boolean(row.em_forma) || row.situacao === "em_forma";
  const dataReferencia = String(row.data_referencia || "").trim();
  return {
    idMilitar: row.id,
    emForma,
    situacao: emForma ? "em_forma" : normalizarSituacaoEfetivo(row.situacao),
    dataAtualizacao: dataReferencia ? `${dataReferencia}T00:00:00.000Z` : ""
  };
}

function renderizarEstadoPrincipal() {
  renderTabs();
  renderCards();
  renderEfetivoTabs();
  renderEfetivo();
}

function aplicarEventoRealtimeQuadro(payload) {
  const tipoEvento = String(payload?.eventType || "").toUpperCase();
  const origem = tipoEvento === "DELETE" ? payload?.old : payload?.new;
  const militarAtualizado = militarResumoFromQuadroRow(origem);
  if (!militarAtualizado) {
    return false;
  }

  const militaresBase =
    lerCacheLocal(cacheKeyQuadro(), CACHE_TTL_QUADRO_MS) ||
    indiceMilitares.map((militar) => ({
      id: militar.id,
      pg: militar.pg,
      numero: militar.numero,
      nomeGuerra: militar.nomeGuerra,
      funcao: militar.funcao,
      aba: militar.fracao,
      fracao: militar.fracao,
      pelotao: militar.pelotao,
      celular: militar.celular,
      foto: militar.foto || DEFAULT_MILITAR_FOTO,
      lastUpdate: militar.lastUpdate
    }));

  const militares = Array.isArray(militaresBase) ? [...militaresBase] : [];
  const indiceExistente = militares.findIndex((militar) => militar.id === militarAtualizado.id);

  if (tipoEvento === "DELETE") {
    if (indiceExistente < 0) {
      return false;
    }
    militares.splice(indiceExistente, 1);
  } else if (indiceExistente >= 0) {
    militares[indiceExistente] = {
      ...militares[indiceExistente],
      ...militarAtualizado
    };
  } else {
    militares.push(militarAtualizado);
  }

  const snapshotEfetivo = snapshotEfetivoAtual();
  organizacao = construirOrganizacao(militares);
  reconstruirIndices();
  sincronizarEfetivoState(snapshotEfetivo, dataEfetivoSelecionada());
  atualizarCacheQuadroLista(militares);
  renderizarEstadoPrincipal();
  return true;
}

function aplicarEventoRealtimeEfetivo(payload) {
  const tipoEvento = String(payload?.eventType || "").toUpperCase();
  const origem = tipoEvento === "DELETE" ? payload?.old : payload?.new;
  const registro = efetivoFromRealtimeRow(origem);
  const dataReferencia = String(origem?.data_referencia || "").trim();
  if (!registro || !dataReferencia) {
    return false;
  }

  const cacheAtual = lerCacheLocal(cacheKeyEfetivo(dataReferencia), CACHE_TTL_EFETIVO_MS);
  const efetivoBase = Array.isArray(cacheAtual)
    ? cacheAtual
    : (dataReferencia === dataEfetivoSelecionada() ? snapshotEfetivoAtual() : []);
  const efetivoAtual = Array.isArray(efetivoBase) ? [...efetivoBase] : [];
  const indiceExistente = efetivoAtual.findIndex((item) => item.idMilitar === registro.idMilitar);

  if (tipoEvento === "DELETE") {
    if (indiceExistente >= 0) {
      efetivoAtual.splice(indiceExistente, 1);
    }
  } else if (indiceExistente >= 0) {
    efetivoAtual[indiceExistente] = registro;
  } else {
    efetivoAtual.push(registro);
  }

  atualizarCacheEfetivoLista(dataReferencia, efetivoAtual);

  if (dataReferencia !== dataEfetivoSelecionada()) {
    return true;
  }

  sincronizarEfetivoState(efetivoAtual, dataReferencia);
  renderEfetivoTabs();
  renderEfetivo();
  return true;
}

function salvarAppSettings() {
  try {
    localStorage.setItem(APP_SETTINGS_STORAGE_KEY, JSON.stringify(appSettings));
  } catch (error) {
    // no-op
  }
}

function nomeUsuarioConfigurado() {
  return (
    String(appSettings.displayName || "").trim() ||
    String(usuarioConfigAtual?.nomeUsuario || "").trim() ||
    String(usuarioSessao?.email || "Usuário").split("@")[0]
  );
}

function aplicarAppSettingsNaInterface() {
  document.body.dataset.theme = appSettings.theme || "light";
  document.body.dataset.colorScheme = appSettings.colorScheme || "classic";

  if (configDisplayNameInput) {
    configDisplayNameInput.value = nomeUsuarioConfigurado();
  }
  if (configScreenDisplayName) {
    configScreenDisplayName.textContent = nomeUsuarioConfigurado();
  }
  if (configProfilePreview) {
    configProfilePreview.src = appSettings.profilePhoto || DEFAULT_MILITAR_FOTO;
  }
  if (configThemeSelect) {
    configThemeSelect.value = appSettings.theme || "light";
  }
  if (configNotificationsToggle) {
    const ativo = Boolean(appSettings.notificationsEnabled);
    configNotificationsToggle.textContent = ativo ? "Ligado" : "Desligado";
    configNotificationsToggle.classList.toggle("active", ativo);
    configNotificationsToggle.setAttribute("aria-pressed", ativo ? "true" : "false");
  }
  if (configAppVersion) {
    configAppVersion.textContent = `v${APP_VERSION}`;
  }

  const activeScheme = appSettings.colorScheme || "classic";
  if (configColorOptions) {
    Array.from(configColorOptions.querySelectorAll(".config-color-btn")).forEach((button) => {
      button.classList.toggle("active", button.dataset.colorScheme === activeScheme);
    });
  }

  atualizarCabecalhoUsuario();
}

function carregarAppSettings() {
  const salvos = lerAppSettingsSalvos();
  appSettings = {
    displayName: String(salvos?.displayName || "").trim(),
    profilePhoto: String(salvos?.profilePhoto || DEFAULT_MILITAR_FOTO).trim() || DEFAULT_MILITAR_FOTO,
    theme: String(salvos?.theme || "light").trim() || "light",
    colorScheme: String(salvos?.colorScheme || "classic").trim() || "classic",
    notificationsEnabled: salvos?.notificationsEnabled !== false
  };
  aplicarAppSettingsNaInterface();
}

function abrirReportProblemModal() {
  reportProblemDate.value = hojeISODate();
  reportProblemMessage.value = "";
  reportProblemModal.classList.add("active");
  reportProblemModal.setAttribute("aria-hidden", "false");
}

function fecharReportProblemModal() {
  reportProblemModal.classList.remove("active");
  reportProblemModal.setAttribute("aria-hidden", "true");
}

function mostrarPlaceholderConfiguracoes(assunto) {
  window.alert(`${assunto} já ficou preparado no menu e será detalhado na próxima etapa.`);
}

function normalizarPelotaoBucket(valor) {
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
  return PELOTAO_BUCKET_MAP[normalizarPelotaoBucket(pelotao)] || "";
}

function usuarioEhComando() {
  const nivel = String(usuarioConfigAtual?.nivelAcesso || "")
    .trim()
    .toLowerCase();
  return nivel === "comando" || nivel === "admin";
}

function normalizarLabelPelotao(valor) {
  const normalizado = normalizarPelotaoBucket(valor);
  if (!normalizado) return "Sem Pelotao";
  if (normalizado.includes("sec") || normalizado.includes("cmdo") || normalizado.includes("comando")) return "Seç Cmdo";
  if (normalizado.includes("1") && normalizado.includes("pel")) return "1º Pel";
  if (normalizado.includes("2") && normalizado.includes("pel")) return "2º Pel";
  if (normalizado.includes("3") && normalizado.includes("pel")) return "3º Pel";
  if (normalizado.includes("ap")) return "Pel Ap";
  return String(valor || "Sem Pelotao").trim() || "Sem Pelotao";
}

function parseHeaderBucketAndPath(path, pelotao) {
  const raw = String(path || "").trim();
  if (!raw) {
    return { bucket: "", path: "" };
  }

  if (/^https?:\/\//i.test(raw) || /^(\.\/|\/)?assets\//i.test(raw)) {
    return { bucket: "", path: raw };
  }

  const matchBucketPrefix = /^(imagens-[^/]+)\/(.+)$/i.exec(raw);
  if (matchBucketPrefix) {
    return {
      bucket: matchBucketPrefix[1],
      path: matchBucketPrefix[2].replace(/^\/+/, "")
    };
  }

  return {
    bucket: bucketPorPelotao(pelotao),
    path: raw.replace(/^\/+/, "")
  };
}

async function resolverImagemCabecalho(path, pelotao) {
  const raw = String(path || "").trim();
  if (!raw) {
    return DEFAULT_HEADER_LOGO;
  }

  if (/^https?:\/\//i.test(raw) || /^(\.\/|\/)?assets\//i.test(raw)) {
    return raw;
  }

  const client = window.CaveirinhaSupabase?.client;
  if (!client) {
    return DEFAULT_HEADER_LOGO;
  }

  const resolved = parseHeaderBucketAndPath(raw, pelotao);
  if (!resolved.bucket || !resolved.path) {
    return DEFAULT_HEADER_LOGO;
  }

  const cacheKey = cacheKeyStorageUrl("header", resolved.path, resolved.bucket);
  const cached = lerCacheLocal(cacheKey, CACHE_TTL_STORAGE_URL_MS);
  if (cached) {
    return cached;
  }

  try {
    const storage = client.storage.from(resolved.bucket);
    const { data: signedData, error: signedError } = await storage.createSignedUrl(
      resolved.path,
      HEADER_IMAGE_SIGNED_TTL_SECONDS
    );
    if (!signedError && signedData?.signedUrl) {
      salvarCacheLocal(cacheKey, signedData.signedUrl);
      return signedData.signedUrl;
    }

    const { data: publicData } = storage.getPublicUrl(resolved.path);
    const publicUrl = publicData?.publicUrl || "";
    if (publicUrl) {
      salvarCacheLocal(cacheKey, publicUrl);
      return publicUrl;
    }
  } catch (error) {
    console.error("Falha ao resolver imagem de cabecalho:", error);
  }

  return DEFAULT_HEADER_LOGO;
}

async function aplicarConfigVisualUsuario(config) {
  const imagePath = config?.imagemCabecalho || "";
  const url = await resolverImagemCabecalho(imagePath, config?.pelotao || "");
  setHeaderLogoBackground(url);
  setHeaderSubtitle(config?.nomePelotao || config?.pelotao || DEFAULT_HEADER_SUBTITLE);
}

function abrirTelaLogin() {
  loginGate.classList.add("active");
  loginGate.setAttribute("aria-hidden", "false");
  setLoginError("");
}

function fecharTelaLogin() {
  loginGate.classList.remove("active");
  loginGate.setAttribute("aria-hidden", "true");
}

async function efetuarLogin(event) {
  event.preventDefault();
  setLoginError("");

  const email = normalizarEmail(loginEmailInput.value);
  const senha = String(loginPasswordInput.value || "").trim();
  if (!email) {
    setLoginError("Informe email para entrar.");
    return;
  }

  if (!senha) {
    setLoginError("Informe a senha para entrar.");
    return;
  }

  loginSubmitBtn.disabled = true;
  loginSubmitBtn.textContent = "Entrando...";

  try {
    const sessao = await window.CaveirinhaAPI.login({
      email,
      password: senha
    });
    usuarioSessao = sessao?.user || null;
    try {
      usuarioConfigAtual = await window.CaveirinhaAPI.getUserConfig();
    } catch (configError) {
      console.error("Falha ao carregar configuracao do usuario:", configError);
      usuarioConfigAtual = null;
    }
    await aplicarConfigVisualUsuario(usuarioConfigAtual);

    if (loginRememberInput.checked) {
      salvarCredenciaisLembradas(email, senha);
      setManterSessaoAtivo(true);
    } else {
      limparCredenciaisLembradas();
      setManterSessaoAtivo(false);
    }

    fecharTelaLogin();
    await inicializarApp();
  } catch (error) {
    console.error("Falha no login:", error);
    setLoginError("Email ou senha invalidos.");
  } finally {
    loginSubmitBtn.disabled = false;
    loginSubmitBtn.textContent = "Entrar";
  }
}

async function efetuarLogout() {
  encerrarSincronizacaoRealtime();
  limparCacheSessaoAtual();
  try {
    await window.CaveirinhaAPI.logout();
  } catch (error) {
    console.error("Falha ao encerrar sessao:", error);
  }
  setManterSessaoAtivo(false);
  usuarioSessao = null;
  usuarioConfigAtual = null;
  setHeaderLogoBackground(DEFAULT_HEADER_LOGO);
  setHeaderSubtitle(DEFAULT_HEADER_SUBTITLE);
  appJaInicializado = false;
  abrirTelaLogin();
}

async function inicializarAutenticacao() {
  preencherLoginLembrado();

  try {
    const sessao = await window.CaveirinhaAPI.getSession();
    if (sessao?.user) {
      await window.CaveirinhaAPI.logout();
    }
  } catch (error) {
    console.error("Falha ao recuperar sessao:", error);
  }

  usuarioSessao = null;
  usuarioConfigAtual = null;
  abrirTelaLogin();
}

function isSdEv(militar) {
  return militar.pg.trim().toUpperCase() === "SD EV";
}

function militarNomeBase(militar) {
  const partes = [militar.pg];
  if (isSdEv(militar) && militar.numero) {
    partes.push(String(militar.numero));
  }
  partes.push(militar.nomeGuerra);
  return partes.join(" ");
}

function valorCampoExibicao(valor) {
  if (valor === undefined || valor === null || valor === "") {
    return "--";
  }
  return String(valor);
}

function hojeISODate() {
  if (window.CaveirinhaEfetivoService?.hojeIsoDate) {
    return window.CaveirinhaEfetivoService.hojeIsoDate();
  }

  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function isoDoDia(valorData) {
  if (!valorData) {
    return "";
  }
  return `${valorData}T00:00:00.000Z`;
}

function dataInputFromIso(valorData) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(valorData || ""));
  if (!match) {
    return "";
  }
  return `${match[1]}-${match[2]}-${match[3]}`;
}

function formatarDataExibicao(valorData) {
  if (!valorData) {
    return "--";
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(valorData);
  if (match) {
    return `${match[3]}/${match[2]}/${match[1]}`;
  }

  const parsed = new Date(valorData);
  if (Number.isNaN(parsed.getTime())) {
    return String(valorData);
  }

  return parsed.toLocaleDateString("pt-BR");
}

function normalizarTextoBusca(valor) {
  return String(valor || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function parseDateOnly(valorData) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(valorData || ""));
  if (!match) {
    return null;
  }
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function diferencaDiasEntreDatas(dataA, dataB) {
  if (!(dataA instanceof Date) || Number.isNaN(dataA.getTime())) {
    return null;
  }
  if (!(dataB instanceof Date) || Number.isNaN(dataB.getTime())) {
    return null;
  }
  const diaA = new Date(dataA.getFullYear(), dataA.getMonth(), dataA.getDate());
  const diaB = new Date(dataB.getFullYear(), dataB.getMonth(), dataB.getDate());
  return Math.round((diaA.getTime() - diaB.getTime()) / 86400000);
}

function formatarDiasExibicao(valor) {
  const dias = Number(valor || 0);
  return dias > 0 ? String(dias) : "--";
}

function normalizarSituacaoControle(valor) {
  const normalizado = normalizarTextoBusca(valor);
  if (!normalizado) {
    return "";
  }
  if (normalizado.includes("atividade fisica")) {
    return "dispensado_atividade_fisica";
  }
  if (normalizado === "outros" || normalizado === "outro") {
    return "outros";
  }
  if (normalizado.includes("baix")) {
    return "baixado";
  }
  if (normalizado.includes("disp")) {
    return "dispensado";
  }
  if (normalizado.includes("intern")) {
    return "internado";
  }
  if (normalizado.includes("normal")) {
    return "normalidade";
  }
  return normalizado;
}

function statusControleDoRegistro(registro) {
  const situacao = normalizarSituacaoControle(registro?.situacao);
  if (registro?.internado || situacao === "internado") {
    return "internado";
  }
  if (situacao === "dispensado_atividade_fisica" || situacao === "outros") {
    return "dispensado";
  }
  if (registro?.baixado || situacao === "baixado") {
    return "baixado";
  }
  if (registro?.dispensado || situacao === "dispensado") {
    return "dispensado";
  }
  if (situacao === "normalidade") {
    return "normalidade";
  }
  return situacao || "normalidade";
}

function statusDashboardControle(registro) {
  const situacao = normalizarSituacaoControle(registro?.situacao);
  if (situacao === "normalidade" && !registro?.dataInicioAfastamento && !registro?.dataFimAfastamento && !registro?.diasAfastamento) {
    return "normalidade";
  }
  if (situacao === "dispensado" || situacao === "dispensado_atividade_fisica" || situacao === "outros" || registro?.dispensado) {
    return "dispensado";
  }
  if (situacao === "normalidade") {
    return "normalidade";
  }
  if (registro?.internado) {
    return "internado";
  }
  if (situacao) {
    return "baixado";
  }
  if (registro?.dataInicioAfastamento || registro?.dataFimAfastamento || Number(registro?.diasAfastamento || 0) > 0) {
    return "baixado";
  }
  return "normalidade";
}

function labelStatusControle(status) {
  const safeStatus = String(status || "normalidade");
  if (safeStatus === "baixado") return "Baixado";
  if (safeStatus === "dispensado") return "Dispensado";
  if (safeStatus === "internado") return "Internado";
  return "Normalidade";
}

function classeStatusControle(status) {
  const safeStatus = String(status || "normalidade");
  if (safeStatus === "normalidade") return "status-normalidade";
  if (safeStatus === "dispensado") return "status-alerta";
  if (safeStatus === "baixado") return "status-alerta";
  if (safeStatus === "internado") return "status-alerta";
  return "status-alerta";
}

function dataReferenciaControle(registro) {
  return (
    registro?.dataInicioAfastamento ||
    registro?.dataVisita ||
    registro?.createdAt ||
    ""
  );
}

function compararRegistrosControle(a, b) {
  const dataA = parseDateOnly(dataReferenciaControle(a)) || new Date(0);
  const dataB = parseDateOnly(dataReferenciaControle(b)) || new Date(0);
  return dataB.getTime() - dataA.getTime();
}

function statusControleAtual(registro, hoje = new Date()) {
  const status = statusDashboardControle(registro);
  if (status === "normalidade") {
    return "normalidade";
  }
  const dataFim = parseDateOnly(registro?.dataFimAfastamento);
  if (dataFim && diferencaDiasEntreDatas(dataFim, hoje) < 0) {
    return "normalidade";
  }
  return status;
}

function registroControleDefineStatus(registro) {
  return Boolean(
    statusDashboardControle(registro) !== "normalidade" ||
    registro?.dataInicioAfastamento ||
    registro?.dataFimAfastamento ||
    Number(registro?.diasAfastamento || 0) > 0
  );
}

function usuarioPodeVerRegistroControle(registro, militar) {
  if (usuarioEhComando()) {
    return true;
  }
  const pelotaoUsuario = normalizarLabelPelotao(usuarioConfigAtual?.pelotao || "");
  const pelotaoRegistro = normalizarLabelPelotao(
    registro?.pelotao ||
    registro?.rawPayload?.pelotao ||
    registro?.rawPayload?.pel ||
    militar?.pelotao ||
    ""
  );
  return pelotaoUsuario === pelotaoRegistro;
}

function classeProximidadeControle(dataFim, hoje = new Date()) {
  const parsed = parseDateOnly(dataFim);
  if (!parsed) {
    return "";
  }
  const dias = diferencaDiasEntreDatas(parsed, hoje);
  if (dias === null) {
    return "";
  }
  if (dias < 0) {
    return "controle-vencimento-critico";
  }
  if (dias <= 1) {
    return "controle-vencimento-alerta";
  }
  if (dias <= 3) {
    return "controle-vencimento-atencao";
  }
  if (dias <= 7) {
    return "controle-vencimento-proximo";
  }
  return "";
}

function militarPorId(idMilitar) {
  return indiceMilitares.find((item) => item.id === idMilitar) || null;
}

function selecionarMilitarNaFicha(militar) {
  if (!militar) {
    return;
  }
  militarSelecionadoId = militar.id;
  fichaFoto.src = militar.foto || DEFAULT_MILITAR_FOTO;
  fichaNome.textContent = militarNomeBase(militar);
  fichaFuncao.textContent = militar.funcao;
  const whatsappLink = montarLinkWhatsapp(militar);
  fichaWhatsappBtn.classList.toggle("hidden", !whatsappLink);
  fichaWhatsappBtn.onclick = whatsappLink
    ? () => window.open(whatsappLink, "_blank", "noopener")
    : null;
  setScreen("ficha");

  void (async () => {
    try {
      const militarAtualizado = await obterMilitarDetalhadoComCache(militar.id);
      if (!militarAtualizado || militarSelecionadoId !== militar.id) {
        return;
      }

      fichaFoto.src = militarAtualizado.foto || DEFAULT_MILITAR_FOTO;
      fichaNome.textContent = militarNomeBase(militarAtualizado);
      fichaFuncao.textContent = militarAtualizado.funcao;
      const whatsappAtualizado = montarLinkWhatsapp(militarAtualizado);
      fichaWhatsappBtn.classList.toggle("hidden", !whatsappAtualizado);
      fichaWhatsappBtn.onclick = whatsappAtualizado
        ? () => window.open(whatsappAtualizado, "_blank", "noopener")
        : null;
    } catch (error) {
      console.error("Falha ao carregar foto completa da ficha do militar:", error);
    }
  })();
}

function montarResumoControleSanitario() {
  const grupos = new Map();
  controleSanitarioListaCache.forEach((registro) => {
    if (!registro?.idMilitar) {
      return;
    }
    if (!grupos.has(registro.idMilitar)) {
      grupos.set(registro.idMilitar, []);
    }
    grupos.get(registro.idMilitar).push(registro);
  });

  const hoje = new Date();
  const linhas = [];
  const contagem = {
    dispensado: 0,
    baixado: 0,
    internado: 0
  };

  grupos.forEach((registros, idMilitar) => {
    const ordenados = registros.slice().sort(compararRegistrosControle);
    const registroAtual = ordenados.find((item) => registroControleDefineStatus(item)) || ordenados[0];
    if (!registroAtual) {
      return;
    }

    const militar = militarPorId(idMilitar);
    if (!usuarioPodeVerRegistroControle(registroAtual, militar)) {
      return;
    }

    const statusAtual = statusControleAtual(registroAtual, hoje);
    if (statusAtual === "normalidade") {
      return;
    }

    contagem[statusAtual] = Number(contagem[statusAtual] || 0) + 1;
    linhas.push({
      militar,
      registro: registroAtual,
      statusAtual
    });
  });

  linhas.sort((a, b) => {
    const classeA = classeProximidadeControle(a.registro?.dataFimAfastamento);
    const classeB = classeProximidadeControle(b.registro?.dataFimAfastamento);
    const peso = {
      "controle-vencimento-critico": 0,
      "controle-vencimento-alerta": 1,
      "controle-vencimento-atencao": 2,
      "controle-vencimento-proximo": 3,
      "": 4
    };
    const pesoA = peso[classeA] ?? 4;
    const pesoB = peso[classeB] ?? 4;
    if (pesoA !== pesoB) {
      return pesoA - pesoB;
    }
    return compararRegistrosControle(a.registro, b.registro);
  });

  return {
    linhas,
    contagem,
    totalAlterados: linhas.length
  };
}

function normalizarSituacaoEfetivo(valor) {
  const normalized = String(valor || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (!normalized || normalized === "em_forma") return "";
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

function classeSituacaoEfetivo(estado) {
  if (!estado) {
    return "";
  }

  if (estado.emForma || estado.situacao === "em_forma") {
    return "status-verde";
  }

  const situacao = normalizarSituacaoEfetivo(estado.situacao);
  if (["ferias", "dispensado", "missao", "servico", "s_sv"].includes(situacao)) {
    return "status-azul";
  }
  if (["atrasado", "outros"].includes(situacao)) {
    return "status-laranja";
  }
  if (["falta", "baixado"].includes(situacao)) {
    return "status-vermelho";
  }
  return "";
}

function normalizarTipoPunicao(valor) {
  const upper = String(valor || "")
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (upper === "PRISAO") {
    return "PRISAO";
  }
  return tiposPunicao.includes(upper) ? upper : "ADV";
}

function labelPunicao(tipo) {
  const normalizado = normalizarTipoPunicao(tipo);
  const labels = {
    ADV: "Adv",
    IMP: "Imp",
    DET: "Det",
    REP: "Rep",
    PRISAO: "Prisão"
  };
  return labels[normalizado] || "Adv";
}

function classePunicao(tipo) {
  const normalizado = normalizarTipoPunicao(tipo);
  if (normalizado === "DET" || normalizado === "REP") {
    return "orange";
  }
  if (normalizado === "PRISAO") {
    return "red";
  }
  return "normal";
}

function calcularDiasPunicao(dataInicio, dataFim) {
  if (!dataInicio || !dataFim) {
    return 0;
  }

  const inicio = new Date(`${dataInicio}T00:00:00`);
  const fim = new Date(`${dataFim}T00:00:00`);
  if (Number.isNaN(inicio.getTime()) || Number.isNaN(fim.getTime()) || fim < inicio) {
    return 0;
  }

  const diffMs = fim.getTime() - inicio.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function normalizarComportamentoCodigo(valor) {
  const upper = String(valor || "")
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (upper === "OTIMO") return "OTIMO";
  if (upper === "EXCELENTE") return "EXCELENTE";
  if (upper === "BOM") return "BOM";
  if (upper === "INSUFICIENTE") return "INSUFICIENTE";
  if (upper === "MAU") return "MAU";
  return "";
}

function labelComportamento(codigo) {
  const normalizado = normalizarComportamentoCodigo(codigo);
  const labels = {
    EXCELENTE: "EXCELENTE",
    OTIMO: "OTIMO",
    BOM: "BOM",
    INSUFICIENTE: "INSUFICIENTE",
    MAU: "MAU"
  };
  return labels[normalizado] || "BOM";
}

function classeComportamento(codigo) {
  const normalizado = normalizarComportamentoCodigo(codigo);
  if (normalizado === "MAU") return "mau";
  if (normalizado === "INSUFICIENTE") return "insuficiente";
  if (normalizado === "OTIMO" || normalizado === "EXCELENTE") return "bom";
  return "normal";
}

function calcularPrisaoEquivalentePunicoes(registros) {
  let rep = 0;
  let det = 0;
  let prisao = 0;

  (registros || []).forEach((registro) => {
    const tipo = normalizarTipoPunicao(registro.punicao || registro.tipo);
    if (tipo === "REP") rep += 1;
    if (tipo === "DET") det += 1;
    if (tipo === "PRISAO") prisao += 1;
  });

  return prisao + det / 2 + rep / 4;
}

function comportamentoAutomaticoPorPunicoes(registros) {
  const prisaoEquivalente = calcularPrisaoEquivalentePunicoes(registros);
  if (prisaoEquivalente > 2) {
    return "MAU";
  }
  if (prisaoEquivalente >= 2) {
    return "INSUFICIENTE";
  }
  return "";
}

function resolverComportamentoMilitar(manualAtual, registrosPunicoes) {
  const automatico = comportamentoAutomaticoPorPunicoes(registrosPunicoes);
  if (automatico) {
    return automatico;
  }

  const manual = normalizarComportamentoCodigo(manualAtual);
  if (manual === "EXCELENTE" || manual === "OTIMO") {
    return manual;
  }
  return "BOM";
}

function renderComportamentoPunicoes(codigo) {
  if (!punicoesComportamentoValue) {
    return;
  }
  const safeCodigo = comportamentoCodigos.includes(normalizarComportamentoCodigo(codigo))
    ? normalizarComportamentoCodigo(codigo)
    : "BOM";
  punicoesComportamentoValue.textContent = labelComportamento(safeCodigo);
  punicoesComportamentoValue.className = `punicoes-comportamento-value ${classeComportamento(safeCodigo)}`;
}

function normalizarMencao(valor) {
  const upper = String(valor || "").toUpperCase();
  return mencoesOrdenadas.includes(upper) ? upper : "B";
}

function classeMencao(mencao) {
  return `level-${String(mencao || "").toLowerCase()}`;
}

function calcularMencaoFinal(mencoes) {
  const indices = mencoes
    .map((mencao) => mencoesOrdenadas.indexOf(normalizarMencao(mencao)))
    .filter((index) => index >= 0);

  if (!indices.length) {
    return "B";
  }

  const menorIndice = Math.min(...indices);
  return mencoesOrdenadas[menorIndice];
}

function renderTatMencaoChip(mencao) {
  const mencaoNormalizada = normalizarMencao(mencao);
  tatMencaoValue.textContent = mencaoNormalizada;
  tatMencaoValue.className = `tat-mencao-chip ${classeMencao(mencaoNormalizada)}`;
}

function normalizarMencaoTat(valor) {
  const upper = String(valor || "").trim().toUpperCase();
  const mapLegado = {
    A: "MB",
    B: "B",
    C: "R",
    D: "I",
    F: "I"
  };
  return normalizarMencao(mapLegado[upper] || upper);
}

function renderTatEditor(ativo) {
  tatEditorForm.classList.toggle("active", ativo);
  tatEditBtn.classList.toggle("hidden", ativo);
}

function renderDadosMilitarModal(dadosMilitar) {
  dadosModalBody.innerHTML = "";

  camposDadosMilitar.forEach((campo) => {
    const valor = valorCampoExibicao(dadosMilitar[campo.key]);
    const item = document.createElement("article");
    item.className = "dados-item";

    const itemHead = document.createElement("div");
    itemHead.className = "dados-item-head";

    const label = document.createElement("strong");
    label.textContent = campo.label;

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-field-btn";
    copyBtn.textContent = "Copiar";
    copyBtn.dataset.copyValue = valor;

    const valueText = document.createElement("p");
    valueText.textContent = valor;

    itemHead.appendChild(label);
    itemHead.appendChild(copyBtn);
    item.appendChild(itemHead);
    item.appendChild(valueText);
    dadosModalBody.appendChild(item);
  });
}

function abrirModalDados() {
  dadosModal.classList.add("active");
  dadosModal.setAttribute("aria-hidden", "false");
}

function fecharModalDados() {
  dadosModal.classList.remove("active");
  dadosModal.setAttribute("aria-hidden", "true");
}

async function abrirDadosMilitar() {
  if (!militarSelecionadoId) {
    return;
  }

  try {
    const dadosMilitar = await obterMilitarDetalhadoComCache(militarSelecionadoId);
    renderDadosMilitarModal(dadosMilitar);
    abrirModalDados();
  } catch (error) {
    console.error("Falha ao carregar dados do militar:", error);
  }
}

function abrirFoModal() {
  foModal.classList.add("active");
  foModal.setAttribute("aria-hidden", "false");
}

function fecharFoModal() {
  foModal.classList.remove("active");
  foModal.setAttribute("aria-hidden", "true");
}

function abrirFoEditorModal() {
  foEditorModal.classList.add("active");
  foEditorModal.setAttribute("aria-hidden", "false");
}

function fecharFoEditorModal() {
  foEditorModal.classList.remove("active");
  foEditorModal.setAttribute("aria-hidden", "true");
  foEditorForm.reset();
}

function renderFoTabs() {
  [foTabPlus, foTabMinus].forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tipo === foTipoAtivo);
  });
}

function renderFoTabela() {
  foTableBody.innerHTML = "";

  const registros = foListaCache
    .filter((item) => item.idMilitar === militarSelecionadoId && item.tipo === foTipoAtivo)
    .sort((a, b) => String(b.data || "").localeCompare(String(a.data || "")));

  if (!registros.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = '<td class="fo-empty-row" colspan="4">Nenhum fato observado nesta aba.</td>';
    foTableBody.appendChild(tr);
    return;
  }

  registros.forEach((registro) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${valorCampoExibicao(registro.descricao)}</td>
      <td>${valorCampoExibicao(registro.autor)}</td>
      <td>${formatarDataExibicao(registro.data)}</td>
      <td class="fo-actions-cell">
        <button class="fo-action-btn" data-action="copy" data-id="${registro.id}">Copiar</button>
        <button class="fo-action-btn" data-action="edit" data-id="${registro.id}">Editar</button>
        <button class="fo-action-btn warn" data-action="delete" data-id="${registro.id}">Excluir</button>
      </td>
    `;
    foTableBody.appendChild(tr);
  });
}

async function carregarFo() {
  try {
    foListaCache = await window.CaveirinhaAPI.getFO(militarSelecionadoId);
  } catch (error) {
    console.error("Falha ao carregar FO:", error);
    foListaCache = [];
  }
  renderFoTabela();
}

function abrirFoEditor(registro) {
  if (registro) {
    foEditandoId = registro.id;
    foEditandoTipo = registro.tipo || foTipoAtivo;
    foEditorTitle.textContent = "Editar FO";
    foDescricaoInput.value = registro.descricao || "";
    foAutorInput.value = registro.autor || "";
    foDataInput.value = (registro.data || "").slice(0, 10) || hojeISODate();
  } else {
    foEditandoId = null;
    foEditandoTipo = foTipoAtivo;
    foEditorTitle.textContent = "Registrar FO";
    foDescricaoInput.value = "";
    foAutorInput.value = "";
    foDataInput.value = hojeISODate();
  }

  abrirFoEditorModal();
}

async function abrirFatosObservados() {
  if (!militarSelecionadoId) {
    return;
  }

  renderFoTabs();
  abrirFoModal();
  await carregarFo();
}

function abrirHistoricoModal() {
  historicoModal.classList.add("active");
  historicoModal.setAttribute("aria-hidden", "false");
}

function fecharHistoricoModal() {
  historicoModal.classList.remove("active");
  historicoModal.setAttribute("aria-hidden", "true");
}

function abrirHistoricoEditorModal() {
  historicoEditorModal.classList.add("active");
  historicoEditorModal.setAttribute("aria-hidden", "false");
}

function fecharHistoricoEditorModal() {
  historicoEditorModal.classList.remove("active");
  historicoEditorModal.setAttribute("aria-hidden", "true");
  historicoEditorForm.reset();
}

function renderHistoricoTabela() {
  historicoTableBody.innerHTML = "";

  const registros = historicoListaCache
    .filter((item) => item.idMilitar === militarSelecionadoId)
    .sort((a, b) => String(b.data || "").localeCompare(String(a.data || "")));

  if (!registros.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = '<td class="fo-empty-row" colspan="4">Nenhum registro de historico.</td>';
    historicoTableBody.appendChild(tr);
    return;
  }

  registros.forEach((registro) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${valorCampoExibicao(registro.texto)}</td>
      <td>${valorCampoExibicao(registro.autor)}</td>
      <td>${formatarDataExibicao(registro.data)}</td>
      <td class="fo-actions-cell">
        <button class="fo-action-btn" data-action="edit" data-id="${registro.id}">Editar</button>
        <button class="fo-action-btn warn" data-action="delete" data-id="${registro.id}">Excluir</button>
      </td>
    `;
    historicoTableBody.appendChild(tr);
  });
}

async function carregarHistorico() {
  try {
    historicoListaCache = await window.CaveirinhaAPI.getHistoricoObs(militarSelecionadoId);
  } catch (error) {
    console.error("Falha ao carregar historico/obs:", error);
    historicoListaCache = [];
  }
  renderHistoricoTabela();
}

function abrirHistoricoEditor(registro) {
  if (registro) {
    historicoEditandoId = registro.id;
    historicoEditorTitle.textContent = "Editar Registro";
    historicoTextoInput.value = registro.texto || "";
    historicoAutorInput.value = registro.autor || "";
  } else {
    historicoEditandoId = null;
    historicoEditorTitle.textContent = "Novo Registro";
    historicoTextoInput.value = "";
    historicoAutorInput.value = "";
  }
  abrirHistoricoEditorModal();
}

async function abrirHistoricoObs() {
  if (!militarSelecionadoId) {
    return;
  }
  abrirHistoricoModal();
  await carregarHistorico();
}

function abrirPunicoesModal() {
  punicoesModal.classList.add("active");
  punicoesModal.setAttribute("aria-hidden", "false");
}

function fecharPunicoesModal() {
  punicoesModal.classList.remove("active");
  punicoesModal.setAttribute("aria-hidden", "true");
}

function abrirPunicoesEditorModal() {
  punicoesEditorModal.classList.add("active");
  punicoesEditorModal.setAttribute("aria-hidden", "false");
}

function fecharPunicoesEditorModal() {
  punicoesEditorModal.classList.remove("active");
  punicoesEditorModal.setAttribute("aria-hidden", "true");
  punicoesEditorForm.reset();
  punicoesDiasInput.value = "0";
}

function atualizarDiasPunicaoEditor() {
  const dias = calcularDiasPunicao(punicoesInicioInput.value, punicoesFimInput.value);
  punicoesDiasInput.value = String(dias);
}

function renderPunicoesTabela() {
  punicoesTableBody.innerHTML = "";

  const registros = punicoesListaCache
    .filter((item) => item.idMilitar === militarSelecionadoId)
    .sort((a, b) => String(b.dataInicio || "").localeCompare(String(a.dataInicio || "")));

  if (!registros.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = '<td class="fo-empty-row" colspan="6">Nenhuma punição registrada.</td>';
    punicoesTableBody.appendChild(tr);
    return;
  }

  registros.forEach((registro) => {
    const tipo = normalizarTipoPunicao(registro.punicao || registro.tipo);
    const dias = calcularDiasPunicao(registro.dataInicio, registro.dataFim);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${valorCampoExibicao(registro.fato || registro.enquadramento)}</td>
      <td><span class="punicao-chip ${classePunicao(tipo)}">${labelPunicao(tipo)}</span></td>
      <td>${dias}</td>
      <td>${formatarDataExibicao(registro.dataInicio)}</td>
      <td>${formatarDataExibicao(registro.dataFim)}</td>
      <td class="fo-actions-cell">
        <button class="fo-action-btn" data-action="edit" data-id="${registro.id}">Editar</button>
        <button class="fo-action-btn warn" data-action="delete" data-id="${registro.id}">Excluir</button>
      </td>
    `;
    punicoesTableBody.appendChild(tr);
  });
}

async function sincronizarComportamentoPorPunicoes() {
  if (!militarSelecionadoId) {
    return;
  }

  const registrosMilitar = punicoesListaCache.filter((item) => item.idMilitar === militarSelecionadoId);
  let comportamentoManual = "";

  try {
    const dadosMilitar = await obterMilitarDetalhadoComCache(militarSelecionadoId);
    comportamentoManual = dadosMilitar?.comportamento || "";
  } catch (error) {
    console.error("Falha ao carregar comportamento atual do militar:", error);
  }

  const comportamentoFinal = resolverComportamentoMilitar(comportamentoManual, registrosMilitar);
  renderComportamentoPunicoes(comportamentoFinal);

  const comportamentoManualNormalizado = normalizarComportamentoCodigo(comportamentoManual);
  if (comportamentoManualNormalizado === comportamentoFinal) {
    return;
  }

  const payloadPorCodigo = {
    EXCELENTE: "Excelente",
    OTIMO: "Otimo",
    BOM: "Bom",
    INSUFICIENTE: "Insuficiente",
    MAU: "Mau"
  };

  try {
    await window.CaveirinhaAPI.updateMilitarDados(militarSelecionadoId, {
      comportamento: payloadPorCodigo[comportamentoFinal] || "Bom"
    });
    atualizarCacheMilitarDetalhado(militarSelecionadoId, {
      comportamento: payloadPorCodigo[comportamentoFinal] || "Bom"
    });
  } catch (error) {
    console.error("Falha ao persistir comportamento automatico:", error);
  }
}

async function carregarPunicoes() {
  try {
    punicoesListaCache = await window.CaveirinhaAPI.getPunicoes(militarSelecionadoId);
  } catch (error) {
    console.error("Falha ao carregar punicoes:", error);
    punicoesListaCache = [];
  }
  renderPunicoesTabela();
  await sincronizarComportamentoPorPunicoes();
}

function abrirPunicoesEditor(registro) {
  if (registro) {
    punicoesEditandoId = registro.id;
    punicoesEditorTitle.textContent = "Editar Punição";
    punicoesFatoInput.value = registro.fato || registro.enquadramento || "";
    punicoesTipoInput.value = normalizarTipoPunicao(registro.punicao || registro.tipo);
    punicoesInicioInput.value = (registro.dataInicio || "").slice(0, 10) || hojeISODate();
    punicoesFimInput.value = (registro.dataFim || "").slice(0, 10) || hojeISODate();
  } else {
    punicoesEditandoId = null;
    punicoesEditorTitle.textContent = "Registrar Punição";
    punicoesFatoInput.value = "";
    punicoesTipoInput.value = "ADV";
    punicoesInicioInput.value = hojeISODate();
    punicoesFimInput.value = hojeISODate();
  }

  atualizarDiasPunicaoEditor();
  abrirPunicoesEditorModal();
}

async function abrirPunicoes() {
  if (!militarSelecionadoId) {
    return;
  }
  renderComportamentoPunicoes("BOM");
  abrirPunicoesModal();
  await carregarPunicoes();
}

function abrirTafModal() {
  tafModal.classList.add("active");
  tafModal.setAttribute("aria-hidden", "false");
}

function fecharTafModal() {
  tafModal.classList.remove("active");
  tafModal.setAttribute("aria-hidden", "true");
}

function abrirTafEditorModal() {
  tafEditorModal.classList.add("active");
  tafEditorModal.setAttribute("aria-hidden", "false");
}

function fecharTafEditorModal() {
  tafEditorModal.classList.remove("active");
  tafEditorModal.setAttribute("aria-hidden", "true");
  tafEditorForm.reset();
}

function renderTafDashboard() {
  tafCardsWrap.innerHTML = "";

  tafDashboardCache.forEach((item) => {
    const barra = normalizarMencao(item.mencoes.barra);
    const flexao = normalizarMencao(item.mencoes.flexao);
    const abdominal = normalizarMencao(item.mencoes.abdominal);
    const corrida = normalizarMencao(item.mencoes.corrida);
    const mencaoFinal = calcularMencaoFinal([barra, flexao, abdominal, corrida]);

    const card = document.createElement("article");
    card.className = "taf-card";
    card.innerHTML = `
      <div class="taf-card-head">
        <strong>${item.ciclo}º TAF</strong>
        <button class="taf-edit-btn" data-ciclo="${item.ciclo}">Atualizar</button>
      </div>
      <small class="taf-card-date">Data: ${formatarDataExibicao(item.data)}</small>
      <div class="taf-row"><b>Barra</b><span class="mencao-chip ${classeMencao(barra)}">${barra}</span></div>
      <div class="taf-row"><b>Flexão</b><span class="mencao-chip ${classeMencao(flexao)}">${flexao}</span></div>
      <div class="taf-row"><b>Abdominal</b><span class="mencao-chip ${classeMencao(abdominal)}">${abdominal}</span></div>
      <div class="taf-row"><b>Corrida</b><span class="mencao-chip ${classeMencao(corrida)}">${corrida}</span></div>
      <div class="taf-row final"><b>Menção Final</b><span class="mencao-chip ${classeMencao(mencaoFinal)}">${mencaoFinal}</span></div>
    `;
    tafCardsWrap.appendChild(card);
  });
}

async function carregarTafDashboard() {
  try {
    tafDashboardCache = await window.CaveirinhaAPI.getTAFDashboard(militarSelecionadoId);
  } catch (error) {
    console.error("Falha ao carregar dashboard TAF:", error);
    tafDashboardCache = [];
  }
  renderTafDashboard();
}

function abrirTafEditor(ciclo) {
  tafEditandoCiclo = ciclo;
  const atual = tafDashboardCache.find((item) => item.ciclo === ciclo) || {
    ciclo,
    data: hojeISODate(),
    mencoes: { barra: "B", flexao: "B", abdominal: "B", corrida: "B" }
  };

  tafEditorTitle.textContent = `Atualizar ${ciclo}º TAF`;
  tafDataInput.value = (atual.data || hojeISODate()).slice(0, 10);
  tafBarraInput.value = normalizarMencao(atual.mencoes.barra);
  tafFlexaoInput.value = normalizarMencao(atual.mencoes.flexao);
  tafAbdominalInput.value = normalizarMencao(atual.mencoes.abdominal);
  tafCorridaInput.value = normalizarMencao(atual.mencoes.corrida);
  abrirTafEditorModal();
}

async function abrirDashboardTaf() {
  if (!militarSelecionadoId) {
    return;
  }
  abrirTafModal();
  await carregarTafDashboard();
}

function abrirTatModal() {
  tatModal.classList.add("active");
  tatModal.setAttribute("aria-hidden", "false");
}

function fecharTatModal() {
  tatModal.classList.remove("active");
  tatModal.setAttribute("aria-hidden", "true");
}

function mencaoTatRegistro(registro) {
  return normalizarMencaoTat(registro?.mencao || registro?.classificacao || registro?.resultado);
}

async function carregarTat() {
  try {
    tatListaCache = await window.CaveirinhaAPI.getTAT(militarSelecionadoId);
  } catch (error) {
    console.error("Falha ao carregar TAT:", error);
    tatListaCache = [];
  }
}

async function abrirTat() {
  if (!militarSelecionadoId) {
    return;
  }

  abrirTatModal();
  renderTatEditor(false);
  await carregarTat();

  const registrosMilitar = tatListaCache
    .filter((item) => item.idMilitar === militarSelecionadoId)
    .sort((a, b) => {
      const dataA = String(a.data || a.lastUpdate || "");
      const dataB = String(b.data || b.lastUpdate || "");
      return dataB.localeCompare(dataA);
    });

  tatRegistroAtual = registrosMilitar.length ? registrosMilitar[0] : null;
  const mencao = tatRegistroAtual ? mencaoTatRegistro(tatRegistroAtual) : "B";
  const armamento = tatRegistroAtual?.armamento ? String(tatRegistroAtual.armamento) : "--";
  tatArmamentoValue.textContent = armamento;
  tatMencaoInput.value = mencao;
  renderTatMencaoChip(mencao);
}

function construirOrganizacao(militares) {
  const grupos = new Map();
  const ordemFracoes = [
    { match: (v) => v.includes("cmt") && v.includes("pel") },
    { match: (v) => v.includes("tu") && (v.includes("cmdo") || v.includes("cdo") || v.includes("comando")) },
    { match: (v) => /(^| )1 ?gc($| )/.test(v) },
    { match: (v) => /(^| )2 ?gc($| )/.test(v) },
    { match: (v) => /(^| )3 ?gc($| )/.test(v) }
  ];
  const ordemPelotoes = [
    { match: (v) => v.includes("sec") || v.includes("cmdo") || v.includes("comando") },
    { match: (v) => v.includes("1") && v.includes("pel") },
    { match: (v) => v.includes("2") && v.includes("pel") },
    { match: (v) => v.includes("3") && v.includes("pel") },
    { match: (v) => v.includes("ap") }
  ];
  const normalizarFracao = (valor) =>
    String(valor || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[º°]/g, "")
      .replace(/\s+/g, " ");

  const prioridadeFracao = (aba) => {
    const normalizada = normalizarFracao(aba);
    const idx = ordemFracoes.findIndex((item) => item.match(normalizada));
    if (idx >= 0) {
      return idx;
    }
    return ordemFracoes.length + 1;
  };

  const prioridadePelotao = (aba) => {
    const normalizada = normalizarPelotaoBucket(aba);
    const idx = ordemPelotoes.findIndex((item) => item.match(normalizada));
    if (idx >= 0) {
      return idx;
    }
    return ordemPelotoes.length + 1;
  };

  militares.forEach((militar) => {
    const aba = usuarioEhComando()
      ? normalizarLabelPelotao(militar.pelotao)
      : (militar.aba || "Sem Aba");

    if (!grupos.has(aba)) {
      grupos.set(aba, []);
    }
    grupos.get(aba).push({
      id: militar.id,
      pg: militar.pg,
      numero: militar.numero,
      nomeGuerra: militar.nomeGuerra,
      funcao: militar.funcao,
      fracao: militar.fracao,
      pelotao: normalizarLabelPelotao(militar.pelotao),
      celular: militar.celular,
      foto: militar.foto || DEFAULT_MILITAR_FOTO,
      lastUpdate: militar.lastUpdate
    });
  });

  return Array.from(grupos.entries())
    .sort((a, b) => {
      const prioridadeA = usuarioEhComando() ? prioridadePelotao(a[0]) : prioridadeFracao(a[0]);
      const prioridadeB = usuarioEhComando() ? prioridadePelotao(b[0]) : prioridadeFracao(b[0]);
      if (prioridadeA !== prioridadeB) {
        return prioridadeA - prioridadeB;
      }
      return String(a[0]).localeCompare(String(b[0]), "pt-BR");
    })
    .map(([aba, militaresDaAba]) => ({
      aba,
      militares: militaresDaAba
    }));
}

function reconstruirIndices() {
  cardIdToMilitarId.clear();
  indiceMilitares = organizacao.flatMap((grupo, abaIndex) =>
    grupo.militares.map((militar, militarIndex) => {
      const cardId = `${abaIndex}-${militarIndex}`;
      const numeroBusca = isSdEv(militar) && militar.numero ? String(militar.numero) : "";
      cardIdToMilitarId.set(cardId, militar.id);
      return {
        ...militar,
        aba: grupo.aba,
        abaIndex,
        militarIndex,
        cardId,
        searchText: normalizarTextoBusca(`${militar.pg} ${militar.nomeGuerra} ${militar.funcao} ${numeroBusca}`)
      };
    })
  );
}

function sincronizarEfetivoState(efetivoRegistros, dataSelecionada) {
  efetivoState.clear();

  const efetivoPorMilitar = new Map(
    efetivoRegistros.map((item) => [item.idMilitar, item])
  );

  indiceMilitares.forEach((militar) => {
    const registro = efetivoPorMilitar.get(militar.id);
    if (!registro) {
      efetivoState.set(militar.cardId, {
        emForma: false,
        situacao: "",
        dataAtualizacao: ""
      });
      return;
    }

    const emForma = Boolean(registro.emForma) || registro.situacao === "em_forma";
    efetivoState.set(militar.cardId, {
      emForma,
      situacao: emForma ? "em_forma" : normalizarSituacaoEfetivo(registro.situacao),
      dataAtualizacao: registro.dataAtualizacao || ""
    });
  });

  const primeiraData = Array.from(efetivoState.values()).find((estado) => estado.dataAtualizacao);
  const dataPadrao = String(dataSelecionada || "").trim();
  efetivoDataInput.value = dataInputFromIso(primeiraData ? primeiraData.dataAtualizacao : "") || dataPadrao || hojeISODate();
}

function tabsRenderKey() {
  return JSON.stringify({
    abaAtiva,
    grupos: organizacao.map((grupo) => grupo.aba)
  });
}

function cardsRenderKey() {
  const grupoAtivo = organizacao[abaAtiva];
  return JSON.stringify({
    abaAtiva,
    aba: grupoAtivo?.aba || "",
    militares: (grupoAtivo?.militares || []).map((militar) => [
      militar.id,
      militar.pg,
      militar.numero,
      militar.nomeGuerra,
      militar.funcao
    ])
  });
}

function efetivoTabsRenderKey() {
  return JSON.stringify({
    comando: usuarioEhComando(),
    ativo: efetivoPelotaoAtivo,
    pelotoes: Array.from(
      new Set(indiceMilitares.map((militar) => normalizarLabelPelotao(militar.pelotao)))
    ).sort((a, b) => a.localeCompare(b, "pt-BR"))
  });
}

function efetivoRenderKey() {
  return JSON.stringify({
    ativo: efetivoPelotaoAtivo,
    visiveis: militaresFiltradosEfetivo().map((militar) => {
      const estado = efetivoState.get(militar.cardId);
      return [
        militar.cardId,
        militar.pg,
        militar.nomeGuerra,
        militar.numero,
        estado?.emForma || false,
        estado?.situacao || ""
      ];
    })
  });
}

function setScreen(screen) {
  quadroScreen.classList.remove("active");
  efetivoScreen.classList.remove("active");
  controleScreen.classList.remove("active");
  missoesScreen.classList.remove("active");
  configScreen.classList.remove("active");
  fichaScreen.classList.remove("active");

  if (screen === "quadro") {
    quadroScreen.classList.add("active");
    screenTitle.textContent = "Quadro Organizacional";
  }

  if (screen === "efetivo") {
    efetivoScreen.classList.add("active");
    screenTitle.textContent = "Efetivo";
    renderEfetivoTabs();
  }

  if (screen === "ficha") {
    fichaScreen.classList.add("active");
    screenTitle.textContent = "Ficha do Militar";
  }

  if (screen === "controle") {
    controleScreen.classList.add("active");
    screenTitle.textContent = "Controle Sanitário";
    void carregarControleSanitario();
  }

  if (screen === "missoes") {
    missoesScreen.classList.add("active");
    screenTitle.textContent = "Missões";
  }

  if (screen === "config") {
    configScreen.classList.add("active");
    screenTitle.textContent = "Configurações";
    aplicarAppSettingsNaInterface();
  }
}

function renderTabs() {
  const renderKey = tabsRenderKey();
  if (renderKey === lastTabsRenderKey) {
    return;
  }
  lastTabsRenderKey = renderKey;
  tabsContainer.innerHTML = "";

  if (!organizacao.length) {
    const empty = document.createElement("div");
    empty.className = "search-result-empty";
    empty.textContent = "Nenhuma aba encontrada.";
    tabsContainer.appendChild(empty);
    return;
  }

  abaAtiva = Math.max(0, Math.min(abaAtiva, organizacao.length - 1));

  organizacao.forEach((grupo, index) => {
    const btn = document.createElement("button");
    btn.className = `tab-btn ${index === abaAtiva ? "active" : ""}`;
    btn.textContent = grupo.aba;
    btn.addEventListener("click", () => {
      abaAtiva = index;
      renderTabs();
      renderCards();
    });
    tabsContainer.appendChild(btn);
  });
}

function renderCards() {
  const renderKey = cardsRenderKey();
  if (renderKey === lastCardsRenderKey) {
    return;
  }
  lastCardsRenderKey = renderKey;
  cardsArea.innerHTML = "";

  if (!organizacao.length || !organizacao[abaAtiva]) {
    cardsArea.innerHTML = '<div class="search-result-empty">Sem militares para exibir.</div>';
    return;
  }

  organizacao[abaAtiva].militares.forEach((militar, index) => {
    const card = document.createElement("button");
    card.className = "card-militar";
    card.dataset.cardId = `${abaAtiva}-${index}`;
    card.style.animationDelay = `${index * 0.08}s`;

    const numeroCard = militar.numero ? String(militar.numero) : "";
    card.innerHTML = `
      <div>
        <div class="militar-linha-principal">
          <strong class="militar-pg">${militar.pg}</strong>
          ${numeroCard ? `<span class="militar-numero">${numeroCard}</span>` : ""}
          <strong class="militar-nome">${militar.nomeGuerra}</strong>
        </div>
        <p>${militar.funcao}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      selecionarMilitarNaFicha(militar);
    });

    cardsArea.appendChild(card);
  });
}

function setMenuAtivo(screen) {
  menuItems.forEach((btn) => btn.classList.remove("active"));
  const alvo = Array.from(menuItems).find((item) => item.dataset.screen === screen);
  if (alvo) {
    alvo.classList.add("active");
  }
}

function renderResultadosBusca(termo) {
  const filtro = normalizarTextoBusca(termo);
  searchResults.innerHTML = "";

  if (!filtro) {
    searchResults.innerHTML = '<div class="search-result-empty">Digite para pesquisar.</div>';
    return;
  }

  const encontrados = indiceMilitares.filter((item) => {
    return String(item.searchText || "").includes(filtro);
  });

  if (!encontrados.length) {
    searchResults.innerHTML = '<div class="search-result-empty">Nenhum militar encontrado.</div>';
    return;
  }

  encontrados.forEach((item) => {
    const botao = document.createElement("button");
    botao.className = "search-result-item";
    botao.innerHTML = `
      <strong>${militarNomeBase(item)}</strong>
      <small>${item.funcao} - ${item.aba}</small>
    `;
    botao.addEventListener("click", () => {
      abaAtiva = item.abaIndex;
      setMenuAtivo("quadro");
      setScreen("quadro");
      renderTabs();
      renderCards();

      const card = document.querySelector(`[data-card-id="${item.cardId}"]`);
      if (card) {
        if (ultimoCardEncontrado) {
          ultimoCardEncontrado.classList.remove("found");
        }
        card.classList.add("found");
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        ultimoCardEncontrado = card;
      }

      fecharBusca();
    });
    searchResults.appendChild(botao);
  });
}

function agendarRenderBusca() {
  if (searchRenderHandle) {
    window.clearTimeout(searchRenderHandle);
  }

  searchRenderHandle = window.setTimeout(() => {
    searchRenderHandle = null;
    renderResultadosBusca(searchInput.value);
  }, SEARCH_DEBOUNCE_MS);
}

function abrirBusca() {
  searchPanel.classList.add("active");
  searchPanel.setAttribute("aria-hidden", "false");
  renderResultadosBusca(searchInput.value);
  searchInput.focus();
}

function fecharBusca() {
  searchPanel.classList.remove("active");
  searchPanel.setAttribute("aria-hidden", "true");
  if (searchRenderHandle) {
    window.clearTimeout(searchRenderHandle);
    searchRenderHandle = null;
  }
}

function atualizarResumoEfetivo() {
  if (kpiTotalLabel) {
    kpiTotalLabel.textContent = usuarioEhComando() ? "Total na Cia" : "Total no pelotão";
  }

  const total = indiceMilitares.length;
  let emForma = 0;
  let destinos = 0;
  let baixados = 0;

  efetivoState.forEach((estado) => {
    if (estado.emForma) {
      emForma += 1;
      return;
    }
    if (opcoesSituacao.includes(estado.situacao)) {
      destinos += 1;
      if (estado.situacao === "baixado") {
        baixados += 1;
      }
    }
  });

  kpiTotalPelotao.textContent = String(total);
  kpiEmForma.textContent = String(emForma);
  kpiDestinos.textContent = String(destinos);
  kpiBaixados.textContent = `Baixados: ${baixados}`;
}

function militaresFiltradosEfetivo() {
  if (!usuarioEhComando() || efetivoPelotaoAtivo === "__todos__") {
    return indiceMilitares;
  }
  return indiceMilitares.filter(
    (militar) => normalizarLabelPelotao(militar.pelotao) === efetivoPelotaoAtivo
  );
}

function renderEfetivoTabs() {
  if (!efetivoTabsContainer) {
    return;
  }

  const renderKey = efetivoTabsRenderKey();
  if (renderKey === lastEfetivoTabsRenderKey) {
    return;
  }
  lastEfetivoTabsRenderKey = renderKey;

  if (!usuarioEhComando()) {
    efetivoTabsContainer.classList.remove("active");
    efetivoTabsContainer.innerHTML = "";
    efetivoPelotaoAtivo = "__todos__";
    return;
  }

  const pelotoes = Array.from(
    new Set(indiceMilitares.map((militar) => normalizarLabelPelotao(militar.pelotao)))
  );

  const ordem = ["Seç Cmdo", "1º Pel", "2º Pel", "3º Pel", "Pel Ap"];
  pelotoes.sort((a, b) => {
    const ia = ordem.indexOf(a);
    const ib = ordem.indexOf(b);
    const pa = ia >= 0 ? ia : ordem.length + 1;
    const pb = ib >= 0 ? ib : ordem.length + 1;
    if (pa !== pb) return pa - pb;
    return a.localeCompare(b, "pt-BR");
  });

  if (
    efetivoPelotaoAtivo !== "__todos__" &&
    !pelotoes.includes(efetivoPelotaoAtivo)
  ) {
    efetivoPelotaoAtivo = "__todos__";
  }

  efetivoTabsContainer.innerHTML = "";
  efetivoTabsContainer.classList.add("active");

  const botoes = ["__todos__", ...pelotoes];
  botoes.forEach((pelotao) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = `efetivo-tab-btn ${efetivoPelotaoAtivo === pelotao ? "active" : ""}`;
    botao.textContent = pelotao === "__todos__" ? "Todos" : pelotao;
    botao.addEventListener("click", () => {
      efetivoPelotaoAtivo = pelotao;
      renderEfetivoTabs();
      renderEfetivo();
    });
    efetivoTabsContainer.appendChild(botao);
  });
}

function atualizarLinhaEfetivo(cardId) {
  const estado = efetivoState.get(cardId);
  const checkbox = efetivoTableBody.querySelector(`.efetivo-check[data-id="${cardId}"]`);
  const select = efetivoTableBody.querySelector(`.status-select[data-id="${cardId}"]`);
  if (!estado || !checkbox || !select) {
    return;
  }

  if (estado.emForma) {
    checkbox.checked = true;
    select.value = "";
    if (select.options[0]) {
      select.options[0].textContent = "Em forma";
    }
    select.disabled = true;
    select.classList.remove("status-verde", "status-azul", "status-laranja", "status-vermelho");
    select.classList.add("status-verde");
    return;
  }

  checkbox.checked = false;
  select.disabled = false;
  if (select.options[0]) {
    select.options[0].textContent = "Selecionar situacao";
  }
  select.value = normalizarSituacaoEfetivo(estado.situacao);
  select.classList.remove("status-verde", "status-azul", "status-laranja", "status-vermelho");
  const classe = classeSituacaoEfetivo(estado);
  if (classe) {
    select.classList.add(classe);
  }
}

function renderEfetivo() {
  const renderKey = efetivoRenderKey();
  if (renderKey === lastEfetivoRenderKey) {
    atualizarResumoEfetivo();
    return;
  }
  lastEfetivoRenderKey = renderKey;
  efetivoTableBody.innerHTML = "";
  const militaresVisiveis = militaresFiltradosEfetivo();

  militaresVisiveis.forEach((militar) => {
    const estado = efetivoState.get(militar.cardId);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="efetivo-check-cell">
        <input class="efetivo-check" type="checkbox" data-id="${militar.cardId}" ${estado && estado.emForma ? "checked" : ""} />
      </td>
      <td>
        <span class="efetivo-linha">${militarNomeBase(militar)}</span>
      </td>
      <td>
        <select class="status-select" data-id="${militar.cardId}" ${estado && estado.emForma ? "disabled" : ""}>
          <option value="">Selecionar situacao</option>
          <option value="ferias">Ferias</option>
          <option value="dispensado">Dispensado</option>
          <option value="missao">Missao</option>
          <option value="servico">Servico</option>
          <option value="s_sv">S Sv</option>
          <option value="atrasado">Atrasado</option>
          <option value="outros">Outros</option>
          <option value="falta">Falta</option>
          <option value="baixado">Baixado</option>
        </select>
      </td>
    `;
    efetivoTableBody.appendChild(tr);
    atualizarLinhaEfetivo(militar.cardId);
  });

  atualizarResumoEfetivo();
}

function renderControleSanitario() {
  if (!controleTableBody) {
    return;
  }

  const resumo = montarResumoControleSanitario();

  if (controleKpiDispensados) {
    controleKpiDispensados.textContent = String(resumo.contagem.dispensado || 0);
  }
  if (controleKpiBaixados) {
    controleKpiBaixados.textContent = String(resumo.contagem.baixado || 0);
  }
  if (controleKpiInternados) {
    controleKpiInternados.textContent = String(resumo.contagem.internado || 0);
  }
  if (controlePelotaoHead) {
    controlePelotaoHead.hidden = !usuarioEhComando();
  }
  controleTableBody.innerHTML = "";

  if (!resumo.linhas.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="${usuarioEhComando() ? 9 : 8}" class="fo-empty-row">Nenhum militar fora da normalidade.</td>`;
    controleTableBody.appendChild(tr);
    return;
  }

  resumo.linhas.forEach(({ militar, registro, statusAtual }) => {
    const tr = document.createElement("tr");
    const classeProximidade = classeProximidadeControle(registro.dataFimAfastamento);
    if (classeProximidade) {
      tr.classList.add(classeProximidade);
    }

    tr.innerHTML = `
      <td>${militar?.pg || "--"}</td>
      <td>${militar?.nomeGuerra || registro.rawPayload?.nomeGuerra || "--"}</td>
      ${usuarioEhComando() ? `<td>${militar?.pelotao || registro.pelotao || "--"}</td>` : ""}
      <td>${registro.motivo || "--"}</td>
      <td><span class="controle-status-badge ${classeStatusControle(statusAtual)}">${labelStatusControle(statusAtual)}</span></td>
      <td>${formatarDataExibicao(registro.dataInicioAfastamento || registro.dataVisita)}</td>
      <td>${formatarDataExibicao(registro.dataFimAfastamento)}</td>
      <td>${formatarDiasExibicao(registro.diasAfastamento)}</td>
      <td>
        <div class="fo-actions-cell">
          <button type="button" class="fo-action-btn" data-action="ficha-medica" data-id="${registro.idMilitar}">Ficha Médica</button>
        </div>
      </td>
    `;
    controleTableBody.appendChild(tr);
  });
}

async function carregarControleSanitario(options = {}) {
  const force = Boolean(options.force);
  if (!force && controleSanitarioListaCache.length) {
    renderControleSanitario();
    return;
  }

  try {
    controleSanitarioListaCache = await window.CaveirinhaAPI.getControleSanitario();
  } catch (error) {
    console.error("Falha ao carregar controle sanitario:", error);
    controleSanitarioListaCache = [];
  }

  renderControleSanitario();
}

async function obterRegistrosControleSanitarioPorMilitar(idMilitar, options = {}) {
  const safeId = String(idMilitar || "").trim();
  if (!safeId) {
    return [];
  }

  const force = Boolean(options.force);
  if (!force && controleSanitarioListaCache.length) {
    return controleSanitarioListaCache.filter((item) => item.idMilitar === safeId);
  }

  try {
    return await window.CaveirinhaAPI.getControleSanitario(safeId);
  } catch (error) {
    console.error("Falha ao carregar controle sanitario por militar:", error);
    return [];
  }
}

function abrirFichaMedicaModal() {
  fichaMedicaModal.classList.add("active");
  fichaMedicaModal.setAttribute("aria-hidden", "false");
}

function fecharFichaMedicaModal() {
  fichaMedicaModal.classList.remove("active");
  fichaMedicaModal.setAttribute("aria-hidden", "true");
}

async function abrirFichaMedica(idMilitar = militarSelecionadoId) {
  const safeId = String(idMilitar || "").trim();
  if (!safeId) {
    return;
  }

  const registros = (await obterRegistrosControleSanitarioPorMilitar(safeId))
    .filter((item) => usuarioPodeVerRegistroControle(item, militarPorId(safeId)))
    .sort(compararRegistrosControle);

  const registroAtual = registros.find((item) => registroControleDefineStatus(item)) || null;
  const statusAtual = registroAtual ? statusControleAtual(registroAtual) : "normalidade";

  fichaMedicaStatusBadge.textContent = labelStatusControle(statusAtual);
  fichaMedicaStatusBadge.className = `controle-status-badge ${classeStatusControle(statusAtual)}`;

  fichaMedicaTableBody.innerHTML = "";

  if (!registros.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = '<td colspan="9" class="fo-empty-row">Nenhum atendimento encontrado para este militar.</td>';
    fichaMedicaTableBody.appendChild(tr);
    abrirFichaMedicaModal();
    return;
  }

  registros.forEach((registro) => {
    const tr = document.createElement("tr");
    const statusLinha = statusDashboardControle(registro);
    tr.innerHTML = `
      <td>${formatarDataExibicao(registro.dataVisita)}</td>
      <td><span class="controle-status-badge ${classeStatusControle(statusLinha)}">${labelStatusControle(statusLinha)}</span></td>
      <td>${registro.motivo || "--"}</td>
      <td>${registro.prescricao || "--"}</td>
      <td>${formatarDataExibicao(registro.dataInicioAfastamento)}</td>
      <td>${formatarDataExibicao(registro.dataFimAfastamento)}</td>
      <td>${formatarDiasExibicao(registro.diasAfastamento)}</td>
      <td>${registro.atendidoPor || "--"}</td>
      <td>${registro.observacao || "--"}</td>
    `;
    fichaMedicaTableBody.appendChild(tr);
  });

  abrirFichaMedicaModal();
}

async function persistirEfetivo(cardId) {
  const estado = efetivoState.get(cardId);
  const idMilitar = cardIdToMilitarId.get(cardId);
  if (!estado || !idMilitar) {
    return;
  }

  try {
    const dataSelecionada = efetivoDataInput.value || hojeISODate();
    await window.CaveirinhaAPI.updateEfetivo({
      idMilitar,
      emForma: estado.emForma,
      situacao: estado.emForma ? "em_forma" : normalizarSituacaoEfetivo(estado.situacao),
      dataAtualizacao: isoDoDia(dataSelecionada)
    });
  } catch (error) {
    console.error("Falha ao atualizar efetivo na API layer:", error);
    window.alert("Nao foi possivel sincronizar o efetivo com o Supabase. Verifique as funcoes SQL, o RLS da tabela efetivo e tente novamente.");
  }
}

async function carregarEfetivoDataSelecionada() {
  const dataSelecionada = efetivoDataInput.value || hojeISODate();
  efetivoDataInput.value = dataSelecionada;

  try {
    const efetivo = await obterEfetivoComCache(dataSelecionada, { force: true });
    sincronizarEfetivoState(efetivo, dataSelecionada);
    renderEfetivoTabs();
    renderEfetivo();
  } catch (error) {
    console.error("Falha ao consultar efetivo da data selecionada:", error);
  }
}

async function recarregarEfetivoSincronizado() {
  try {
    const dataSelecionada = efetivoDataInput.value || hojeISODate();
    const efetivo = await obterEfetivoComCache(dataSelecionada, { force: true });
    sincronizarEfetivoState(efetivo, dataSelecionada);
    renderEfetivoTabs();
    renderEfetivo();
  } catch (error) {
    console.error("Falha ao recarregar efetivo sincronizado:", error);
  }
}

async function recarregarQuadroSincronizado() {
  try {
    const militares = await obterMilitaresComCache({ force: true });
    organizacao = construirOrganizacao(militares);
    reconstruirIndices();

    const dataSelecionada = efetivoDataInput.value || hojeISODate();
    const efetivo = await obterEfetivoComCache(dataSelecionada, { force: true });
    sincronizarEfetivoState(efetivo, dataSelecionada);

    renderTabs();
    renderCards();
    renderEfetivoTabs();
    renderEfetivo();
  } catch (error) {
    console.error("Falha ao recarregar quadro sincronizado:", error);
  }
}

function agendarRecarregamentoRealtime(tipo) {
  if (realtimeRefreshHandle) {
    window.clearTimeout(realtimeRefreshHandle);
  }

  realtimeRefreshHandle = window.setTimeout(() => {
    realtimeRefreshHandle = null;
    if (tipo === "quadro") {
      void recarregarQuadroSincronizado();
      return;
    }
    void recarregarEfetivoSincronizado();
  }, 250);
}

function inicializarSincronizacaoRealtime() {
  if (
    !window.CaveirinhaEfetivoService ||
    typeof window.CaveirinhaEfetivoService.subscribeRealtime !== "function"
  ) {
    return;
  }

  window.CaveirinhaEfetivoService.subscribeRealtime((evento) => {
    if (!appJaInicializado || !usuarioSessao) {
      return;
    }
    const tipo = evento?.origem === "quadro_organizacional" ? "quadro" : "efetivo";
    const aplicado = tipo === "quadro"
      ? aplicarEventoRealtimeQuadro(evento?.payload)
      : aplicarEventoRealtimeEfetivo(evento?.payload);

    if (!aplicado) {
      agendarRecarregamentoRealtime(tipo);
    }
  });
}

function encerrarSincronizacaoRealtime() {
  if (realtimeRefreshHandle) {
    window.clearTimeout(realtimeRefreshHandle);
    realtimeRefreshHandle = null;
  }

  if (
    window.CaveirinhaEfetivoService &&
    typeof window.CaveirinhaEfetivoService.unsubscribeRealtime === "function"
  ) {
    window.CaveirinhaEfetivoService.unsubscribeRealtime();
  }
}

function atualizarVisibilidadeBarraIcones() {
  if (!iconSidebar) {
    return;
  }

  const scrollAtual = window.scrollY || 0;
  const delta = scrollAtual - ultimoScrollY;

  if (scrollAtual <= 12 || delta < -6) {
    iconSidebar.classList.remove("nav-hidden");
  } else if (delta > 6) {
    iconSidebar.classList.add("nav-hidden");
  }

  ultimoScrollY = scrollAtual;
}

efetivoTableBody.addEventListener("change", (event) => {
  const alvo = event.target;
  if (!(alvo instanceof HTMLElement)) {
    return;
  }

  if (alvo.classList.contains("efetivo-check")) {
    const id = alvo.dataset.id;
    const estado = efetivoState.get(id);
    if (!estado) {
      return;
    }

    if (alvo.checked) {
      estado.emForma = true;
      estado.situacao = "em_forma";
    } else {
      estado.emForma = false;
      estado.situacao = "";
    }
    estado.dataAtualizacao = isoDoDia(efetivoDataInput.value || hojeISODate());

    atualizarLinhaEfetivo(id);
    atualizarResumoEfetivo();
    void persistirEfetivo(id);
    return;
  }

  if (alvo.classList.contains("status-select")) {
    const id = alvo.dataset.id;
    const estado = efetivoState.get(id);
    if (!estado) {
      return;
    }

    estado.situacao = normalizarSituacaoEfetivo(alvo.value);
    estado.emForma = false;
    estado.dataAtualizacao = isoDoDia(efetivoDataInput.value || hojeISODate());
    atualizarLinhaEfetivo(id);
    atualizarResumoEfetivo();
    void persistirEfetivo(id);
  }
});

efetivoDataInput.addEventListener("change", () => {
  void carregarEfetivoDataSelecionada();
});

if (toggleSidebar) {
  toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
}

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    setMenuAtivo(item.dataset.screen);
    setScreen(item.dataset.screen);
  });
});

if (controleRefreshBtn) {
  controleRefreshBtn.addEventListener("click", () => {
    void carregarControleSanitario({ force: true });
  });
}

if (controleTableBody) {
  controleTableBody.addEventListener("click", (event) => {
    const alvo = event.target;
    if (!(alvo instanceof HTMLElement) || !alvo.dataset.id) {
      return;
    }

    if (alvo.dataset.action === "ficha-medica") {
      void abrirFichaMedica(alvo.dataset.id);
    }
  });
}

backToQuadro.addEventListener("click", () => {
  setMenuAtivo("quadro");
  setScreen("quadro");
});

searchToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  if (searchPanel.classList.contains("active")) {
    fecharBusca();
    return;
  }
  abrirBusca();
});

searchInput.addEventListener("input", () => {
  agendarRenderBusca();
});

searchPanel.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener("click", (event) => {
  if (!searchPanel.classList.contains("active")) {
    return;
  }
  const clicouNoBotao = searchToggle.contains(event.target);
  const clicouNoPainel = searchPanel.contains(event.target);
  if (!clicouNoBotao && !clicouNoPainel) {
    fecharBusca();
  }
});

window.addEventListener("scroll", atualizarVisibilidadeBarraIcones, { passive: true });

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (reportProblemModal.classList.contains("active")) {
      fecharReportProblemModal();
      return;
    }
    if (fichaMedicaModal.classList.contains("active")) {
      fecharFichaMedicaModal();
      return;
    }
    if (tafEditorModal.classList.contains("active")) {
      fecharTafEditorModal();
      return;
    }
    if (tafModal.classList.contains("active")) {
      fecharTafModal();
      return;
    }
    if (tatModal.classList.contains("active")) {
      fecharTatModal();
      return;
    }
    if (punicoesEditorModal.classList.contains("active")) {
      fecharPunicoesEditorModal();
      return;
    }
    if (punicoesModal.classList.contains("active")) {
      fecharPunicoesModal();
      return;
    }
    if (historicoEditorModal.classList.contains("active")) {
      fecharHistoricoEditorModal();
      return;
    }
    if (historicoModal.classList.contains("active")) {
      fecharHistoricoModal();
      return;
    }
    if (foEditorModal.classList.contains("active")) {
      fecharFoEditorModal();
      return;
    }
    if (foModal.classList.contains("active")) {
      fecharFoModal();
      return;
    }
    if (dadosModal.classList.contains("active")) {
      fecharModalDados();
      return;
    }
    fecharBusca();
  }
});

fichaDadosBtn.addEventListener("click", () => {
  void abrirDadosMilitar();
});

fichaMedicaBtn.addEventListener("click", () => {
  void abrirFichaMedica();
});

fichaTafBtn.addEventListener("click", () => {
  void abrirDashboardTaf();
});

fichaTatBtn.addEventListener("click", () => {
  void abrirTat();
});

fichaPunicoesBtn.addEventListener("click", () => {
  void abrirPunicoes();
});

fichaFoBtn.addEventListener("click", () => {
  void abrirFatosObservados();
});

fichaHistoricoBtn.addEventListener("click", () => {
  void abrirHistoricoObs();
});

dadosModalClose.addEventListener("click", () => {
  fecharModalDados();
});

dadosModal.addEventListener("click", (event) => {
  if (event.target === dadosModal) {
    fecharModalDados();
  }
});

configChangePhotoBtn.addEventListener("click", () => {
  configProfileInput.click();
});

configProfileInput.addEventListener("change", () => {
  const [file] = Array.from(configProfileInput.files || []);
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    appSettings.profilePhoto = String(reader.result || DEFAULT_MILITAR_FOTO);
    salvarAppSettings();
    aplicarAppSettingsNaInterface();
  };
  reader.readAsDataURL(file);
});

configSaveNameBtn.addEventListener("click", () => {
  appSettings.displayName = String(configDisplayNameInput.value || "").trim();
  salvarAppSettings();
  aplicarAppSettingsNaInterface();
});

configThemeSelect.addEventListener("change", () => {
  appSettings.theme = configThemeSelect.value === "dark" ? "dark" : "light";
  salvarAppSettings();
  aplicarAppSettingsNaInterface();
});

configNotificationsToggle.addEventListener("click", () => {
  appSettings.notificationsEnabled = !appSettings.notificationsEnabled;
  salvarAppSettings();
  aplicarAppSettingsNaInterface();
});

configColorOptions.addEventListener("click", (event) => {
  const alvo = event.target;
  if (!(alvo instanceof HTMLElement) || !alvo.dataset.colorScheme) {
    return;
  }
  appSettings.colorScheme = alvo.dataset.colorScheme;
  salvarAppSettings();
  aplicarAppSettingsNaInterface();
});

[configHelpBtn, configSecurityBtn, configTermsBtn].forEach((button) => {
  button.addEventListener("click", () => {
    mostrarPlaceholderConfiguracoes(button.textContent || "Configuração");
  });
});

configReportBtn.addEventListener("click", () => {
  abrirReportProblemModal();
});

reportProblemClose.addEventListener("click", () => {
  fecharReportProblemModal();
});

reportProblemCancel.addEventListener("click", () => {
  fecharReportProblemModal();
});

reportProblemModal.addEventListener("click", (event) => {
  if (event.target === reportProblemModal) {
    fecharReportProblemModal();
  }
});

reportProblemForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = reportProblemDate.value || hojeISODate();
  const mensagem = String(reportProblemMessage.value || "").trim();
  if (!mensagem) {
    return;
  }

  const texto = [
    "Relatar um problema - Caveirinha App",
    `Data: ${formatarDataExibicao(data)}`,
    `Usuário: ${nomeUsuarioConfigurado()}`,
    "",
    "Descrição:",
    mensagem
  ].join("\n");

  const link = `https://wa.me/${DEV_WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
  window.open(link, "_blank", "noopener");
  fecharReportProblemModal();
});

fichaMedicaModalClose.addEventListener("click", () => {
  fecharFichaMedicaModal();
});

fichaMedicaModal.addEventListener("click", (event) => {
  if (event.target === fichaMedicaModal) {
    fecharFichaMedicaModal();
  }
});

dadosModalBody.addEventListener("click", async (event) => {
  const alvo = event.target;
  if (!(alvo instanceof HTMLElement)) {
    return;
  }

  if (!alvo.classList.contains("copy-field-btn")) {
    return;
  }

  const valor = alvo.dataset.copyValue || "";

  try {
    await navigator.clipboard.writeText(valor === "--" ? "" : valor);
    alvo.classList.add("copied");
    alvo.textContent = "Copiado";
    window.setTimeout(() => {
      alvo.classList.remove("copied");
      alvo.textContent = "Copiar";
    }, 1000);
  } catch (error) {
    console.error("Falha ao copiar valor:", error);
  }
});

foModalClose.addEventListener("click", () => {
  fecharFoModal();
});

foModal.addEventListener("click", (event) => {
  if (event.target === foModal) {
    fecharFoModal();
  }
});

[foTabPlus, foTabMinus].forEach((tab) => {
  tab.addEventListener("click", () => {
    foTipoAtivo = tab.dataset.tipo || "FO+";
    renderFoTabs();
    renderFoTabela();
  });
});

foNovoBtn.addEventListener("click", () => {
  abrirFoEditor(null);
});

foTableBody.addEventListener("click", async (event) => {
  const alvo = event.target;
  if (!(alvo instanceof HTMLElement) || !alvo.dataset.id) {
    return;
  }

  const action = alvo.dataset.action;
  const registro = foListaCache.find((item) => item.id === alvo.dataset.id);
  if (!registro) {
    return;
  }

  if (action === "copy") {
    try {
      await navigator.clipboard.writeText(registro.descricao || "");
      alvo.textContent = "Copiado";
      window.setTimeout(() => {
        alvo.textContent = "Copiar";
      }, 1000);
    } catch (error) {
      console.error("Falha ao copiar FO:", error);
    }
    return;
  }

  if (action === "edit") {
    abrirFoEditor(registro);
    return;
  }

  if (action === "delete") {
    const confirma = window.confirm("Deseja excluir este fato observado?");
    if (!confirma) {
      return;
    }

    try {
      await window.CaveirinhaAPI.deleteFO(registro.id);
      await carregarFo();
    } catch (error) {
      console.error("Falha ao excluir FO:", error);
    }
  }
});

foEditorClose.addEventListener("click", () => {
  fecharFoEditorModal();
});

foEditorCancel.addEventListener("click", () => {
  fecharFoEditorModal();
});

foEditorModal.addEventListener("click", (event) => {
  if (event.target === foEditorModal) {
    fecharFoEditorModal();
  }
});

foEditorForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!militarSelecionadoId) {
    return;
  }

  const payload = {
    idMilitar: militarSelecionadoId,
    tipo: foEditandoTipo,
    descricao: foDescricaoInput.value.trim(),
    autor: foAutorInput.value.trim(),
    data: foDataInput.value
  };

  try {
    if (foEditandoId) {
      await window.CaveirinhaAPI.updateFO({
        id: foEditandoId,
        ...payload
      });
    } else {
      await window.CaveirinhaAPI.createFO(payload);
    }

    fecharFoEditorModal();
    await carregarFo();
  } catch (error) {
    console.error("Falha ao salvar FO:", error);
  }
});

tafModalClose.addEventListener("click", () => {
  fecharTafModal();
});

tafModal.addEventListener("click", (event) => {
  if (event.target === tafModal) {
    fecharTafModal();
  }
});

tatModalClose.addEventListener("click", () => {
  fecharTatModal();
  renderTatEditor(false);
});

tatModal.addEventListener("click", (event) => {
  if (event.target === tatModal) {
    fecharTatModal();
    renderTatEditor(false);
  }
});

punicoesModalClose.addEventListener("click", () => {
  fecharPunicoesModal();
});

punicoesModal.addEventListener("click", (event) => {
  if (event.target === punicoesModal) {
    fecharPunicoesModal();
  }
});

punicoesNovoBtn.addEventListener("click", () => {
  abrirPunicoesEditor(null);
});

punicoesTableBody.addEventListener("click", async (event) => {
  const alvo = event.target;
  if (!(alvo instanceof HTMLElement) || !alvo.dataset.id) {
    return;
  }

  const registro = punicoesListaCache.find((item) => item.id === alvo.dataset.id);
  if (!registro) {
    return;
  }

  if (alvo.dataset.action === "edit") {
    abrirPunicoesEditor(registro);
    return;
  }

  if (alvo.dataset.action === "delete") {
    const confirma = window.confirm("Deseja excluir esta punição?");
    if (!confirma) {
      return;
    }
    try {
      await window.CaveirinhaAPI.deletePunicao(registro.id);
      await carregarPunicoes();
    } catch (error) {
      console.error("Falha ao excluir punição:", error);
    }
  }
});

punicoesEditorClose.addEventListener("click", () => {
  fecharPunicoesEditorModal();
});

punicoesEditorCancel.addEventListener("click", () => {
  fecharPunicoesEditorModal();
});

punicoesEditorModal.addEventListener("click", (event) => {
  if (event.target === punicoesEditorModal) {
    fecharPunicoesEditorModal();
  }
});

[punicoesInicioInput, punicoesFimInput].forEach((input) => {
  input.addEventListener("change", () => {
    atualizarDiasPunicaoEditor();
  });
});

punicoesEditorForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!militarSelecionadoId) {
    return;
  }

  const dataInicio = punicoesInicioInput.value;
  const dataFim = punicoesFimInput.value;
  const payload = {
    idMilitar: militarSelecionadoId,
    fato: punicoesFatoInput.value.trim(),
    punicao: normalizarTipoPunicao(punicoesTipoInput.value),
    dias: calcularDiasPunicao(dataInicio, dataFim),
    dataInicio,
    dataFim
  };

  try {
    if (punicoesEditandoId) {
      await window.CaveirinhaAPI.updatePunicao({
        id: punicoesEditandoId,
        ...payload
      });
    } else {
      await window.CaveirinhaAPI.createPunicao(payload);
    }

    fecharPunicoesEditorModal();
    await carregarPunicoes();
  } catch (error) {
    console.error("Falha ao salvar punição:", error);
  }
});

tatEditBtn.addEventListener("click", () => {
  tatMencaoInput.value = tatRegistroAtual ? mencaoTatRegistro(tatRegistroAtual) : "B";
  renderTatEditor(true);
});

tatEditorCancel.addEventListener("click", () => {
  renderTatEditor(false);
});

tatEditorForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!militarSelecionadoId) {
    return;
  }

  const mencao = normalizarMencaoTat(tatMencaoInput.value);

  try {
    if (tatRegistroAtual?.id) {
      tatRegistroAtual = await window.CaveirinhaAPI.updateTAT({
        id: tatRegistroAtual.id,
        idMilitar: militarSelecionadoId,
        data: tatRegistroAtual.data || hojeISODate(),
        armamento: tatRegistroAtual.armamento || "",
        pontuacao: tatRegistroAtual.pontuacao || "",
        mencao,
        classificacao: mencao
      });
    } else {
      tatRegistroAtual = await window.CaveirinhaAPI.createTAT({
        idMilitar: militarSelecionadoId,
        data: hojeISODate(),
        armamento: "",
        pontuacao: "",
        mencao,
        classificacao: mencao
      });
    }

    renderTatMencaoChip(mencaoTatRegistro(tatRegistroAtual));
    tatArmamentoValue.textContent = tatRegistroAtual.armamento || "--";
    renderTatEditor(false);
    await carregarTat();
  } catch (error) {
    console.error("Falha ao salvar menção do TAT:", error);
  }
});

tafCardsWrap.addEventListener("click", (event) => {
  const alvo = event.target;
  if (!(alvo instanceof HTMLElement)) {
    return;
  }

  if (alvo.classList.contains("taf-edit-btn")) {
    const ciclo = Number(alvo.dataset.ciclo || 1);
    abrirTafEditor(ciclo);
  }
});

tafEditorClose.addEventListener("click", () => {
  fecharTafEditorModal();
});

tafEditorCancel.addEventListener("click", () => {
  fecharTafEditorModal();
});

tafEditorModal.addEventListener("click", (event) => {
  if (event.target === tafEditorModal) {
    fecharTafEditorModal();
  }
});

tafEditorForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!militarSelecionadoId) {
    return;
  }

  try {
    await window.CaveirinhaAPI.updateTAFDashboard({
      idMilitar: militarSelecionadoId,
      ciclo: tafEditandoCiclo,
      data: tafDataInput.value,
      pelotao: usuarioConfigAtual?.pelotao || "",
      mencoes: {
        barra: tafBarraInput.value,
        flexao: tafFlexaoInput.value,
        abdominal: tafAbdominalInput.value,
        corrida: tafCorridaInput.value
      }
    });
    fecharTafEditorModal();
    await carregarTafDashboard();
  } catch (error) {
    console.error("Falha ao salvar TAF:", error);
    window.alert("Não foi possível salvar o TAF no Supabase. Verifique permissões RLS e estrutura da tabela taf.");
  }
});

historicoModalClose.addEventListener("click", () => {
  fecharHistoricoModal();
});

historicoModal.addEventListener("click", (event) => {
  if (event.target === historicoModal) {
    fecharHistoricoModal();
  }
});

historicoNovoBtn.addEventListener("click", () => {
  abrirHistoricoEditor(null);
});

historicoTableBody.addEventListener("click", async (event) => {
  const alvo = event.target;
  if (!(alvo instanceof HTMLElement) || !alvo.dataset.id) {
    return;
  }

  const registro = historicoListaCache.find((item) => item.id === alvo.dataset.id);
  if (!registro) {
    return;
  }

  if (alvo.dataset.action === "edit") {
    abrirHistoricoEditor(registro);
    return;
  }

  if (alvo.dataset.action === "delete") {
    const confirma = window.confirm("Deseja excluir este registro de historico/obs?");
    if (!confirma) {
      return;
    }

    try {
      await window.CaveirinhaAPI.deleteHistoricoObs(registro.id);
      await carregarHistorico();
    } catch (error) {
      console.error("Falha ao excluir registro de historico/obs:", error);
    }
  }
});

historicoEditorClose.addEventListener("click", () => {
  fecharHistoricoEditorModal();
});

historicoEditorCancel.addEventListener("click", () => {
  fecharHistoricoEditorModal();
});

historicoEditorModal.addEventListener("click", (event) => {
  if (event.target === historicoEditorModal) {
    fecharHistoricoEditorModal();
  }
});

historicoEditorForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!militarSelecionadoId) {
    return;
  }

  const payload = {
    idMilitar: militarSelecionadoId,
    texto: historicoTextoInput.value.trim(),
    autor: historicoAutorInput.value.trim(),
    data: hojeISODate()
  };

  try {
    if (historicoEditandoId) {
      await window.CaveirinhaAPI.updateHistoricoObs({
        id: historicoEditandoId,
        ...payload
      });
    } else {
      await window.CaveirinhaAPI.createHistoricoObs(payload);
    }

    fecharHistoricoEditorModal();
    await carregarHistorico();
  } catch (error) {
    console.error("Falha ao salvar registro de historico/obs:", error);
  }
});

async function inicializarApp() {
  if (appJaInicializado) {
    return;
  }

  try {
    const sessao = await window.CaveirinhaAPI.getSession();
    if (!sessao?.user) {
      abrirTelaLogin();
      return;
    }
    if (!usuarioConfigAtual) {
      try {
        usuarioConfigAtual = await obterUsuarioConfigComCache();
      } catch (configError) {
        console.error("Falha ao carregar usuario_config na inicializacao:", configError);
        usuarioConfigAtual = null;
      }
    }
    await aplicarConfigVisualUsuario(usuarioConfigAtual);
  } catch (error) {
    console.error("Falha ao validar sessao antes da inicializacao:", error);
    abrirTelaLogin();
    return;
  }

  const dataHoje = hojeISODate();
  const militaresCache = lerCacheLocal(cacheKeyQuadro(), CACHE_TTL_QUADRO_MS);
  if (Array.isArray(militaresCache) && militaresCache.length) {
    organizacao = construirOrganizacao(militaresCache);
    reconstruirIndices();
  }

  const efetivoCache = lerCacheLocal(cacheKeyEfetivo(dataHoje), CACHE_TTL_EFETIVO_MS);
  if (Array.isArray(efetivoCache)) {
    sincronizarEfetivoState(efetivoCache, dataHoje);
  }

  renderTabs();
  renderCards();
  renderEfetivoTabs();
  renderEfetivo();

  try {
    const militares = await obterMilitaresComCache({ force: true });
    organizacao = construirOrganizacao(militares);
    reconstruirIndices();
  } catch (error) {
    console.error("Falha ao carregar quadro organizacional na inicializacao:", error);
    if (!Array.isArray(militaresCache) || !militaresCache.length) {
      organizacao = [];
      indiceMilitares = [];
    }
  }

  try {
    const efetivo = await obterEfetivoComCache(dataHoje, { force: true });
    sincronizarEfetivoState(efetivo, dataHoje);
  } catch (error) {
    console.error("Falha ao carregar efetivo na inicializacao:", error);
    if (!Array.isArray(efetivoCache)) {
      efetivoState.clear();
    }
  }

  renderTabs();
  renderCards();
  renderEfetivoTabs();
  renderEfetivo();
  inicializarSincronizacaoRealtime();
  appJaInicializado = true;
}

loginForm.addEventListener("submit", (event) => {
  void efetuarLogin(event);
});

logoutBtn.addEventListener("click", () => {
  void efetuarLogout();
});

setHeaderLogoBackground(DEFAULT_HEADER_LOGO);
setHeaderSubtitle(DEFAULT_HEADER_SUBTITLE);
carregarAppSettings();
void inicializarAutenticacao();



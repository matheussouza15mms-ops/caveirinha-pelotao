let organizacao = [];
let indiceMilitares = [];
const cardIdToMilitarId = new Map();

const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");
const menuItems = document.querySelectorAll(".menu-item");
const screenTitle = document.getElementById("screenTitle");
const quadroScreen = document.getElementById("quadroScreen");
const efetivoScreen = document.getElementById("efetivoScreen");
const fichaScreen = document.getElementById("fichaScreen");
const tabsContainer = document.getElementById("tabsContainer");
const cardsArea = document.getElementById("cardsArea");
const backToQuadro = document.getElementById("backToQuadro");
const searchToggle = document.getElementById("searchToggle");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const kpiTotalPelotao = document.getElementById("kpiTotalPelotao");
const kpiEmForma = document.getElementById("kpiEmForma");
const kpiDestinos = document.getElementById("kpiDestinos");
const kpiBaixados = document.getElementById("kpiBaixados");
const efetivoDataInput = document.getElementById("efetivoDataInput");
const efetivoTableBody = document.getElementById("efetivoTableBody");

const fichaFoto = document.getElementById("fichaFoto");
const fichaNome = document.getElementById("fichaNome");
const fichaFuncao = document.getElementById("fichaFuncao");
const fichaDadosBtn = document.getElementById("fichaDadosBtn");
const fichaTafBtn = document.getElementById("fichaTafBtn");
const fichaTatBtn = document.getElementById("fichaTatBtn");
const fichaPunicoesBtn = document.getElementById("fichaPunicoesBtn");
const fichaFoBtn = document.getElementById("fichaFoBtn");
const dadosModal = document.getElementById("dadosModal");
const dadosModalClose = document.getElementById("dadosModalClose");
const dadosModalBody = document.getElementById("dadosModalBody");
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
let tafDashboardCache = [];
let tafEditandoCiclo = 1;
let tatListaCache = [];
let tatRegistroAtual = null;
let appJaInicializado = false;
let usuarioSessao = null;
let usuarioConfigAtual = null;

const opcoesSituacao = ["ferias", "dispensado", "missao", "atrasado", "outros", "falta", "baixado"];
const efetivoState = new Map();
const mencoesOrdenadas = ["I", "R", "B", "MB", "E"];
const tiposPunicao = ["ADV", "IMP", "DET", "REP", "PRISAO"];
const comportamentoCodigos = ["EXCELENTE", "OTIMO", "BOM", "INSUFICIENTE", "MAU"];
const AUTH_REMEMBER_KEY = "caveirinha_auth_remember";
const AUTH_KEEP_SESSION_KEY = "caveirinha_auth_keep_session";
const HEADER_IMAGE_SIGNED_TTL_SECONDS = 3600;
const DEFAULT_HEADER_LOGO = "assets/logo-pelotao.png";
const DEFAULT_HEADER_SUBTITLE = "PELOPES";
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

function normalizarEmail(valor) {
  return String(valor || "")
    .trim()
    .toLowerCase();
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

  try {
    const storage = client.storage.from(resolved.bucket);
    const { data: signedData, error: signedError } = await storage.createSignedUrl(
      resolved.path,
      HEADER_IMAGE_SIGNED_TTL_SECONDS
    );
    if (!signedError && signedData?.signedUrl) {
      return signedData.signedUrl;
    }

    const { data: publicData } = storage.getPublicUrl(resolved.path);
    if (publicData?.publicUrl) {
      return publicData.publicUrl;
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

  if (!senha && usuarioSessao?.email && normalizarEmail(usuarioSessao.email) === email) {
    fecharTelaLogin();
    await inicializarApp();
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
      if (!isManterSessaoAtivo()) {
        await window.CaveirinhaAPI.logout();
      } else {
        usuarioSessao = sessao.user;
        try {
          usuarioConfigAtual = await window.CaveirinhaAPI.getUserConfig();
        } catch (configError) {
          console.error("Falha ao carregar configuracao do usuario:", configError);
          usuarioConfigAtual = null;
        }
        await aplicarConfigVisualUsuario(usuarioConfigAtual);
      }
    }
  } catch (error) {
    console.error("Falha ao recuperar sessao:", error);
  }

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
  return new Date().toISOString().slice(0, 10);
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
  if (["ferias", "dispensado", "missao"].includes(situacao)) {
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
    const dadosMilitar = await window.CaveirinhaAPI.getMilitarDados(militarSelecionadoId);
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
    foListaCache = await window.CaveirinhaAPI.getFO();
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
    const dadosMilitar = await window.CaveirinhaAPI.getMilitarDados(militarSelecionadoId);
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
  } catch (error) {
    console.error("Falha ao persistir comportamento automatico:", error);
  }
}

async function carregarPunicoes() {
  try {
    punicoesListaCache = await window.CaveirinhaAPI.getPunicoes();
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
    tatListaCache = await window.CaveirinhaAPI.getTAT();
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

  militares.forEach((militar) => {
    const aba = militar.aba || "Sem Aba";
    if (!grupos.has(aba)) {
      grupos.set(aba, []);
    }
    grupos.get(aba).push({
      id: militar.id,
      pg: militar.pg,
      numero: militar.numero,
      nomeGuerra: militar.nomeGuerra,
      funcao: militar.funcao,
      foto: militar.foto,
      lastUpdate: militar.lastUpdate
    });
  });

  return Array.from(grupos.entries()).map(([aba, militaresDaAba]) => ({
    aba,
    militares: militaresDaAba
  }));
}

function reconstruirIndices() {
  cardIdToMilitarId.clear();
  indiceMilitares = organizacao.flatMap((grupo, abaIndex) =>
    grupo.militares.map((militar, militarIndex) => {
      const cardId = `${abaIndex}-${militarIndex}`;
      cardIdToMilitarId.set(cardId, militar.id);
      return {
        ...militar,
        aba: grupo.aba,
        abaIndex,
        militarIndex,
        cardId
      };
    })
  );
}

function sincronizarEfetivoState(efetivoRegistros) {
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
  efetivoDataInput.value = dataInputFromIso(primeiraData ? primeiraData.dataAtualizacao : "") || hojeISODate();
}

function setScreen(screen) {
  quadroScreen.classList.remove("active");
  efetivoScreen.classList.remove("active");
  fichaScreen.classList.remove("active");

  if (screen === "quadro") {
    quadroScreen.classList.add("active");
    screenTitle.textContent = "Quadro Organizacional";
  }

  if (screen === "efetivo") {
    efetivoScreen.classList.add("active");
    screenTitle.textContent = "Efetivo";
  }

  if (screen === "ficha") {
    fichaScreen.classList.add("active");
    screenTitle.textContent = "Ficha do Militar";
  }
}

function renderTabs() {
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

    const numeroCard = isSdEv(militar) && militar.numero ? String(militar.numero) : "--";
    card.innerHTML = `
      <img src="${militar.foto}" alt="Foto de ${militarNomeBase(militar)}" />
      <div>
        <div class="militar-meta">
          <span><b>No:</b> ${numeroCard}</span>
          <span><b>P/G:</b> ${militar.pg}</span>
        </div>
        <strong>${militar.nomeGuerra}</strong>
        <p>${militar.funcao}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      militarSelecionadoId = militar.id;
      fichaFoto.src = militar.foto;
      fichaNome.textContent = militarNomeBase(militar);
      fichaFuncao.textContent = militar.funcao;
      setScreen("ficha");
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
  const filtro = termo.trim().toLowerCase();
  searchResults.innerHTML = "";

  if (!filtro) {
    searchResults.innerHTML = '<div class="search-result-empty">Digite para pesquisar.</div>';
    return;
  }

  const encontrados = indiceMilitares.filter((item) => {
    const numeroBusca = isSdEv(item) && item.numero ? String(item.numero) : "";
    const campoBusca = `${item.pg} ${item.nomeGuerra} ${item.funcao} ${numeroBusca}`.toLowerCase();
    return campoBusca.includes(filtro);
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

function abrirBusca() {
  searchPanel.classList.add("active");
  searchPanel.setAttribute("aria-hidden", "false");
  renderResultadosBusca(searchInput.value);
  searchInput.focus();
}

function fecharBusca() {
  searchPanel.classList.remove("active");
  searchPanel.setAttribute("aria-hidden", "true");
}

function atualizarResumoEfetivo() {
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
  efetivoTableBody.innerHTML = "";

  indiceMilitares.forEach((militar) => {
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
  }
}

async function aplicarDataEfetivoParaTodos() {
  const dataSelecionada = efetivoDataInput.value || hojeISODate();
  const dataIso = isoDoDia(dataSelecionada);
  efetivoDataInput.value = dataSelecionada;

  efetivoState.forEach((estado, cardId) => {
    const atual = efetivoState.get(cardId);
    if (!atual) {
      return;
    }
    atual.emForma = false;
    atual.situacao = "";
    atual.dataAtualizacao = dataIso;
    atualizarLinhaEfetivo(cardId);
  });

  const atualizacoes = Array.from(efetivoState.entries()).map(async ([cardId, estado]) => {
    const idMilitar = cardIdToMilitarId.get(cardId);
    if (!idMilitar) {
      return;
    }
    await window.CaveirinhaAPI.updateEfetivo({
      idMilitar,
      emForma: false,
      situacao: "",
      dataAtualizacao: estado.dataAtualizacao
    });
  });

  try {
    await Promise.all(atualizacoes);
  } catch (error) {
    console.error("Falha ao aplicar data global do efetivo:", error);
  }
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
  void aplicarDataEfetivoParaTodos();
});

toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    setMenuAtivo(item.dataset.screen);
    setScreen(item.dataset.screen);
  });
});

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
  renderResultadosBusca(searchInput.value);
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
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
        usuarioConfigAtual = await window.CaveirinhaAPI.getUserConfig();
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

  try {
    const militares = await window.CaveirinhaAPI.getMilitares();
    organizacao = construirOrganizacao(militares);
    reconstruirIndices();

    const efetivo = await window.CaveirinhaAPI.getEfetivo();
    sincronizarEfetivoState(efetivo);
  } catch (error) {
    console.error("Falha ao inicializar dados via API layer:", error);
    organizacao = [];
    indiceMilitares = [];
    efetivoState.clear();
  }

  if (window.matchMedia("(max-width: 900px)").matches) {
    sidebar.classList.add("collapsed");
  }

  renderTabs();
  renderCards();
  renderEfetivo();
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
void inicializarAutenticacao();



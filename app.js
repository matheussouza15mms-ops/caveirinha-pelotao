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
const efetivoTableBody = document.getElementById("efetivoTableBody");

const fichaFoto = document.getElementById("fichaFoto");
const fichaNome = document.getElementById("fichaNome");
const fichaFuncao = document.getElementById("fichaFuncao");
const fichaDadosBtn = document.getElementById("fichaDadosBtn");
const fichaTafBtn = document.getElementById("fichaTafBtn");
const fichaTatBtn = document.getElementById("fichaTatBtn");
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

let abaAtiva = 0;
let ultimoCardEncontrado = null;
let militarSelecionadoId = null;
let foTipoAtivo = "FO+";
let foListaCache = [];
let foEditandoId = null;
let foEditandoTipo = "FO+";
let historicoListaCache = [];
let historicoEditandoId = null;
let tafDashboardCache = [];
let tafEditandoCiclo = 1;
let tatListaCache = [];
let tatRegistroAtual = null;

const opcoesSituacao = ["falta", "missao", "baixado", "ferias", "outros"];
const efetivoState = new Map();
const mencoesOrdenadas = ["I", "R", "B", "MB", "E"];
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
    const mencaoFinal = calcularMencaoFinal([
      item.mencoes.barra,
      item.mencoes.flexao,
      item.mencoes.abdominal,
      item.mencoes.corrida
    ]);

    const card = document.createElement("article");
    card.className = "taf-card";
    card.innerHTML = `
      <div class="taf-card-head">
        <strong>${item.ciclo}º TAF</strong>
        <button class="taf-edit-btn" data-ciclo="${item.ciclo}">Atualizar</button>
      </div>
      <small class="taf-card-date">Data: ${formatarDataExibicao(item.data)}</small>
      <div class="taf-row"><b>Barra</b><span class="mencao-chip ${classeMencao(item.mencoes.barra)}">${item.mencoes.barra}</span></div>
      <div class="taf-row"><b>Flexão</b><span class="mencao-chip ${classeMencao(item.mencoes.flexao)}">${item.mencoes.flexao}</span></div>
      <div class="taf-row"><b>Abdominal</b><span class="mencao-chip ${classeMencao(item.mencoes.abdominal)}">${item.mencoes.abdominal}</span></div>
      <div class="taf-row"><b>Corrida</b><span class="mencao-chip ${classeMencao(item.mencoes.corrida)}">${item.mencoes.corrida}</span></div>
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
      efetivoState.set(militar.cardId, { emForma: false, situacao: "" });
      return;
    }

    const emForma = Boolean(registro.emForma) || registro.situacao === "em_forma";
    efetivoState.set(militar.cardId, {
      emForma,
      situacao: emForma ? "em_forma" : registro.situacao || ""
    });
  });
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
    return;
  }

  checkbox.checked = false;
  select.disabled = false;
  if (select.options[0]) {
    select.options[0].textContent = "Selecionar situacao";
  }
  select.value = estado.situacao;
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
          <option value="falta">Falta</option>
          <option value="missao">Missao</option>
          <option value="baixado">Baixado</option>
          <option value="ferias">Ferias</option>
          <option value="outros">Outros</option>
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
    await window.CaveirinhaAPI.updateEfetivo({
      idMilitar,
      emForma: estado.emForma,
      situacao: estado.situacao
    });
  } catch (error) {
    console.error("Falha ao atualizar efetivo na API layer:", error);
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

    estado.situacao = alvo.value;
    estado.emForma = false;
    atualizarLinhaEfetivo(id);
    atualizarResumoEfetivo();
    void persistirEfetivo(id);
  }
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
}

void inicializarApp();

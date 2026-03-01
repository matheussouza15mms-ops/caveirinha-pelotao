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
const dadosModal = document.getElementById("dadosModal");
const dadosModalClose = document.getElementById("dadosModalClose");
const dadosModalBody = document.getElementById("dadosModalBody");

let abaAtiva = 0;
let ultimoCardEncontrado = null;
let militarSelecionadoId = null;

const opcoesSituacao = ["falta", "missao", "baixado", "ferias", "outros"];
const efetivoState = new Map();
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

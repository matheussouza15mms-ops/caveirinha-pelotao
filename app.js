const organizacao = [
  {
    aba: "Comando",
    militares: [
      { nome: "Cap Silva", funcao: "Comandante", foto: "https://i.pravatar.cc/100?img=11" },
      { nome: "Ten Costa", funcao: "Subcomandante", foto: "https://i.pravatar.cc/100?img=12" }
    ]
  },
  {
    aba: "Administração",
    militares: [
      { nome: "Sgt Lima", funcao: "Chefe Administrativo", foto: "https://i.pravatar.cc/100?img=13" },
      { nome: "Cb Rocha", funcao: "Auxiliar Administrativo", foto: "https://i.pravatar.cc/100?img=14" }
    ]
  },
  {
    aba: "Operações",
    militares: [
      { nome: "Sgt Melo", funcao: "Chefe de Operações", foto: "https://i.pravatar.cc/100?img=15" },
      { nome: "Sd Nunes", funcao: "Operador", foto: "https://i.pravatar.cc/100?img=16" }
    ]
  },
  {
    aba: "Logística",
    militares: [
      { nome: "Ten Prado", funcao: "Chefe de Logística", foto: "https://i.pravatar.cc/100?img=17" },
      { nome: "Sd Alves", funcao: "Apoio Logístico", foto: "https://i.pravatar.cc/100?img=18" }
    ]
  }
];

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
const efetivoTableBody = document.getElementById("efetivoTableBody");

const fichaFoto = document.getElementById("fichaFoto");
const fichaNome = document.getElementById("fichaNome");
const fichaFuncao = document.getElementById("fichaFuncao");

let abaAtiva = 0;
let ultimoCardEncontrado = null;

const indiceMilitares = organizacao.flatMap((grupo, abaIndex) =>
  grupo.militares.map((militar, militarIndex) => ({
    ...militar,
    aba: grupo.aba,
    abaIndex,
    militarIndex,
    cardId: `${abaIndex}-${militarIndex}`
  }))
);

const opcoesSituacao = ["falta", "missao", "baixado", "ferias", "outros"];
const efetivoState = new Map(
  indiceMilitares.map((militar) => [militar.cardId, { emForma: false, situacao: "" }])
);

function extrairNomeGuerra(nomeCompleto) {
  const partes = nomeCompleto.trim().split(/\s+/);
  return partes[partes.length - 1] || nomeCompleto;
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

  organizacao[abaAtiva].militares.forEach((militar, index) => {
    const card = document.createElement("button");
    card.className = "card-militar";
    card.dataset.cardId = `${abaAtiva}-${index}`;
    card.style.animationDelay = `${index * 0.08}s`;
    card.innerHTML = `
      <img src="${militar.foto}" alt="Foto de ${militar.nome}" />
      <div>
        <strong>${militar.nome}</strong>
        <p>${militar.funcao}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      fichaFoto.src = militar.foto;
      fichaNome.textContent = militar.nome;
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
    return item.nome.toLowerCase().includes(filtro) || item.funcao.toLowerCase().includes(filtro);
  });

  if (!encontrados.length) {
    searchResults.innerHTML = '<div class="search-result-empty">Nenhum militar encontrado.</div>';
    return;
  }

  encontrados.forEach((item) => {
    const botao = document.createElement("button");
    botao.className = "search-result-item";
    botao.innerHTML = `
      <strong>${item.nome}</strong>
      <small>${item.funcao} • ${item.aba}</small>
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

  efetivoState.forEach((estado) => {
    if (estado.emForma) {
      emForma += 1;
      return;
    }
    if (opcoesSituacao.includes(estado.situacao)) {
      destinos += 1;
    }
  });

  kpiTotalPelotao.textContent = String(total);
  kpiEmForma.textContent = String(emForma);
  kpiDestinos.textContent = String(destinos);
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
    select.options[0].textContent = "Selecionar situação";
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
        <span class="nome-guerra">${extrairNomeGuerra(militar.nome)}</span>
        <span class="nome-completo">${militar.nome}</span>
      </td>
      <td>
        <select class="status-select" data-id="${militar.cardId}" ${estado && estado.emForma ? "disabled" : ""}>
          <option value="">Selecionar situação</option>
          <option value="falta">Falta</option>
          <option value="missao">Missão</option>
          <option value="baixado">Baixado</option>
          <option value="ferias">Férias</option>
          <option value="outros">Outros</option>
        </select>
      </td>
    `;
    efetivoTableBody.appendChild(tr);
    atualizarLinhaEfetivo(militar.cardId);
  });

  atualizarResumoEfetivo();
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
    fecharBusca();
  }
});

if (window.matchMedia("(max-width: 900px)").matches) {
  sidebar.classList.add("collapsed");
}

renderTabs();
renderCards();
renderEfetivo();

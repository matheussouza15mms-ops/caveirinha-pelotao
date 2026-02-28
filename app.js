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

const fichaFoto = document.getElementById("fichaFoto");
const fichaNome = document.getElementById("fichaNome");
const fichaFuncao = document.getElementById("fichaFuncao");

let abaAtiva = 0;

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

toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuItems.forEach((btn) => btn.classList.remove("active"));
    item.classList.add("active");
    setScreen(item.dataset.screen);
  });
});

backToQuadro.addEventListener("click", () => {
  setScreen("quadro");
});

if (window.matchMedia("(max-width: 900px)").matches) {
  sidebar.classList.add("collapsed");
}

renderTabs();
renderCards();

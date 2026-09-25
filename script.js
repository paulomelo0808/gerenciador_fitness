const formulario = document.querySelector("#form-exercicio");

const nomeInput = document.querySelector("#nome");
const seriesInput = document.querySelector("#series");
const repeticoesInput = document.querySelector("#repeticoes");
const cargaInput = document.querySelector("#carga");

const listaExercicios = document.querySelector("#lista-exercicios");

const concluidosTexto = document.querySelector("#doneCount");
const totalTexto = document.querySelector("#totalCount");

const barraProgresso = document.querySelector("#trainingProgress");

const botaoLimpar = document.querySelector("#btn-limpar");

let exercicios = [];
let proximoId = 1;


/* =========================
   ADICIONAR EXERCÍCIO
========================= */

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = nomeInput.value.trim();
  const series = Number(seriesInput.value);
  const repeticoes = Number(repeticoesInput.value);

  const carga =
    cargaInput.value === ""
      ? 0
      : Number(cargaInput.value);

  if (
    nome === "" ||
    series < 1 ||
    repeticoes < 1 ||
    carga < 0
  ) {
    return;
  }

  const novoExercicio = {
    id: proximoId,
    nome: nome,
    series: series,
    repeticoes: repeticoes,
    carga: carga,
    concluido: false
  };

  exercicios.push(novoExercicio);

  proximoId++;

  formulario.reset();

  seriesInput.value = 3;
  repeticoesInput.value = 10;
  cargaInput.value = 0;

  nomeInput.focus();

  atualizarTela();
});


/* =========================
   ATUALIZAR INTERFACE
========================= */

function atualizarTela() {
  renderizarExercicios();
  atualizarResumo();
}


/* =========================
   RENDERIZAR EXERCÍCIOS
========================= */

function renderizarExercicios() {
  listaExercicios.innerHTML = "";

  if (exercicios.length === 0) {
    listaExercicios.innerHTML = `
      <p class="empty-message">
        Nenhum exercício adicionado.
      </p>
    `;

    return;
  }

  exercicios.forEach(function (exercicio) {
    const item = document.createElement("div");

    item.classList.add("exercise-item");

    if (exercicio.concluido) {
      item.classList.add("exercise-item--done");
    }

    item.innerHTML = `
      <label class="exercise-check">

        <input
          type="checkbox"
          data-id="${exercicio.id}"
          ${exercicio.concluido ? "checked" : ""}
        >

        <span class="exercise-info">

          <strong class="exercise-name">
            ${escaparHTML(exercicio.nome)}
          </strong>

          <span class="exercise-details">
            ${exercicio.series} séries ×
            ${exercicio.repeticoes} repetições
            ${
              exercicio.carga > 0
                ? `• ${exercicio.carga} kg`
                : "• sem carga"
            }
          </span>

        </span>

      </label>

      <button
        type="button"
        class="exercise-remove"
        data-remove="${exercicio.id}"
      >
        Remover
      </button>
    `;

    listaExercicios.appendChild(item);
  });
}


/* =========================
   MARCAR COMO CONCLUÍDO
========================= */

listaExercicios.addEventListener("change", function (evento) {
  if (evento.target.type !== "checkbox") {
    return;
  }

  const id = Number(evento.target.dataset.id);

  const exercicio = exercicios.find(function (item) {
    return item.id === id;
  });

  if (!exercicio) {
    return;
  }

  exercicio.concluido = evento.target.checked;

  atualizarTela();
});


/* =========================
   REMOVER EXERCÍCIO
========================= */

listaExercicios.addEventListener("click", function (evento) {
  const botao = evento.target.closest("[data-remove]");

  if (!botao) {
    return;
  }

  const id = Number(botao.dataset.remove);

  exercicios = exercicios.filter(function (exercicio) {
    return exercicio.id !== id;
  });

  atualizarTela();
});


/* =========================
   ATUALIZAR RESUMO
========================= */

function atualizarResumo() {
  const total = exercicios.length;

  const concluidos = exercicios.filter(function (exercicio) {
    return exercicio.concluido;
  }).length;

  concluidosTexto.textContent = concluidos;
  totalTexto.textContent = total;


  const porcentagem =
    total === 0
      ? 0
      : (concluidos / total) * 100;

  barraProgresso.max = 100;
  barraProgresso.value = porcentagem;
}


/* =========================
   LIMPAR TREINO
========================= */

botaoLimpar.addEventListener("click", function () {
  if (exercicios.length === 0) {
    return;
  }

  const confirmou = confirm(
    "Deseja realmente limpar todos os exercícios do treino?"
  );

  if (!confirmou) {
    return;
  }

  exercicios = [];

  atualizarTela();
});


/* =========================
   SEGURANÇA DO TEXTO
========================= */

function escaparHTML(texto) {
  return texto
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* =========================
   ESTADO INICIAL
========================= */

atualizarTela();
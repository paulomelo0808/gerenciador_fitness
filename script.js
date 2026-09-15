const formulario = document.querySelector("#exerciseForm");

const nomeInput = document.querySelector("#exerciseName");
const seriesInput = document.querySelector("#exerciseSets");
const repeticoesInput = document.querySelector("#exerciseReps");
const cargaInput = document.querySelector("#exerciseWeight");

const listaExercicios = document.querySelector("#exerciseList");
const estadoVazio = document.querySelector("#emptyState");

const concluidosTexto = document.querySelector("#doneCount");
const totalTexto = document.querySelector("#totalCount");

const barraProgresso = document.querySelector("progress");

const botaoLimpar = document.querySelector("#resetDay");

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
    estadoVazio.hidden = false;
    return;
  }

  estadoVazio.hidden = true;

  exercicios.forEach(function (exercicio) {
    const item = document.createElement("li");

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
        aria-label="Remover ${escaparHTML(exercicio.nome)}"
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

  barraProgresso.max = total > 0 ? total : 1;
  barraProgresso.value = concluidos;
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
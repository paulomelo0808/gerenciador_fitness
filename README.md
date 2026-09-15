# 🏋️ Gerenciador Fitness

Projeto desenvolvido para a disciplina de **Desenvolvimento Web**.

Um gerenciador de treinos simples e direto: adicione exercícios, defina séries, repetições e carga, e acompanhe o progresso do seu treino em tempo real — tudo em uma única página, sem backend.

---

## 📋 Sumário

- [Funcionalidades](#-funcionalidades)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Como funciona](#-como-funciona)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Como executar](#-como-executar)
- [Autor](#-autor)

---

## ✅ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| ➕ Adicionar exercício | Cadastra nome, séries, repetições e carga (kg) |
| ☑️ Marcar como concluído | Atualiza contador e barra de progresso automaticamente |
| 🗑️ Remover exercício | Exclui um exercício específico da lista |
| 🔄 Limpar treino | Reseta todos os exercícios do dia |
| 📊 Acompanhar progresso | Placar com total concluído, volume e carga somada |
| 📱 Layout responsivo | Adapta-se a diferentes tamanhos de tela |

---

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura da página
- **CSS3** — estilização e responsividade
- **JavaScript** — lógica e interatividade (sem frameworks)

> Projeto 100% front-end, sem uso de backend, banco de dados ou bibliotecas externas.

---

## ⚙️ Como funciona

1. O usuário preenche o formulário com:
   - Nome do exercício
   - Número de séries
   - Número de repetições
   - Carga em kg *(opcional)*
2. Ao enviar, o exercício é adicionado à lista do treino.
3. Cada exercício pode ser marcado como **concluído**, o que:
   - Atualiza o contador `X/Y concluídos`
   - Move a barra de progresso
   - Recalcula o volume total (séries × repetições) e a carga total
4. Exercícios podem ser removidos individualmente, ou o treino inteiro pode ser limpo com um clique.

> ℹ️ Os dados existem apenas durante a sessão da página (em memória). Ao recarregar, o treino é reiniciado.

---

## 📁 Estrutura do projeto

```text
gerenciador-fitness/
│
├── index.html      # Estrutura da página
├── style.css        # Estilos e responsividade
├── script.js         # Lógica do gerenciador
└── README.md        # Documentação do projeto
```

---

## ▶️ Como executar

Não é necessário instalar nada. Basta:

1. Baixar ou clonar os arquivos do projeto
2. Abrir o arquivo `index.html` diretamente no navegador

```bash
cd gerenciador-fitness
start index.html   # Windows
open index.html    # macOS
```

---

## 👤 Autor

Projeto desenvolvido por **Paulo** e **Victor**, para a disciplina de Desenvolvimento Web, do professor **Gabriel Cardoso**.
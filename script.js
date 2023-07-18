// Array de operações disponíveis
const operations = ["+", "-", "*", "/"];

// Variáveis globais
let score = 0;
let startTime, endTime;

// Função para gerar uma nova conta aleatória com resultado inteiro
function generateQuestion() {
  let operation, number1, number2, correctAnswer;

  do {
    operation = operations[Math.floor(Math.random() * operations.length)];
    number1 = Math.floor(Math.random() * 10) + 1;
    number2 = Math.floor(Math.random() * 10) + 1;

    switch (operation) {
      case "+":
        correctAnswer = number1 + number2;
        break;
      case "-":
        correctAnswer = number1 - number2;
        break;
      case "*":
        correctAnswer = number1 * number2;
        break;
      case "/":
        correctAnswer = number1 / number2;
        break;
    }
  } while (!Number.isInteger(correctAnswer));

  const questionElement = document.getElementById("question");
  questionElement.textContent = `${number1} ${operation} ${number2}`;

  return correctAnswer;
}


// Função para verificar a resposta do jogador
function checkAnswer(answer, correctAnswer) {
  const resultElement = document.getElementById("result");
  if (parseInt(answer) === correctAnswer) {
    resultElement.textContent = "Resposta correta!";
    score++;
  } else {
    resultElement.textContent = "Resposta incorreta!";
  }

  // Limpar o campo de resposta
  document.getElementById("answer").value = "";

  // Atualizar o score
  document.getElementById("score-value").textContent = score;

  // Gerar uma nova pergunta
  generateQuestion();

  // Verificar se o jogo foi concluído após 25 contas
  if (score === 25) {
    endTime = new Date();
    const totalTime = (endTime - startTime) / 1000; // Converter para segundos
    alert(`\nScore: ${score}\nTempo: ${totalTime.toFixed(2)} segundos`);
    resetGame();
  }
}

// Função para reiniciar o jogo
function resetGame() {
  score = 0;
  startTime = null;
  endTime = null;
  document.getElementById("score-value").textContent = score;
  document.getElementById("result").textContent = "";
  generateQuestion();
}

// Evento de inicialização do jogo
document.addEventListener("DOMContentLoaded", function () {
  generateQuestion();
  document.getElementById("answer").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const answer = document.getElementById("answer").value;
      const correctAnswer = eval(document.getElementById("question").textContent);
      checkAnswer(answer, correctAnswer);
    }
  });

  // Iniciar o tempo quando o jogador começar a digitar
  document.getElementById("answer").addEventListener("input", function () {
    if (!startTime) {
      startTime = new Date();
    }
  });
});

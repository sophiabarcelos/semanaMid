// --- CHUVA DE CÓDIGOS 
const canvas = document.querySelector("#rain");
const ctx = canvas.getContext("2d");

let columns = [];

function resizeRain() {
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * scale);
  canvas.height = Math.floor(window.innerHeight * scale);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  columns = Array(Math.ceil(window.innerWidth / 15)).fill(0).map(() => ({
    y: Math.random() * window.innerHeight,
    speed: 2 + Math.random() * 4,
    length: 12 + Math.floor(Math.random() * 22)
  }));
}

function drawRain() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.font = "15px monospace";
  columns.forEach((column, i) => {
    for (let n = 0; n < column.length; n++) {
      const y = column.y - n * 16;
      if (y < 0 || y > window.innerHeight) continue;
      ctx.fillStyle = n === 0 ? "#baffc4" : n < 5 ? "#43bd5a" : "#17632a";
      ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * 15, y);
    }
    column.y += column.speed;
    if (column.y - column.length * 18 > window.innerHeight) {
      column.y = -Math.random() * window.innerHeight * 0.5;
      column.speed = 2 + Math.random() * 4;
      column.length = 12 + Math.floor(Math.random() * 22);
    }
  });
  requestAnimationFrame(drawRain);
}

window.addEventListener("resize", resizeRain);
resizeRain();
drawRain();


//  QUIZ 
const questions = [
  {
    question: "1. O que é a chamada 'Tecnologia Verde'?",
    answers: [
      { text: "A) Tecnologias que usam apenas tinta verde.", correct: false },
      { text: "B) Soluções tecnológicas que reduzem o impacto ambiental.", correct: true },
      { text: "C) Computadores movidos a plantas.", correct: false },
      { text: "D) Equipamentos descartados na natureza.", correct: false }
    ],
    explanation: "💡Explicação: Tecnologia Verde é qualquer inovação criada para mitigar os impactos negativos das atividades humanas no meio ambiente, priorizando fontes limpas e eficiência."
  },
  {
    question: "2. Como a tecnologia ajuda a economizar energia elétrica?",
    answers: [
      { text: "A) Deixando aparelhos ligados na tomada.", correct: false },
      { text: "B) Usando lâmpadas antigas.", correct: false },
      { text: "C) Com automação e sensores inteligentes.", correct: true },
      { text: "D) Aumentando a iluminação pública à noite.", correct: false }
    ],
    explanation: "💡Explicação: Sensores de presença e automação desligam luzes e equipamentos automaticamente quando não há ninguém por perto, eliminando o desperdício."
  },
  {
    question: "3. O que devemos fazer com aparelhos eletrônicos velhos (Lixo Eletrônico)?",
    answers: [
      { text: "A) Descartar em pontos de coleta específicos para reciclagem.", correct: true },
      { text: "B) Jogar no lixo comum de casa.", correct: false },
      { text: "C) Queimar para diminuir o volume.", correct: false },
      { text: "D) Entulhar em rios e terrenos vagos.", correct: false }
    ],
    explanation: "💡Explicação: Eletrônicos contêm metais pesados tóxicos como chumbo e mercúrio. O descarte em pontos de coleta adequados permite a reciclagem segura desses componentes."
  },
  {
    question: "4. Qual é uma vantagem dos carros elétricos para o meio ambiente?",
    answers: [
      { text: "A) Consumirem mais gasolina.", correct: false },
      { text: "B) Não emitirem gases poluentes durante o uso.", correct: true },
      { text: "C) Fazerem mais barulho na cidade.", correct: false },
      { text: "D) Gastarem mais pneus no asfalto.", correct: false }
    ],
    explanation: "💡Explicação: Ao dispensar o combustível fóssil (como gasolina e diesel), os veículos elétricos deixam de emitir gás carbônico no escapamento enquanto rodam."
  },
  {
    question: "5. Como o armazenamento em nuvem (cloud) contribui para a sustentabilidade?",
    answers: [
      { text: "A) Aumentando o uso de papel impresso.", correct: false },
      { text: "B) Reduzindo a necessidade de documentos em papel.", correct: true },
      { text: "C) Bloqueando a energia solar.", correct: false },
      { text: "D) Poluindo a atmosfera diretamente.", correct: false }
    ],
    explanation: "💡Explicação: Com arquivos digitais armazenados na nuvem, diminui a demanda por impressão de papéis, economizando árvores e recursos de transporte físico."
  }
];

// Elementos do DOM
const homeBox = document.getElementById('home-box');
const startButton = document.getElementById('start-btn');

const quizBox = document.getElementById('quiz-box');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const explanationElement = document.getElementById('explanation-box');
const nextButton = document.getElementById('next-btn');

const resultBox = document.getElementById('result-box');
const scoreText = document.getElementById('score-text');
const successBox = document.getElementById('success-box');
const successMsg = document.getElementById('success-msg');
const successMsg2 = document.getElementById('success-msg2');
const successMsg3 = document.getElementById('success-msg3'); 
const successLink = document.getElementById('success-link');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  homeBox.classList.add('hide');
  resultBox.classList.add('hide');
  successBox.classList.add('hide');
  restartButton.classList.add('hide');
  
  quizBox.classList.remove('hide');
  
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn-option');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    optionsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add('hide');
  explanationElement.classList.add('hide');
  explanationElement.innerHTML = '';
  while (optionsElement.firstChild) {
    optionsElement.removeChild(optionsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    score++;
  }

  Array.from(optionsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add('correct');
    } else {
      button.classList.add('incorrect');
    }
    button.disabled = true;
  });

  const currentExplanation = questions[currentQuestionIndex].explanation;
  explanationElement.innerHTML = currentExplanation;
  explanationElement.classList.remove('hide');

  nextButton.classList.remove('hide');
}

function showResult() {
  quizBox.classList.add('hide');
  resultBox.classList.remove('hide');
  scoreText.innerText = `Você acertou ${score} de ${questions.length} perguntas!`;

  if (score >= 3) {
    // Se acertou 3 ou mais: mostra o sucesso e as três mensagens
    successBox.classList.remove('hide');
    restartButton.classList.add('hide');
    
    successMsg.innerText = "Parabéns! Acesso liberado para a próxima etapa:";  
    successMsg2.innerText = "Chave: deslocar 6 letras pra frente ";  
    successMsg3.innerText = "ys-zcu-rorgi.bkxikr.gvv/";
  } else {
    // Se acertou menos de 3: esconde o sucesso e mostra o botão de reiniciar
    successBox.classList.add('hide');
    restartButton.classList.remove('hide');
  }
}

startButton.addEventListener('click', startQuiz);

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartButton.addEventListener('click', startQuiz);
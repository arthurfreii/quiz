

//    CONSTANTES (variáveis):

// "querySelector" é para selecionar a classe que foi definida no HTML
const startBtn = document.querySelector('.start-btn');  // Guarda o botão que tem a classe start-btn.
const popupInfo = document.querySelector('.popup-info'); // Guarda o elemento que tem a classe popup-info.
const exitBtn = document.querySelector('.exit-btn');   // Guarda o elemento que tem a classe .exit-btn.
const main = document.querySelector('.main');          // Guarda o elemento que tem a classe .main.
const continueBtn = document.querySelector('.continue-btn'); // Guarda o elemento que tem a classe .continue-btn.
const quizSection = document.querySelector('.quiz-section'); // Guarda o elemento que tem a classe .quiz-section.
const quizBox = document.querySelector('.quiz-box'); // Guarda o elemento que tem a classe .quiz-box.
const resultBox = document.querySelector('.result-box'); // Guarda o elemento que tem a classe .result-box.
const tryAgainBtn = document.querySelector('.tryAgain-btn'); // Guarda o elemento que tem a classe .tryAgain-btn.
const goHomeBtn = document.querySelector('.goHome-btn'); // Guarda o elemento que tem a classe .goHome-btn.

//   ARROW FUNCTION: 
//                 () => { ISSO ABAIXO É A ARROW FUNCION | Vai ser executada quando o clique acontecer.
startBtn.onclick = () => {  // Evento de clique, que ocorre quando clicar no botão startBtn. | Função sem nome.
    popupInfo.classList.add('active'); 
    // popupInfo refere-se a constante acima
    // classList.add('acitve') adiciona a classe 'active' no CSS 'popup-info'
    main.classList.add('active');  // Isso é para adicionar o Filtro
}

exitBtn.onclick = () => {  
    popupInfo.classList.remove('active'); // Remove a classe 'active' no CSS .popup-info
    main.classList.remove('active');   // Isso é para remover o Filtro
}

continueBtn.onclick = () => {  
    quizSection.classList.add('active');
    popupInfo.classList.remove('active'); // Remove a classe 'active' no CSS .popup-info
    main.classList.remove('active');   // Isso é para remover o Filtro
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {  
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}


goHomeBtn.onclick = () => {  
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
}




let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => { 
   if (questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
   }
   else{
    showResultBox();
   }
}

const optionList = document.querySelector('.option-list');


// Getting questions and options from array --- Obtendo perguntas e opções do array
function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag; 

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else {
        answer.classList.add('incorrect');

    // If answer incorret, auto selected correct answer -- Se a resposta estiver incorreta, a resposta correta será  selecionada automaticamente
    for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent == correctAnswer){
            optionList.children[i].setAttribute('class', 'option correct');
        }
    }
    }
    // If user has selected, disable all options -- Se o usuário tiver selecionado, desative todas as opções
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');

}

function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;    

    let progress = setInterval(() => {
        progressStartValue++;
        
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;

        if (progressStartValue == progressEndValue){
            clearInterval(progress);
        }

    }, speed);
}
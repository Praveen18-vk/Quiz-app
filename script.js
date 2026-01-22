const questions = [
    {
        question : "Which is largest animal in the world?",
        answers : [
            {text:"Shark" , correct : false},
            {text:"Blue whale" , correct : true},
            {text:"Elephant" , correct : false},
            {text:"Giraffe" , correct : false},
        ]
    },

    {
        question : "Which is the smallest country in the world?",
        answers : [
            {text:"Vatican city" , correct : true},
            {text:"Bhutan" , correct : false},
            {text:"Nepal" , correct : false},
            {text:"Sri Lanka" , correct : false},
        ]
    },

    {
        question : "Which is the largest desert in the world?",
        answers : [
            {text:"Kalahari" , correct : false},
            {text:"Gobi" , correct : false},
            {text:"Sahara" , correct : false},
            {text:"Antartica" , correct : true},
        ]
    },

    {
        question : "Which is the smallest continent in the world?",
        answers : [
            {text:"Asia" , correct : false},
            {text:"Australia" , correct : true},
            {text:"Arctic" , correct : false},
            {text:"Africa" , correct : false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestions();
}
function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);    
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const iscorrect = selectBtn.dataset.correct === "true";
    if(iscorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestions();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener("click" ,()=>{
    if(currentQuestionIndex<questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})
startQuiz();
const questions = [
    {
        question: "Yaşanan Son Olaylardan Sonra DALTONLAR Safından Ayrılan 2 üye kimdir",
        answers: [
            { text: "Ramazan-Ali", correct: false },
            { text: "Soner-Uğur", correct: false },
            { text: "Ümit-Caner", correct: false },
            { text: "Abdullah-Kasım", correct: true },
        ]
    },
    {
        question: "Ramazan KARACA hangi gruba mensuptur",
        answers: [
            { text: "Daltonlar", correct: false },
            { text: "Anucurlar", correct: false },
            { text: "Redkitler", correct: true },
            { text: "Baygaralar", correct: false },
        ]
    },
    {
        question: "Ali Akpınarın Cinsi Nedir",
        answers: [
            { text: "Firavun Tazısı", correct: true },
            { text: "Sokak Köpeği(Elinde Ekmek tutan)", correct: false },
            { text: "Pitbull", correct: false },
            { text: "Kangal", correct: false },
        ]
    },
    {
        question: "Abdullah Kurtayın GERÇEK Mesleği Nedir?",
        answers: [
            { text: "Telefon Tüccarı", correct: false },
            { text: "Taksici", correct: false },
            { text: "E-Ticaret", correct: false },
            { text: "Daha belli değil", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(button, correct) {
    if (correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
        const isCorrect = questions[currentQuestionIndex].answers.find(a => a.text === btn.innerHTML).correct;
        if (isCorrect) {
            btn.classList.add("correct");
        } else if (!btn.classList.contains("incorrect")) {
            btn.classList.add("disabled");
        }
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `Quiz Bitti! Skorunuz: ${score} / ${questions.length}`;
    nextButton.innerHTML = "Tekrar Başlat";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();

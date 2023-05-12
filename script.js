const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("previous");
const result = document.getElementById("result");
const scoreElement = document.getElementById("score");
const correctIncorrect = document.getElementById("correct-incorrect");
const restartButton = document.getElementById("restart");
const addQuestionButton = document.getElementById("add-question");
const editQuestionButton = document.getElementById("edit-question");

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const quizData = JSON.parse(localStorage.getItem("quizData")) || [
    {
        question: "Karadeniz Teknik Üniversitesi hangi ildedir?",
        options: ["Ankara", "İstanbul", "Trabzon"],
        correctAnswer: 2,
    },
    {
        question: "Web Programlama dersini kim vermektedir?",
        options: ["Öğr. Gör. Dr. Zafer Yavuz", "Doç. Dr. Hüseyin Pehlivan", "Doç. Dr. Bekir Dizdaroğlu"],
        correctAnswer: 0,
    },
    {
        question: "10+10=?",
        options: ["11", "15", "20"],
        correctAnswer: 2,
    },
    {
        question: "Türkiye Cumhuriyetinin ilk Cumhurbaşkanı kimdir?",
        options: ["Mustafa Kemal Atatürk", "İsmet İnönü", "Doğu Perinçek"],
        correctAnswer: 0,
    },
    {
        question: "Uzungöl yapay mıdır?",
        options: ["Evet", "Hayır", "Ne yapay mı?"],
        correctAnswer: 2,
    },
    {
        question: "İstiklal Marşı' nın yazarı kimdir?",
        options: ["Mehmet Akif Ersoy", "Osman Zeki Üngör", "Dostoyevski"],
        correctAnswer: 0,
    },
    {
        question: "Kürk Mantolu Madonna, kimin eseridir?",
        options: ["Sabahattin Ali", "Yaşar Kemal", "Orhan Pamuk"],
        correctAnswer: 0,
    },
    {
        question: "Türkiye' nin en büyük yüzölçümüne sahip ili hangisidir?",
        options: ["Trabzon", "Ankara", "Konya"],
        correctAnswer: 2,
    },
    {
        question: "2-2=?",
        options: ["0", "2", "4"],
        correctAnswer: 0,
    },
    {
        question: "Alternatif akım kimin icadıdır?",
        options: ["Albert Einstein", "Nikola Tesla", "Thomas Edison"],
        correctAnswer: 1,
    },
];
const questionNumberElement = document.getElementById("questionNo");
const questionTitleElement = questionNumberElement.querySelector("h4");
questionTitleElement.innerHTML = `Soru ${currentQuestionIndex + 1}`;

function renderQuestion() {
    const questionData = quizData[currentQuestionIndex];
    questionElement.textContent = questionData.question;
    optionsContainer.innerHTML = "";

    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement("label");
        optionElement.innerHTML = `
      <input type="radio" name="option" value="${index}" ${
            userAnswers[currentQuestionIndex] === index ? "checked" : ""
        } />
      ${option}
    `;
        optionsContainer.appendChild(optionElement);
    });

    const questionNumberElement = document.getElementById("questionNo");
    const questionTitleElement = questionNumberElement.querySelector("h4");
    questionTitleElement.innerHTML = `Soru ${currentQuestionIndex + 1}`;
}

nextButton.addEventListener("click", () => {
    const selectedOption = optionsContainer.querySelector("input[name='option']:checked");
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        renderQuestion();
    }
});

prevButton.addEventListener("click", () => {
    const selectedOption = optionsContainer.querySelector("input[name='option']:checked");
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }

    currentQuestionIndex--;
    if (currentQuestionIndex < 0) {
        currentQuestionIndex = 0;
    }
    renderQuestion();
});

function showResult() {
    quizData.forEach((questionData, index) => {
        const resultElement = document.createElement("div");
        resultElement.style.fontWeight = "bold";
        resultElement.textContent = `${index + 1}. Soru: `;

        const answerElement = document.createElement("span");
        answerElement.style.color = (userAnswers[index] === questionData.correctAnswer) ? "green" : "red";
        answerElement.textContent = (userAnswers[index] === questionData.correctAnswer) ? "Doğru" : "Yanlış";

        resultElement.appendChild(answerElement);
        correctIncorrect.appendChild(resultElement);

        const hrElement = document.createElement("hr");
        correctIncorrect.appendChild(hrElement);
    });

    document.getElementById("quiz-container").style.display = "none";
    result.style.display = "block";
    scoreElement.textContent = score;
}

restartButton.addEventListener("click", () => {
    document.getElementById("quiz-container").style.display = "block";
    result.style.display = "none";
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    correctIncorrect.innerHTML = ""; // Sonuçları temizle
    renderQuestion();
    stopTimer(); // Zamanlayıcıyı durdur
    timeLeft = 300; // Zamanlayıcıyı sıfırla
    timerElement.textContent = "05:00"; // Zamanlayıcıyı sıfırla
    started = false;
});


t_int = setInterval(timer,1000);
const timerElement = document.getElementById("timer");
let timerInterval;
let timeLeft = 300; // 5 dakika x 60 saniye = 300 saniye
let started = false;

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "00:00";
            showResult();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

optionsContainer.addEventListener("change", () => {
    if (!started) {
        started = true;
        startTimer();
    }
});

nextButton.addEventListener("click", () => {
    // ...
    if (currentQuestionIndex >= quizData.length) {
        stopTimer();
        showResult();
    } else {
        renderQuestion();
    }
});
restartButton.addEventListener("click", () => {
    // ...
    timeLeft = 300;
    timerElement.textContent = "05:00";
    started = false;
});
addQuestionButton.addEventListener('click', () => {
    const newQuestion = prompt('Yeni soruyu giriniz:');
    const newOption1 = prompt('1. seçeneği giriniz:');
    const newOption2 = prompt('2. seçeneği giriniz:');
    const newOption3 = prompt('3. seçeneği giriniz:');
    const correctAnswer = parseInt(prompt('Doğru seçeneğin numarasını giriniz (1, 2 veya 3):')) - 1;

    const newQuestionObject = {
        question: newQuestion,
        options: [newOption1, newOption2, newOption3],
        correctAnswer: correctAnswer
    }

    quizData.push(newQuestionObject);

    scorePerQuestion = 100 / quizData.length;

    renderQuestion();
});

editQuestionButton.addEventListener('click', () => {
    if(currentQuestionIndex >= quizData.length || currentQuestionIndex < 0) {
        console.error("Invalid question index");
        return;
    }
    const editedQuestion = prompt('Soruyu düzenleyiniz:', quizData[currentQuestionIndex].question);
    const editedOption1 = prompt('1. seçeneği düzenleyiniz:', quizData[currentQuestionIndex].options[0]);
    const editedOption2 = prompt('2. seçeneği düzenleyiniz:', quizData[currentQuestionIndex].options[1]);
    const editedOption3 = prompt('3. seçeneği düzenleyiniz:', quizData[currentQuestionIndex].options[2]);
    const correctAnswer = parseInt(prompt('Doğru seçeneğin numarasını giriniz (1, 2 veya 3):')) - 1;

    quizData[currentQuestionIndex] = {
        question: editedQuestion,
        options: [editedOption1, editedOption2, editedOption3],
        correctAnswer: correctAnswer
    }

    scorePerQuestion = 100 / quizData.length;

    renderQuestion();
});

renderQuestion();

optionsContainer.addEventListener("change", () => {
    if (!started) {
        started = true;
        startTimer();
    }
});
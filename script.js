const questions = [
    { question: "What does HTML stand for?", choices: ["Hyper Trainer Marking Language", "HyperText Markup Language", "HyperText Marketing Language", "Hyper Transfer Markup Level"], answer: 1 },
    { question: "Which symbol is used for single-line comments in JavaScript?", choices: ["//", "/*", "#", "<!-- -->"], answer: 0 },
    { question: "Which company developed Java?", choices: ["Microsoft", "Oracle", "Sun Microsystems", "IBM"], answer: 2 },
    { question: "What does CSS stand for?", choices: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Syntax"], answer: 0 },
    { question: "What is the output of 'typeof null' in JavaScript?", choices: ["null", "undefined", "object", "string"], answer: 2 },
    { question: "In Python, which keyword is used to define a function?", choices: ["func", "def", "function", "define"], answer: 1 },
    { question: "Which of these is not a programming language?", choices: ["Python", "Ruby", "HTML", "C++"], answer: 2 },
    { question: "What does 'git commit' do in Git?", choices: ["Uploads code", "Saves changes locally", "Deletes branch", "Syncs with remote"], answer: 1 },
    { question: "In C, which header file is needed for printf()?", choices: ["stdio.h", "stdlib.h", "math.h", "string.h"], answer: 0 },
    { question: "Which is the correct way to declare a variable in Java?", choices: ["int num;", "num int;", "declare int num;", "variable num;"], answer: 0 },
    { question: "Which HTML tag is used to include JavaScript code?", choices: ["<js>", "<script>", "<javascript>", "<code>"], answer: 1 },
    { question: "Which method is used to add an element at the end of an array in JavaScript?", choices: ["push()", "append()", "add()", "insert()"], answer: 0 },
    { question: "Which operator is used to compare both value and type in JavaScript?", choices: ["==", "===", "!=", "="], answer: 1 },
    { question: "Which function is used to print output in Python?", choices: ["print()", "echo()", "write()", "display()"], answer: 0 },
    { question: "Which keyword is used in Java to inherit a class?", choices: ["inherits", "extends", "super", "instanceof"], answer: 1 },
    { question: "Which database is a NoSQL database?", choices: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"], answer: 2 },
    { question: "In C++, what does 'cout' represent?", choices: ["Console Output", "Class Output", "Character Output", "Compile Output"], answer: 0 },
    { question: "What is the default value of an uninitialized int variable in Java?", choices: ["0", "null", "undefined", "garbage value"], answer: 0 },
    { question: "What is the extension of a JavaScript file?", choices: [".js", ".java", ".jsx", ".jsc"], answer: 0 },
    { question: "Which of these is a JavaScript framework?", choices: ["Django", "Flask", "React", "Laravel"], answer: 2 },
    { question: "In Python, which data type is immutable?", choices: ["List", "Dictionary", "Tuple", "Set"], answer: 2 },
    { question: "Which of these is used to style HTML pages?", choices: ["CSS", "JavaScript", "Python", "SQL"], answer: 0 },
    { question: "In Git, which command creates a new branch?", choices: ["git branch", "git create", "git new", "git branch-new"], answer: 0 }
];

// DOM elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const restartFinalBtn = document.getElementById('restart-final-btn');
const shareBtn = document.getElementById('share-btn');
const finalScoreEl = document.getElementById('final-score');

let shuffledQuestions, currentQuestionIndex, score, streak, timer, playerName = "";


startBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('player-name');
    const nameValue = nameInput.value.trim();
    
    if (nameValue === "") {
        alert("Please enter your name before starting!");
        return;
    }

    playerName = nameValue;
    welcomeScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    startQuiz();
});

restartBtn.addEventListener('click', startQuiz);
restartFinalBtn?.addEventListener('click', () => {
    resultScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    startQuiz();
});

shareBtn?.addEventListener('click', () => {
    const shareText = `${playerName} scored ${score} points in the Coding Quiz Challenge! Can you beat them?`;
    if (navigator.share) {
        navigator.share({ title: "Coding Quiz Challenge", text: shareText });
    } else {
        navigator.clipboard.writeText(shareText);
        alert("Score copied to clipboard! Share it with your friends.");
    }
});

function startQuiz() {
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    streak = 0;
    restartBtn.style.display = 'none';
    showQuestion();
    updateScore();
}

function showQuestion() {
    resetState();

    if (currentQuestionIndex >= shuffledQuestions.length) {
        endQuiz();
        return;
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    currentQuestion.choices.forEach((choice, index) => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.addEventListener('click', () => selectAnswer(index));
        choicesEl.appendChild(li);
    });

    startTimer();
    updateProgress();
}

function resetState() {
    clearInterval(timer);
    choicesEl.innerHTML = '';
    timerEl.style.color = '#ccc';
}

function selectAnswer(index) {
    const correct = shuffledQuestions[currentQuestionIndex].answer === index;

    if (correct) {
        streak++;
        score += 10 + (streak > 1 ? streak * 2 : 0);
    } else {
        streak = 0;
        score -= 5;
    }

    updateScore();
    currentQuestionIndex++;
    showQuestion();
}

function updateScore() {
    scoreEl.textContent = `${playerName}'s Score: ${score}`;
}

function startTimer() {
    let timeLeft = 15;
    timerEl.textContent = `Time left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 5) {
            timerEl.style.color = '#ff6b6b';
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            streak = 0;
            currentQuestionIndex++;
            showQuestion();
        }
    }, 1000);
}

function updateProgress() {
    const progress = (currentQuestionIndex / shuffledQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function endQuiz() {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    finalScoreEl.textContent = `${playerName}, your final score is: ${score}`;
}


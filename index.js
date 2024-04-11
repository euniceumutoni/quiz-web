const questions = [
    {
        questions: "What country is the programmer who made this from?",
        options: ["Congo", "British", "United States", "Rwanda"],
        correctAnswer: "Rwanda",
    }
    //might add more questions here
]


let currentQuestionIndex = 0;
let userAnswer = "";
let score = 0;


function displayQuestion () {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";



    for (const option of currentQuestion.options) {
        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "option";
        radioButton.value = option;
        radioButton.addEventListener("change",() => {
            userAnswer = option;
        });


        const label = document.createElement("label");
        label.textContent = option;

        const optionDiv = document.createElement("div");
        optionDiv.appendChild(radioButton);
        optionDiv.appendChild(label);

        optionsElement.appendChild(optionDiv);
    }
}

const submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", () => {
  const currentQuestion = questions[currentQuestionIndex];

  if (userAnswer === currentQuestion.correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Final Score: ${score}/${questions.length}`;
  }

  userAnswer = "";
});

displayQuestion();
// Question pools for each subject
const topics = {
    math: [
        { question: '5 + 7 = ?', answer: 12 },
        { question: '10 / 2 = ?', answer: 5 },
        { question: '15 - 6 = ?', answer: 9 }
    ],
    physics: [
        { question: 'What is the unit of force?', answer: 'Newton' },
        { question: 'What is the speed of light?', answer: '300000 km/s' },
        { question: 'What is the formula for gravity?', answer: '9.8 m/s^2' }
    ],
    chemistry: [
        { question: 'What is the chemical symbol for Oxygen?', answer: 'O' },
        { question: 'What is H2O commonly known as?', answer: 'Water' },
        { question: 'What is the pH level of water?', answer: 7 }
    ],
    english: [
        { question: 'What is the plural of "child"?', answer: 'children' },
        { question: 'What is the antonym of "good"?', answer: 'bad' },
        { question: 'Fill in the blank: "The cat ___ the hat."', answer: 'in' }
    ]
};
let selectedTopic = null;
let currentQuestion = null;
// Topic selection function
function selectTopic(topic) {
    selectedTopic = topic; // Set the selected topic globally
    document.getElementById('topicSelection').style.display = 'none'; // Hide topic selection buttons
    document.getElementById('gameArea').style.display = 'block'; // Show the game area
    generateQuestion(); // Generate the first question
}
// Function to generate a new question
function generateQuestion() {
    const questions = topics[selectedTopic];
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];
    // Display the question
    document.getElementById('question').innerText = currentQuestion.question;
    // Randomly assign correct answer to one of the three bubbles
    const correctBubble = Math.floor(Math.random() * 3) + 1;
    document.getElementById(answerBubble${correctBubble}).innerText = currentQuestion.answer;
    // Generate two wrong answers (simple for now, can be more sophisticated)
    const wrongAnswers = generateWrongAnswers(currentQuestion.answer);
    // Assign wrong answers to the remaining bubbles
    let wrongAnswerIndex = 0;
    for (let i = 1; i <= 3; i++) {
        if (i !== correctBubble) {
            document.getElementById(answerBubble${i}).innerText = wrongAnswers[wrongAnswerIndex];
            wrongAnswerIndex++;
        }
    }
}
// Function to generate wrong answers (can be customized for each topic)
function generateWrongAnswers(correctAnswer) {
    let wrongAnswers = [];
    while (wrongAnswers.length < 2) {
        let randomAnswer = Math.floor(Math.random() * 20) + 1; // Example for numbers
        if (randomAnswer !== correctAnswer && !wrongAnswers.includes(randomAnswer)) {
            wrongAnswers.push(randomAnswer);
        }
    }
    return wrongAnswers;
}
// Function to check if the clicked bubble has the correct answer
function checkAnswer(bubbleIndex) {
    const selectedAnswer = document.getElementById(answerBubble${bubbleIndex}).innerText;
    if (selectedAnswer == currentQuestion.answer) {
        alert('Correct!');
        generateQuestion(); // Load a new question if the answer is correct
    } else {
        alert('Wrong! Try again.');
    }
}
// Wizard movement logic
const wizard = document.getElementById("wizard");
let wizardPosition = 0;
let wizardState = 1; // 1 = wizard1.png (right), 3 = wizard3.png (left)
const gameAreaWidth = 800;
const wizardWidth = 100; // Match the CSS
const moveSpeed = 5;
let moveInterval;
// Keys for movement
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
        case 'ArrowRight':
            startMoving('right');
            break;
        case 'a':
        case 'ArrowLeft':
            startMoving('left');
            break;
        case 'w':
        case 'ArrowUp':
            performAction();
            break;
    }
});
// Stops movement when key is not being pressed
document.addEventListener('keyup', (event) => {
    stopMoving();
});
// Moving in a direction
function startMoving(direction) {
    stopMoving(); // Stop any previous movement
    if (direction === 'right') {
        wizard.style.backgroundImage = "url('wizard1.png')";
        wizardState = 1;
        moveInterval = setInterval(() => {
            if (wizardPosition < gameAreaWidth - wizardWidth) {
                wizardPosition += moveSpeed;
                wizard.style.left = wizardPosition + 'px';
            }
        }, 20);
    } else if (direction === 'left') {
        wizard.style.backgroundImage = "url('wizard3.png')";
        wizardState = 3;
        moveInterval = setInterval(() => {
            if (wizardPosition > 0) {
                wizardPosition -= moveSpeed;
                wizard.style.left = wizardPosition + 'px';
            }
        }, 20);
    }
}
// Stops the movement
function stopMoving() {
    clearInterval(moveInterval);
}
// When w or up arrow is pressed, use magic wizard staff
function performAction() {
    let playerAnswer = prompt("Enter your answer:");
    if (playerAnswer == currentQuestion.answer) {
        alert("Correct!");
        generateQuestion();  // Generate a new question if correct
    } else {
        alert("Wrong! Try again.");
    }
    if (wizardState === 1) {
        wizard.style.backgroundImage = "url('wizard1.png')";
    } else if (wizardState === 3) {
        wizard.style.backgroundImage = "url('wizard3.png')";
    }
}









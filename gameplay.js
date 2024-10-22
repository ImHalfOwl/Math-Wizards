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

function generateQuestion() {
    const questions = topics[selectedTopic];
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];

    // Display the question
    document.getElementById('question').innerText = currentQuestion.question;

    // Randomly assign the correct answer to one of the three bubbles
    const correctBubble = Math.floor(Math.random() * 3) + 1;
    document.getElementById(`answerBubble${correctBubble}`).innerText = currentQuestion.answer;

    // Generate two wrong answers
    const wrongAnswers = generateWrongAnswers(currentQuestion.answer);

    // Assign wrong answers to the remaining bubbles
    let wrongAnswerIndex = 0;
    for (let i = 1; i <= 3; i++) {
        if (i !== correctBubble) {
            document.getElementById(`answerBubble${i}`).innerText = wrongAnswers[wrongAnswerIndex];
            wrongAnswerIndex++;
        }
    }

    // Reset the bubbles to start the falling animation
    const bubbles = [
        document.getElementById('answerBubble1'),
        document.getElementById('answerBubble2'),
        document.getElementById('answerBubble3')
    ];

    bubbles.forEach(bubble => {
        bubble.style.animation = 'none'; // Disable the animation
        bubble.offsetHeight; // Trigger reflow
        bubble.style.animation = ''; // Re-enable the animation
    });
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
    const selectedAnswer = document.getElementById(`answerBubble${bubbleIndex}`).innerText;
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
            simulateClick(wizardPosition); // Register click at wizard's position
            break;
    }
});

// Stops movement when key is not being pressed
document.addEventListener('keyup', (event) => {
    stopMoving();
});

// Function to check proximity of the wizard to the answer bubbles
function checkProximityToBubbles() {
    const wizardLeft = wizardPosition;
    const wizardRight = wizardPosition + wizardWidth;

    const bubbles = [
        document.getElementById('answerBubble1'),
        document.getElementById('answerBubble2'),
        document.getElementById('answerBubble3')
    ];

    bubbles.forEach((bubble, index) => {
        const bubbleLeft = bubble.offsetLeft;
        const bubbleRight = bubble.offsetLeft + bubble.offsetWidth;

        // Check if the wizard is within 10px of the bubble and is in state 2 (right-action) or state 4 (left-action)
        if ((wizardState === 2 || wizardState === 4) && 
            (Math.abs(wizardLeft - bubbleRight) <= 10 || Math.abs(wizardRight - bubbleLeft) <= 10)) {
            checkAnswer(index + 1);  // Simulate bubble click
        }
    });
}

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
        }, 15);
    } else if (direction === 'left') {
        wizard.style.backgroundImage = "url('wizard3.png')";
        wizardState = 3;
        moveInterval = setInterval(() => {
            if (wizardPosition > 0) {
                wizardPosition -= moveSpeed;
                wizard.style.left = wizardPosition + 'px';
            }
        }, 15);
    }
}

// Stops the movement
function stopMoving() {
    clearInterval(moveInterval);
}

function performAction() {
    // Set wizard to active
    wizard.classList.remove('inactive');

    if (wizardState === 1) {
        wizard.style.backgroundImage = "url('wizard2.png')";
    } else if (wizardState === 3) {
        wizard.style.backgroundImage = "url('wizard4.png')";
    }

    setTimeout(() => {
        // Reset wizard state after action
        if (wizardState === 1) {
            wizard.style.backgroundImage = "url('wizard1.png')";
        } else if (wizardState === 3) {
            wizard.style.backgroundImage = "url('wizard3.png')";
        }

        // Set wizard to inactive
        wizard.classList.add('inactive');
    }, 2000); // Action duration
}

function simulateClick(wizardPosition) {
    const bubbles = [
        document.getElementById('answerBubble1'),
        document.getElementById('answerBubble2'),
        document.getElementById('answerBubble3')
    ];

    // Check each bubble's position to see if the wizard is over one of them
    bubbles.forEach((bubble, index) => {
        const bubbleLeft = bubble.offsetLeft;
        const bubbleRight = bubbleLeft + bubble.offsetWidth;

        // If the wizard is positioned over the bubble
        if (wizardPosition + wizardWidth >= bubbleLeft && wizardPosition <= bubbleRight) {
            checkAnswer(index + 1);  // Simulate click on the bubble
        }
    });
}
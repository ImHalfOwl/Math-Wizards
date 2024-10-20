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
    if (wizardState === 1) {
        wizard.style.backgroundImage = "url('wizard2.png')";
    } else if (wizardState === 3) {
        wizard.style.backgroundImage = "url('wizard4.png')";
    }
    
    setTimeout(() => {
        // Stops using magic wizard staff
        if (wizardState === 1) {
            wizard.style.backgroundImage = "url('wizard1.png')";
        } else if (wizardState === 3) {
            wizard.style.backgroundImage = "url('wizard3.png')";
        }
        isTransforming = false; 
    }, 2000); // 1000 is 1 second
}
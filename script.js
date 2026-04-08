const paragraphs = [
    "Programming is the art of algorithm design and the craft of debugging errant code. Every developer knows the feeling of relief when the code finally compiles and runs perfectly.",
    "A clean and modern design ensures that users have a pleasant experience. Usability is key, and an interface that responds intuitively can greatly enhance productivity and satisfaction.",
    "The vastness of the internet allows us to connect and share information instantly across the globe. Learning to code empowers individuals to build tools that solve real-world problems.",
    "Responsive web design provides an optimal viewing experience across a wide range of devices. Designers must craft layouts that adapt smoothly to tiny phones and large desktop monitors.",
    "JavaScript breathed life into the web, transforming static documents into interactive applications. Today, it remains an essential language for any aspiring web developer to master."
];

let initialTimer = 30; // Default 30s
let timeLeft = initialTimer;
let timerId = null;
let isTyping = false;
let charIndex = 0;
let errors = 0;
let correctChars = 0;

// DOM Elements Selection
const textDisplay = document.getElementById('text-display');
const hiddenInput = document.getElementById('hidden-input');
const timeElem = document.getElementById('time-left');
const liveWpmElem = document.getElementById('live-wpm');
const restartBtn = document.getElementById('restart-btn');
const timeBtns = document.querySelectorAll('.time-btn');
const typingBox = document.getElementById('typing-box');

// Results Modal Elements
const resultsModal = document.getElementById('results-modal');
const playAgainBtn = document.getElementById('play-again-btn');
const finalWpm = document.getElementById('final-wpm');
const finalAccuracy = document.getElementById('final-accuracy');
const finalChars = document.getElementById('final-chars');
const finalErrors = document.getElementById('final-errors');

function loadParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    const paragraph = paragraphs[randomIndex];
    
    // Clear and build the display area character by character
    textDisplay.innerHTML = '';
    paragraph.split('').forEach(char => {
        let span = document.createElement('span');
        span.innerText = char;
        textDisplay.appendChild(span);
    });
    
    // Set the first character active
    textDisplay.querySelectorAll('span')[0].classList.add('active');
    
    // Reset hidden input
    hiddenInput.value = '';
    hiddenInput.maxLength = paragraph.length; // Prevent over-typing
    
    // Reset state flags and counters
    charIndex = 0;
    errors = 0;
    correctChars = 0;
    isTyping = false;
    clearInterval(timerId);
    timeLeft = initialTimer;
    
    // Reset UI Counters
    timeElem.innerText = timeLeft + 's';
    liveWpmElem.innerText = 0;
    resultsModal.classList.remove('show');
    
    // Auto focus the input area securely
    setTimeout(() => hiddenInput.focus(), 10);
}

function initTyping() {
    const characters = textDisplay.querySelectorAll('span');
    const typedText = hiddenInput.value;
    
    // Start timing on the first keystroke
    if (!isTyping && typedText.length > 0) {
        timerId = setInterval(updateTimer, 1000);
        isTyping = true;
    }
    
    // If the timer is up, reject any further typing
    if (timeLeft <= 0) {
        hiddenInput.value = typedText.substring(0, charIndex); // Prevent accepting
        return;
    }

    correctChars = 0;
    errors = 0;
    charIndex = typedText.length;
    
    // Update visual styles
    characters.forEach((span, index) => {
        span.classList.remove('correct', 'incorrect', 'active');
        
        if (index < charIndex) {
            if (span.innerText === typedText[index]) {
                span.classList.add('correct');
                correctChars++;
            } else {
                span.classList.add('incorrect');
                errors++;
            }
        }
    });

    // Update active cursor location
    if (charIndex < characters.length) {
        characters[charIndex].classList.add('active');
    } else {
        clearInterval(timerId);
        showResults();
    }

    // Keep stats updated as user types
    updateLiveStats();
}

function updateLiveStats() {
    let timeElapsed = initialTimer - timeLeft;
    if (timeElapsed > 0) {
        // WPM = (Total Typed Characters / 5) / (Time Elapsed in Minutes)
        let wpm = Math.round((charIndex / 5) / (timeElapsed / 60));
        liveWpmElem.innerText = (wpm >= 0 && wpm !== Infinity) ? wpm : 0;
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeElem.innerText = timeLeft + 's';
        updateLiveStats();
    } else {
        clearInterval(timerId);
        showResults(); // Finish test
    }
}

function showResults() {
    hiddenInput.blur();
    
    // Compute total time spent, accounting for quickly finished tests
    let timeElapsed = initialTimer - timeLeft || 1; // Prevent zero division
    
    // WPM and Accuracy Logic
    let wpm = Math.round((charIndex / 5) / (timeElapsed / 60));
    let accuracy = charIndex > 0 ? Math.round((correctChars / charIndex) * 100) : 100;
    
    if (charIndex === 0) {
        wpm = 0;
        accuracy = 0;
    }

    // Populate data inside Modals
    finalWpm.innerText = wpm;
    finalAccuracy.innerText = accuracy + '%';
    finalChars.innerText = charIndex;
    finalErrors.innerText = errors;
    
    // Trigger Model reveal
    resultsModal.classList.add('show');
}

// User Action to toggle 30s / 60s
function changeTimeLimit(e) {
    timeBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    initialTimer = parseInt(e.target.getAttribute('data-time'));
    loadParagraph();
}

// -- Event Listeners List --
hiddenInput.addEventListener('input', initTyping);
restartBtn.addEventListener('click', loadParagraph);
playAgainBtn.addEventListener('click', loadParagraph);

// Emulate user clicking on display text to bring up mobile keyboard
typingBox.addEventListener('click', () => {
    hiddenInput.focus();
});

// Capture keystrokes naturally inside the app to auto-focus hidden input area
document.addEventListener('keydown', (e) => {
    // Only intercept if modal is closed and they are pressing typing characters mapping
    if (!resultsModal.classList.contains('show') && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        hiddenInput.focus();
    }
});

// Settings button triggers
timeBtns.forEach(btn => btn.addEventListener('click', changeTimeLimit));

// Initiate application startup
loadParagraph();

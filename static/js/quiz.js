const questions = [
    {
        question: "What is the primary purpose of a firewall?",
        options: [
            "To prevent unauthorized access to a network",
            "To remove viruses from infected files",
            "To encrypt sensitive data",
            "To create secure VPN connections"
        ],
        correct: 0
    },
    {
        question: "Which of the following is a common ransomware attack vector?",
        options: [
            "Phishing emails",
            "Legitimate software updates",
            "Hardware failures",
            "User manual data entry errors"
        ],
        correct: 0
    },
    {
        question: "What does the term 'Zero-Day Exploit' refer to?",
        options: [
            "A vulnerability that is exploited before the vendor releases a patch",
            "A malware that activates after zero days of infection",
            "A security policy that resets every 24 hours",
            "A type of ransomware that demands payment within 24 hours"
        ],
        correct: 0
    },
    {
        question: "Which encryption method is commonly used by ransomware to lock files?",
        options: [
            "AES (Advanced Encryption Standard)",
            "MD5 (Message Digest Algorithm)",
            "Base64 encoding",
            "SHA-256 (Secure Hash Algorithm)"
        ],
        correct: 0
    },
    {
        question: "What is the best way to prevent ransomware attacks?",
        options: [
            "Regular backups and employee training",
            "Disabling all network connections",
            "Using only open-source software",
            "Deleting all email attachments"
        ],
        correct: 0
    },
    {
        question: "What should an organization do immediately after detecting a ransomware attack?",
        options: [
            "Isolate infected systems and report the incident",
            "Pay the ransom to recover data quickly",
            "Continue normal operations to avoid panic",
            "Delete all backups to prevent reinfection"
        ],
        correct: 0
    },
    {
        question: "What is 'double extortion' in ransomware attacks?",
        options: [
            "Demanding payment for both decryption and preventing data leaks",
            "Encrypting files twice for stronger security",
            "Attacking two different organizations simultaneously",
            "Using two different ransomware strains at once"
        ],
        correct: 0
    },
    {
        question: "Which of the following is NOT a recommended ransomware mitigation strategy?",
        options: [
            "Paying the ransom to guarantee data recovery",
            "Implementing endpoint detection and response (EDR) tools",
            "Enforcing least-privilege access controls",
            "Conducting regular security awareness training"
        ],
        correct: 0
    },
    {
        question: "What role does a 'kill switch' play in ransomware defense?",
        options: [
            "It can stop ransomware from spreading by cutting off its communication",
            "It automatically pays the ransom to unlock files",
            "It permanently deletes infected files to prevent further damage",
            "It reboots the system to remove malware"
        ],
        correct: 0
    },
    {
        question: "Which file extension is commonly associated with ransomware-encrypted files?",
        options: [
            ".locked, .crypt, or .encrypted",
            ".txt or .docx",
            ".exe or .bat",
            ".zip or .rar"
        ],
        correct: 0
    },
    {
        question: "What is the primary goal of a Business Email Compromise (BEC) attack?",
        options: [
            "To trick employees into transferring money or sensitive data",
            "To encrypt company files and demand ransom",
            "To overload a network with traffic (DDoS)",
            "To steal physical hardware"
        ],
        correct: 0
    },
    {
        question: "Which cybersecurity framework is often used for ransomware preparedness?",
        options: [
            "NIST Cybersecurity Framework",
            "ISO 9001 (Quality Management)",
            "GDPR (General Data Protection Regulation)",
            "PCI DSS (Payment Card Industry Data Security Standard)"
        ],
        correct: 0
    },
    {
        question: "What is 'sandboxing' in malware analysis?",
        options: [
            "Isolating and executing suspicious files in a secure environment",
            "Deleting all suspicious files immediately",
            "Encrypting files to prevent malware execution",
            "Blocking all network traffic temporarily"
        ],
        correct: 0
    },
    {
        question: "Why is ransomware-as-a-service (RaaS) a growing threat?",
        options: [
            "It allows even non-technical criminals to launch ransomware attacks",
            "It provides free decryption tools to victims",
            "It is endorsed by cybersecurity agencies",
            "It only targets large corporations"
        ],
        correct: 0
    },
    {
        question: "What is the first step in incident response for a ransomware attack?",
        options: [
            "Contain the infection to prevent further spread",
            "Contact the attackers to negotiate payment",
            "Publicly announce the breach immediately",
            "Reboot all systems to remove malware"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(-1);
let timeLeft = 1200; // 20 minutes in seconds
let timerInterval;

function initQuiz() {
    updateProgress();
    startTimer();
    showQuestion();
    
    // Add event listeners for navigation buttons
    document.getElementById('prevBtn').addEventListener('click', prevQuestion);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('submitBtn').addEventListener('click', submitQuiz);
}

function showQuestion() {
    const question = questions[currentQuestion];
    const optionsContainer = document.getElementById('optionsContainer');
    
    document.getElementById('questionText').textContent = question.question;
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = `option-item ${userAnswers[currentQuestion] === index ? 'selected' : ''}`;
        optionElement.innerHTML = `
            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${option}</span>
        `;
        optionElement.dataset.index = index;
        
        // Add event listener to each newly created option
        optionElement.addEventListener('click', selectOption);
        
        optionsContainer.appendChild(optionElement);
    });

    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').style.display = currentQuestion === questions.length - 1 ? 'none' : 'block';
    document.getElementById('submitBtn').style.display = currentQuestion === questions.length - 1 ? 'block' : 'none';
}

function selectOption(e) {
    const selectedIndex = parseInt(e.currentTarget.dataset.index);
    userAnswers[currentQuestion] = selectedIndex;
    
    // Remove selected class from all options
    document.querySelectorAll('.option-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    e.currentTarget.classList.add('selected');
}

function updateProgress() {
    const progress = (currentQuestion + 1) / questions.length * 100;
    document.getElementById('quizProgress').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').innerHTML = `
            <i class="fas fa-hourglass-half"></i>
            <span>Time Remaining: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</span>
        `;
        
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

function nextQuestion() {
    if(currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
        updateProgress();
    }
}

function prevQuestion() {
    if(currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        updateProgress();
    }
}

function submitQuiz() {
    clearInterval(timerInterval);
    const score = calculateScore();
    localStorage.setItem('quizResult', JSON.stringify({
        score: score,
        total: questions.length,
        answers: userAnswers
    }));
    window.location.href = '/result';
}

function calculateScore() {
    return questions.reduce((acc, question, index) => {
        return acc + (userAnswers[index] === question.correct ? 1 : 0);
    }, 0);
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);

document.getElementById('endBtn').addEventListener('click', () => {
    const confirmEnd = confirm("Are you sure you want to end the quiz early?");
    if (!confirmEnd) return;

    clearInterval(timerInterval);

    const score = calculateScore(); // Use your existing function

    localStorage.setItem('quizResult', JSON.stringify({
        score: score,
        total: questions.length,
        answers: userAnswers
    }));

    window.location.href = '/result';
});

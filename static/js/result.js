document.addEventListener('DOMContentLoaded', () => {
    const result = JSON.parse(localStorage.getItem('quizResult'));
    if(!result) window.location.href = 'quiz.html';

    const percentage = Math.round((result.score / result.total) * 100);
    
    document.getElementById('scorePercentage').textContent = `${percentage}%`;
    document.getElementById('correctCount').textContent = result.score;
    document.getElementById('totalQuestions').textContent = result.total;

    const questionsList = document.getElementById('questionsList');
    questions.forEach((question, index) => {
        const isCorrect = result.answers[index] === question.correct;
        const questionEl = document.createElement('div');
        questionEl.className = `question-item ${isCorrect ? 'correct' : 'incorrect'}`;
        questionEl.innerHTML = `
            <h3>Question ${index + 1}: ${question.question}</h3>
            <p>Your answer: ${question.options[result.answers[index]] || 'Not answered'}</p>
            <p>Correct answer: ${question.options[question.correct]}</p>
        `;
        questionsList.appendChild(questionEl);
    });
});
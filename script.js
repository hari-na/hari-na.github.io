document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quizContainer');
    const quizForm = document.getElementById('quizForm');
    const resultContainer = document.getElementById('result');

    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            const questions = data.questions;
            const selectedQuestions = selectRandomQuestions(questions, 10);
            renderQuestions(selectedQuestions);

            quizForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const score = calculateScore(selectedQuestions);
                resultContainer.textContent = `Your score is: ${score} / 10`;
                disableAllInputs();
            });
        });

    function selectRandomQuestions(questions, count) {
        const shuffled = questions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function renderQuestions(questions) {
        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            
            const questionTitle = document.createElement('p');
            questionTitle.textContent = `${index + 1}. ${question.question}`;
            questionDiv.appendChild(questionTitle);

            const optionsList = document.createElement('ul');
            optionsList.className = 'options';

            question.options.forEach((option, i) => {
                const optionItem = document.createElement('li');
                
                const label = document.createElement('label');
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = `question${index}`;
                radioInput.value = option;
                
                label.appendChild(radioInput);
                label.appendChild(document.createTextNode(option));
                optionItem.appendChild(label);
                optionsList.appendChild(optionItem);
            });

            questionDiv.appendChild(optionsList);
            quizContainer.appendChild(questionDiv);
        });
    }

    function calculateScore(questions) {
        let score = 0;
        questions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && selectedOption.value === question.answer) {
                score++;
            }
        });
        return score;
    }

    function disableAllInputs() {
        const inputs = quizForm.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => input.disabled = true);
    }
});

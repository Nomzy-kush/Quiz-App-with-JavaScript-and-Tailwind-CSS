const startButton = document.querySelector('#start-btn')
const nextButton = document.querySelector('#next-btn')
const questionContainerElement = document.querySelector('#question-container')
const questionElement = document.querySelector('#question')
const answerButtonsElement = document.querySelector('#answer-buttons')

let shuffledQuestions, currentQuestionIndex




const startQuiz = () => {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

}


const setNextQuestion = () => {
    resetState()
    displayQuestion(shuffledQuestions[currentQuestionIndex])

}

const displayQuestion = (question) => {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', chooseAnswer)
        answerButtonsElement.appendChild(button)
    })

}

const resetState = () => {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

const chooseAnswer = (e) => {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

const setStatusClass = (element, correct) => {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

const clearStatusClass = (element) => {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'what is 10 * 2?',
        answers: [
            { text: '102', correct: false },
            { text: '210', correct: false },
            { text: '12', correct: false },
            { text: '20', correct: true }
        ]
    },
    {
        question: 'where can you learn how to be a better technical writer?',
        answers: [
            { text: 'Zoo', correct: false  },
            { text: 'Section Eng-Ed', correct: true  },
            { text: 'At the park', correct: false  },
            { text: 'None of them', correct: false  }
        ]
    },
    {
        question: 'Who built this project?',
        answers: [
            { text: 'Prince Philips', correct: false },
            { text: 'Barrack Obama', correct: false },
            { text: 'Doro Onome', correct: true },
            { text: 'John Cena', correct: false },          
        ]
    }, 

    {
        question: 'Who is the greatest footballer of all time',
        answers: [
            { text: 'CR7', correct: true },
            { text: 'Zinedine Zidane', correct: false},
            { text: 'Ronaldinho', correct: false },
            { text: 'Lionel Messi', correct: false }
        ]
    }
]

startButton.addEventListener('click', startQuiz);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

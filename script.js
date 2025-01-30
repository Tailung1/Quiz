const questionsContainer=document.querySelector('#questions-container')
const optionsContainer=document.querySelector('#options-container')
const submitBtn=document.querySelector('#submit')
const scoreElement=document.querySelector('#score')


let currentQuestionsIndex=0
let score=0;

fetch("questions.json")
.then(response =>response.json())
.then(questions=>startQuiz(questions))

function startQuiz(questions) {
    displayQuestion(questions[currentQuestionsIndex])
     submitBtn.addEventListener('click',()=> {
        const selectedOption= document.querySelector(
            "input[name='option']:checked"
        );
        if(selectedOption) {
            const userAnswer=selectedOption.value
            const correctAnswer=questions[currentQuestionsIndex].answer

            if(userAnswer === correctAnswer) {
                score++
            }
            currentQuestionsIndex++
            scoreElement.textContent=`Score: ${score}`

            if(currentQuestionsIndex < questions.length) {
                displayQuestion(questions[currentQuestionsIndex])
            } else {
                endQuiz()
            }
        }    
    })
}

function displayQuestion(questionsObj) {
    questionsContainer.textContent=questionsObj.question
    optionsContainer.innerHTML=""; // reset
    questionsObj.options.forEach((option,index)=> { // index is in built,which is 0 by default 
//                                                  // and increments by 1 on each iteration 
        const radionBtn=document.createElement('input')
        radionBtn.type='radio';
        radionBtn.name='option';
        radionBtn.value=option
        radionBtn.id =`option${index}`

        const label=document.createElement('label')
        label.textContent=option
        label.htmlFor=`option${index}`

        optionsContainer.appendChild(radionBtn)
        optionsContainer.appendChild(label)

    })
}

function endQuiz() {
    questionsContainer.innerHTML=`<h2>Quiz Completed </h2>`
    optionsContainer.textContent="";
    submitBtn.style.display='none'
    
    scoreElement.innerHTML=`Total Score: ${score}`
    scoreElement.style.cssText="color:blue;font-size:30px"
}

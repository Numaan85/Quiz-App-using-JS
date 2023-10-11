const question = [
    {
        question:"Which is the largest mammal on the earth",
        answers:[
            {text:"Blue Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Shark",correct:false},
            {text:"Dani Daniel",correct:false}
        ]
    },
    {
        question:"The staple food of the Vedic Aryan was",
        answers:[
            {text:"Barley and rice",correct:false},
            {text:"Milk and its products",correct:true},
            {text:"Rice and pulses",correct:false},
            {text:"Vegetables and fruits",correct:false}
        ]
    },
    {
        question:"The Saka Era was founded by",
        answers:[
            {text:"Kadphises I",correct:false},
            {text:"Kanishka",correct:true},
            {text:"Alexander",correct:false},
            {text:"Menander",correct:false}
        ]
    },
    {
        question:"Mahatma Gandhi's remark , ' A post-dated cheque on a crumbling bank' is regarding the proposal of ______",
        answers:[
            {text:"Simon Commission",correct:false},
            {text:"Cripps Mission",correct:true},
            {text:"Cabinet Mission",correct:false},
            {text:"Wavel Plan",correct:false}
        ]
    },
    {
        question:"Who first imposed Jizya Tax in India",
        answers:[
            {text:"Allaudin Khilji",correct:false},
            {text:"Aurangzeb",correct:false},
            {text:"Mohammad Bin Qasim",correct:false},
            {text:"Qutb-ud-din Aibak",correct:true}
        ]
    }

];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-button');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex =0;
let score =0;



function startQuiz(){
    currentQuestionIndex =0;
    score =0;
    nextButton.innerHTML ='Next';
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = question[currentQuestionIndex];
    let questionNo= currentQuestionIndex +1;

    // It changes question in HTML through innerHtml tag 

    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    // The forEach() method calls a function for each element in an array.

    // The forEach() method is not executed for empty elements.
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button'); 
        // The createElement() method creates an element node.
        button.innerHTML = answer.text;
        // classList.add() add btn css in button
        button.classList.add('btn');
        // The appendChild() method appends a node (element) as the last child of an element
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if (isCorrect){
        selectedbtn.classList.add('correct');
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    // The Array.from() method returns an array from any object with a length property.

    // The Array.from() method returns an array from any iterable object.
    Array.from(answerButtons.children).forEach(button=>{
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        // If you select one then it disable the cursor to choose another
        button.disabled =true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML =`You have scored ${score} out of ${question.length}!`;
    nextButton.innerHTML ="Play Again";
    nextButton.style.display ="block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex<question.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
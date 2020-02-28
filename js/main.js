// Problem: Create an Awesome Web App quiz using an object full of questions...
// Solution: Add interactivity to our app using events...

var quiz = document.getElementById('quiz');
var btnStart = document.getElementById('start-quiz');
var questionsHit = 0,
    questionsNumber = 1;
var questionsCorrect = [];
var whichquestion = [];
var whichwrong = [];

// Array of Questions...
var questions = [
    {
        question: 'What is the capital of Canada?',
        choices: [
            'São Paulo', 'Madrid', 'Ottawa', 'Cairo'
        ],
        correctAnswer: 2,
        wrongAnswers: [0, 1, 3]
    },
    {
        question: 'What is the capital of Sweeden?',
        choices: [
            'Tokyio', 'Estocolmo', 'Moscow', 'Havana'
        ],
        correctAnswer: 1,
        wrongAnswers: [0, 2, 3]
    },
    {
        question: 'What is the capital of Germany?',
        choices: [
            'Berlim', 'Paris', 'Lyon', 'Montevidéu'
        ],
        correctAnswer: 0,
        wrongAnswers: [1, 2, 3]
    },
    {
        question: 'What is the capital of Argentina?',
        choices: [
            'Munique', 'Kiev', 'New York', 'Bueno Aires'
        ],
        correctAnswer: 3,
        wrongAnswers: [0, 1, 2]
    }, {
        question: 'What is the capital of Norway?',
        choices: [
            'Beijing', 'Oslo', 'Sidney', 'Seattle'
        ],
        correctAnswer: 1,
        wrongAnswers: [0, 2, 3]
    },
];

// Creating question Structure...
var createQuestionElements = function (currentQuestion) {
	
	


    var option,
        radio,
        label,
        btn;



    var questionHolder = document.createElement('div');
    var question = document.createElement('p');
    var qcount = document.createElement('p');
    var qscore = document.createElement('p');

    questionHolder.classList.add('question');
    questionHolder.classList.add('qcount');
	questionHolder.classList.add('qscore');
	
	

    qcount.innerHTML = currentQuestion.qcount;
    questionHolder.appendChild(qcount);
    // qcount.innerHTML = "Question " + questionsNumber + " of 5" + " - " + "Score: " + questionsHit * 20 + "%";
	qcount.innerHTML = '<div class="container-fluid"><div class="row align-items-center""><div class="col">' + "Question " + questionsNumber + " of 5" + " - " + "Score: " + questionsHit * 20 + "%" +'</div></div></div>';
	question.innerHTML = '<div class="container-fluid"><div class="row align-items-center""><div class="col">' + currentQuestion.question + '</div></div></div>';
	// question.innerHTML = currentQuestion.question;
    questionHolder.appendChild(question);

    for (var i = 0; i < 4; i++) {
		option = document.createElement('div');
		
		option.innerHTML = '<div class="container-fluid"><div class="row align-items-center""><div class="col">' + "fasdf" + '</div></div></div>';


        radio = document.createElement('input');
        label = document.createElement('label');
        btn = document.createElement('a');

        option.classList.add('option');

        radio.type = 'radio';
        radio.name = 'choice';

        option.appendChild(radio);
		option.appendChild(label);
		
        label.innerHTML = currentQuestion.choices[i];

        questionHolder.appendChild(option);
    }

    quiz.appendChild(questionHolder);

    // btn.classList.add('btn');
    // btn.classList.add('btn-small');
	// btn.innerHTML = 'Submit';
	btn.innerHTML = '<div class="container-fluid"><div class="row align-items-center""><div class="col"><button type="button"class="btn" >Submit</button></div></div></div>'

    btn.addEventListener('click', function () {
        validateAnswer(currentQuestion);
    });

	quiz.appendChild(btn);



}
var jester = new Object;
var element = [];

var checkAnswer = function (option, currentQuestion) {
    var cur;
    if (option.lastElementChild.innerHTML === currentQuestion.choices[currentQuestion.correctAnswer]) {
        questionsHit = questionsHit + 1;
        whichquestion = whichquestion.concat(currentQuestion.question);
        jester = {
            q: currentQuestion.question,
            choice: option.lastElementChild.innerHTML,
            answer: currentQuestion.choices[currentQuestion.correctAnswer],
			state: true,
			answers: currentQuestion.wrongAnswers
        };
        element.push(jester);
        console.log(option.lastElementChild.innerHTML);
        console.log('hitt --> ', questionsHit * 20 + "%");
    } else {
        console.log("FALSE");
        console.log(option.lastElementChild.innerHTML);
        jester = {
            q: currentQuestion.question,
            choice: option.lastElementChild.innerHTML,
            answer: currentQuestion.choices[currentQuestion.correctAnswer],
			state: false,
			answers: currentQuestion.wrongAnswers
        };
        element.push(jester);
    }

    console.log(element);

    // var prog = document.createElement('div');

    // questionHolder.classList.add('progress-bar');
    // questionHolder.classList.add('qcount');
    // questionHolder.classList.add('qscore');

    // qscore.innerHTML = currentQuestion.qscore;
    // questionHolder.appendChild(qscore);
    // qscore.innerHTML="Score: " + questionsHit*20+"%";

    // <div class="progress">
    // <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
    // </div>
    // whichcorrect = questionsCorrect.concat(questionsHit);

    // whichwrong = whichwrong.concat(currentQuestion.question);
    // console.log("WRONG ----> " + whichwrong);

    questionsNumber = questionsNumber + 1;
    quiz.innerHTML = '';
    getQuestion();
};

var validateAnswer = function (currentQuestion) {
    var input = document.querySelectorAll('.option input');
    var inputCounter = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i].checked) {
            inputCounter = inputCounter + 1;
        }
    }
    if (inputCounter > 0) {
        document.querySelector('.question-alert').style.display = 'none';
        var option = document.querySelector('input:checked').parentNode;
        checkAnswer(option, currentQuestion);
    } else {
        document.querySelector('.question-alert').style.display = 'block';
    }
};

var showScore = function () {
    console.log(element);

    var firstHeading = document.createElement('h2');
    firstHeading.innerHTML = 'Congratulations for finish the Quiz!!!';

    var secondHeading = document.createElement('h3');
    secondHeading.innerHTML = 'Your score is ' + questionsHit + ' out of ' + questionsNumber;

    quiz.appendChild(firstHeading);
    quiz.appendChild(secondHeading)

    // var data = document.createElement('p');
    // var i = 0;
    // var text = ["text1", "tex2", "text3", "text4"];
    for (var key in element) {
		console.log(element[key].q);
		var newdiv = document.createElement('div');
		var collapse = "collapse"+key;
		newdiv.innerHTML = '<div class="accordion" id="accordionExample"><div class="card"><div class="card-header" id="headingOne">' +
		  '<h2 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#' + collapse + '" aria-expanded="false" aria-controls="' + collapse + '">' + element[key].q +'</button></h2></div>'+
			'<div id="' + collapse + '" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample"><div class="card-body">' + element[key].state + '</div></div></div>'
		  quiz.appendChild(newdiv);

        // data.innerHTML = element[key].q;
        // var div = document.createElement("div");

        // div.className = "finalBlock";

        // div.innerHTML = element[key].q;
        // quiz.appendChild(div);

        // div.innerHTML = element[key].choice;
        // div.innerHTML = element[key].answer;
    }
}

var getQuestion = function () {
    if (typeof questions !== undefined && questions.length > 0) {
        var currentQuestion = questions.shift();
        createQuestionElements(currentQuestion);
    } else {
        showScore();
    }
}

btnStart.addEventListener('click', function () {
    console.log('asf')
    quiz.innerHTML = '';
    getQuestion();
});

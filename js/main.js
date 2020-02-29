// Problem: Create an Awesome Web App quiz using an object full of questions...
// Solution: Add interactivity to our app using events...

var quiz = document.getElementById('quiz');
var btnStart = document.getElementById('start-quiz');
var questionsHit = 0,
    questionsNumber = 1;
var questionsCorrect = [];
var whichquestion = [];
var whichwrong = [];

// var imported = document.createElement('script');
// imported.src = '/path/to/imported/script';
// document.head.appendChild(imported);

// fetch('https://jsonplaceholder.typicode.com/posts').then(function (response) {
// 	// The API call was successful!
// 	return response.json();
// }).then(function (data) {
// 	// This is the JSON from our response
// 	console.log(data);
// }).catch(function (err) {
// 	// There was an error
// 	console.warn('Something went wrong.', err);
// });

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
    // var qscore = document.createElement('p');

    questionHolder.classList.add('question');
    questionHolder.classList.add('qcount');
    questionHolder.classList.add('qscore');

    qcount.innerHTML = currentQuestion.qcount;
    questionHolder.appendChild(qcount);

    // qcount.innerHTML = "Question " + questionsNumber + " of 5" + " - " + "Score: " + questionsHit * 20 + "%";
    qcount.innerHTML = '<div class="container-fluid"><div class="row align-items-center""><div class="col">' + "Question " + questionsNumber + " of 5" + " - " + "Score: " + questionsHit * 20 + "%" + '</div></div></div>';
    question.innerHTML = '<div class="container-fluid"><div class="row align-items-center""><div class="col">' + currentQuestion.question + '</div></div></div>';
    // question.innerHTML = currentQuestion.question;
    questionHolder.appendChild(question);


    // diver = document.createElement('div');
    // diver.innerHTML = '<div class="container-fluid"><div class="row align-items-center">';


    // for (var i2 = 0; i2 < 4; i2++) {
    //     option = document.createElement('div');
    //     option.innerHTML = '<div class="col-sm-3">' + currentQuestion.choices[i2] + '</div>';
    //     console.log(currentQuestion.choices[i2])
    // }
    diverA = document.createElement('div');
    diverA.classList.add("container-fluid");

    diver2 = document.createElement('div');
    diver2.classList.add("row");
    diver2.classList.add("align-items-center");
    // diver2.innerHTML = '</div></div>';
    // questionHolder.appendChild(diver2);

    for (var i = 0; i < 4; i++) {
        option = document.createElement('div');
        // option.innerHTML = '<div class="col-sm-3">';

        radio = document.createElement('input');
        label = document.createElement('label');
        btn = document.createElement('a');

        option.classList.add('col-md-3');


        radio.type = 'radio';
        radio.name = 'choice';


        option.appendChild(radio);
        option.appendChild(label);

        label.innerHTML = currentQuestion.choices[i];
        // label.innerHTML = '<div class="container-fluid"><div class="row align-items-center"><div class="col-sm-3">' + currentQuestion.choices[i] + '</div></div></div>';;
        diver2.appendChild(option);
    }
    diverA.appendChild(diver2);
    questionHolder.appendChild(diverA);


    // var ender = document.createElement('div');
    // ender.innerHTML = '</div></div>';
    // questionHolder.appendChild(ender);

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
            selected: option.lastElementChild.innerHTML,
            choices: currentQuestion.choices,
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
            selected: option.lastElementChild.innerHTML,
            choices: currentQuestion.choices,
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
    console.log("clicked");
    var input = document.querySelectorAll('input');
    // var input = document.querySelectorAll('.option input');

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
        var newdiv = document.createElement('div');
        var collapse = "collapse" + key;

        newdiv.innerHTML = '<div class="accordion" id="accordionExample"><div class="card"><div class="card-header" id="headingOne">' +
            '<h2 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#' + collapse + '" aria-expanded="false" aria-controls="' + collapse + '">' + element[key].q + '</button></h2></div>' +
            '<div id="' + collapse + '" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample"><div class="card-body">'



        diverA = document.createElement('div');
        diverA.classList.add("container-fluid");

        diver2 = document.createElement('div');
        diver2.classList.add("row");
        diver2.classList.add("align-items-center");



        for (var i = 0; i < element[key].choices.length; i++) {

            option = document.createElement('div');
            option.classList.add('col-md-3');

            if (element[key].choices[i] == element[key].answer) {
                option.innerHTML = element[key].choices[i];
                console.log("CORRECT --> " + element[key].choices[i]);
            } else {
                option.innerHTML = element[key].choices[i];
                console.log("WRONG --> " + element[key].choices[i]);
            }

        // label.innerHTML = '<div class="container-fluid"><div class="row align-items-center"><div class="col-sm-3">' + currentQuestion.choices[i] + '</div></div></div>';;
            diver2.appendChild(option);
        }
        quiz.appendChild(newdiv);
        var ender = document.createElement('div');
        ender.innerHTM = '</div></div></div>';
        quiz.appendChild(ender);

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


// function ajax_get(url, callback) {
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function() {
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             console.log('responseText:' + xmlhttp.responseText);
//             try {
//                 var data = JSON.parse(xmlhttp.responseText);
//             } catch(err) {
//                 console.log(err.message + " in " + xmlhttp.responseText);
//                 return;
//             }
//             callback(data);
//         }
//     };

//     xmlhttp.open("GET", url, true);
//     xmlhttp.send();
// }

// ajax_get('legend.json', function(data) {
//     document.getElementById("title").innerHTML = data["title"]; 
//     var html = "<h2>" + data["question"] + "</h2>";
//     html += "<h3>" + data["choices"] + "</h3>";
//     document.getElementById("text").innerHTML = html;
// });

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/Users/csk/Desktop/aptiv/legend.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            console.log(xobj.responseText);
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


btnStart.addEventListener('click', function () {
    console.log('asf')

    quiz.innerHTML = '';
    getQuestion();
});

// Problem: Create an Awesome Web App quiz using an object full of questions...
// Solution: Add interactivity to our app using events...

var quiz = document.getElementById('quiz');
var btnStart = document.getElementById('start-quiz');
var questionsHit = 0,
    questionsNumber = 1;
var questionsCorrect = [];
var whichquestion = [];
var whichwrong = [];

var globalJSON = [];




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


function readJSON(path) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'blob';
    xhr.onload = function (e) {
        if (this.status == 200) {
            var file = new File([this.response], 'temp');
            var fileReader = new FileReader();
            fileReader.addEventListener('load', function () {
                json = JSON.parse(fileReader.result);
                console.log(json);
                globalJSON.push(json);
            });
            fileReader.readAsText(file);
        }
    }
    xhr.send();
}

var counter = 0;
// Creating question Structure...
var createQuestionElements = function (currentQuestion) {


    var jj = globalJSON;


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



    // BLOCK --> Score
    qH1 = document.createElement('div');
    qH1.classList.add("container-fluid");

    qH2 = document.createElement('div');
    qH2.classList.add("row");
    qH2.classList.add("align-items-center");

    option3 = document.createElement('div');
    option3.classList.add('col-md-12');
    option3.classList.add('d-flex');
    option3.classList.add('justify-content-center');
    option3.innerHTML = "Question " + questionsNumber + " of " + " 5 " + "Score: " + questionsHit * 20 + "%";

    qH2.appendChild(option3);
    qH1.appendChild(qH2);
    questionHolder.appendChild(qH1);



    // BLOCK --> Question
    qQ1 = document.createElement('div');
    qQ1.classList.add("container-fluid");

    qQ2 = document.createElement('div');
    qQ2.classList.add("row");
    qQ2.classList.add("align-items-center");

    option4 = document.createElement('div');
    option4.classList.add('col-md-12');
    option4.classList.add('d-flex');
    option4.classList.add('justify-content-center');
    option4.innerHTML = currentQuestion.question;

    qQ2.appendChild(option4);
    qQ1.appendChild(qQ2);
    questionHolder.appendChild(qQ1);



    // console.log(globalJSON.legend[0].question);

    // console.log(globalJSON[0].question, counter);

    // for (var i = 0; i < globalJSON.length; i++) {
    //     console.log(globalJSON[i]);
    // }
    // qcount.innerHTML = "Question " + questionsNumber + " of 5" + " - " + "Score: " + questionsHit * 20 + "%";
    qcount.innerHTML = '<div class="container-fluid"><div class="row align-items-center""><div class="col">' + "Question " + questionsNumber + " of " + " 5 " + "Score: " + questionsHit * 20 + "%" + '</div></div></div>';
    question.innerHTML = '<div class="container-fluid"><div class="row align-items-center""><div class="col">' + currentQuestion.question + '</div></div></div>';
    // question.innerHTML = currentQuestion.question;
    questionHolder.appendChild(question);





    counter += 1;
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
        option.classList.add('col-md-3');
        option.classList.add('d-flex');
        option.classList.add('justify-content-center');
        // option.innerHTML = '<div class="col-sm-3">';

        radio = document.createElement('input');
        label = document.createElement('label');
        btn = document.createElement('a');




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
    tester = document.createElement('div');


    questionHolder.appendChild(tester)


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



function clickDL() {
    const date = new Date().toLocaleString();
    var stringit = JSON.stringify(element);
    let filename = date + ".json"
    console.log(stringit);
    console.log(filename);
    // download(stringit, filename, "text/plain");

    var a = document.createElement("a");
    var file = new Blob([stringit], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}


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
    // console.log(globalJSON);
    console.log(element);
    var firstHeading = document.createElement('h2');
    firstHeading.innerHTML = 'Congratulations for finish the Quiz!!!';

    var secondHeading = document.createElement('h3');
    secondHeading.innerHTML = 'Your score is ' + questionsHit + ' out of 5';

    var downloadButton = document.createElement('div');
    downloadButton.innerHTML = '<button class="btn btn-link" onclick="clickDL()">download results</button>';

    quiz.appendChild(firstHeading);
    quiz.appendChild(secondHeading);
    quiz.appendChild(downloadButton);

    for (var key in element) {
        var resultsDiv = document.createElement('p');
        console.log(element[key].q);
        resultsDiv.innerHTML = element[key].q;
        quiz.appendChild(resultsDiv);

        for (var i = 0; i < element[key].choices.length; i++) {
            if (element[key].choices[i] == element[key].selected) {
                console.log("SELECTED --> " + element[key].choices[i]);
                if (element[key].selected == element[key].answer) {
                    console.log("right");
                    var option = document.createElement('p');
                    option.innerHTML = '<font color="green">' + element[key].selected + '</font>';
                    resultsDiv.append(option);
                } else if (element[key].selected != element[key].answer) {
                    console.log("wrong");
                    var option = document.createElement('p');
                    option.innerHTML = '<font color="red">' + element[key].selected + '</font>';
                    resultsDiv.append(option);
                    var option2 = document.createElement('p');
                    option2.innerHTML = '<font color="green">' + element[key].answer + '</font>';
                    resultsDiv.append(option2);
                }

                // }
            } else {
                // console.log("the rest --> " + element[key].choices[i]);
                // var option = document.createElement('p');
                // option.innerHTML = element[key].choices[i];
                // resultsDiv.append(option);
            }
        }
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


btnStart.addEventListener('click', function () {
    console.log('asf');
    readJSON("js/leg2.json");
    quiz.innerHTML = '';
    getQuestion();
});

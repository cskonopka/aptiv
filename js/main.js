// Problem: Create an Awesome Web App quiz using an object full of questions...
// Solution: Add interactivity to our app using events...

var quiz = document.getElementById('quiz'),
    btnStart = document.getElementById('start-quiz'),
    questionsHit = 0,
    questionsNumber = 1,
    counter = 0,
    questionsCorrect = [],
    whichquestion = [],
    whichwrong = [],
    globalJSON = [],
    element = [],
    jester = new Object,
    percentage;

init();

function init() {
    loadJSON(function (response) {
        actual_JSON = JSON.parse(response);
        consumeData(actual_JSON); //call another function with the actual JSON
    });
}

function consumeData(actualJson) {
    console.log(actualJson[0]);
    globalJSON = actualJson;
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/leg10.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

// Creating question Structure...
var createQuestionElements = function (currentQuestion) {

    counter += 1;

    var option,
        radio,
        label,
        btn;

    // BLOCK --> Info container
    var questionHolder = document.createElement('div');

    // BLOCK --> Score
    qH2 = document.createElement('div');
    qH2.classList.add("row");
    qH2.classList.add("align-items-center");

    option3 = document.createElement('div');
    option3.classList.add('col-md-12');
    option3.classList.add('d-flex');
    option3.classList.add('justify-content-center');
    option3.innerHTML = "<h1><font color='black'>Question " + questionsNumber + " of " + " 5 " + " - Score: " + questionsHit * 20 + "%" + "</font></h1>";

    qH2.appendChild(option3);
    questionHolder.appendChild(qH2);

    // BLOCK --> Question
    qQ2 = document.createElement('div');
    qQ2.classList.add("row");
    qQ2.classList.add("align-items-center");

    option4 = document.createElement('div');
    option4.classList.add('col-md-12');
    option4.classList.add('d-flex');
    option4.classList.add('justify-content-center');
    option4.innerHTML = "<h3><font color='black'>" + currentQuestion.question + "</font></h3>";

    qQ2.appendChild(option4);
    questionHolder.appendChild(qQ2);

    // BLOCK --> Radio group
    diver2 = document.createElement('div');
    diver2.classList.add("row");
    diver2.classList.add("align-items-center");

    for (var i = 0; i < 4; i++) {
        option = document.createElement('div');
        option.classList.add('col-md-3');
        option.classList.add('d-flex');
        option.classList.add('justify-content-center');

        radio = document.createElement('input');
        label = document.createElement('label');
        btn = document.createElement('a');

        radio.type = 'radio';
        radio.name = 'choice';

        option.appendChild(radio);
        option.appendChild(label);

        label.innerHTML = currentQuestion.choices[i];
        diver2.appendChild(option);
    }
    questionHolder.appendChild(diver2);

    // BLOCK --> Submit Button
    var btn = document.createElement("button")
    btn.classList.add('btn');
    btn.classList.add('btn-small');
    btn.innerHTML = 'Submit';

    btn.addEventListener('click', function () {
        validateAnswer(currentQuestion);
    });

    questionHolder.appendChild(btn);

    // BLOCK --> Adding to the page
    quiz.appendChild(questionHolder);
}

/*
Download results of JSON
*/
function clickDL() {
    const date = new Date().toLocaleString();
    var stringit = JSON.stringify(element);
    let filename = date + ".json"
    console.log(stringit);
    console.log(filename);

    var a = document.createElement("a");
    var file = new Blob([stringit], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
}

var checkAnswer = function (option, currentQuestion) {
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
        // console.log(option.lastElementChild.innerHTML);
        // console.log('hitt --> ', questionsHit * 20 + "%");
    } else {
        // console.log("FALSE");
        // console.log(option.lastElementChild.innerHTML);
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
    // console.log(element);
    questionsNumber = questionsNumber + 1;
    quiz.innerHTML = '';
    getQuestion();
};

var validateAnswer = function (currentQuestion) {
    console.log("clicked");
    var input = document.querySelectorAll('input');

    var inputCounter = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i].checked) {
            inputCounter = inputCounter + 1;
        }
    }
    if (inputCounter > 0) {
        // document.querySelector('.question-alert').style.display = 'none';
        // var option = document.querySelector('input:checked').parentNode;

        checkAnswer(option, currentQuestion);
    } else {
        // document.querySelector('.question-alert').style.display = 'block';
    }
};

var showScore = function () {
    // console.log(element);
    // console.log(percentage);
    var firstHeading = document.createElement('h1');
    firstHeading.innerHTML = '<font color="black">Results</font>';

    var secondHeading = document.createElement('h2');
    secondHeading.innerHTML = '<font color="black">Your score is ' + questionsHit + ' out of 5</font>';

    quiz.appendChild(secondHeading);
    quiz.appendChild(firstHeading);

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
    var downloadButton = document.createElement('div');
    downloadButton.innerHTML = '<button class="btn btn-link" onclick="clickDL()">Download Results (.JSON)</button>';

    quiz.appendChild(downloadButton);
}

var getQuestion = function () {
    if (typeof globalJSON !== undefined && globalJSON.length > 0) {
        var currentQuestion = globalJSON.shift();

        createQuestionElements(currentQuestion);
    } else {
        showScore();
    }
}

btnStart.addEventListener('click', function () {
    loadJSON("js/leg2.json");
    quiz.innerHTML = '';
    getQuestion();
});

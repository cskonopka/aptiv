var quiz = document.getElementById('quiz'),
    btnStart = document.getElementById('start-quiz'),
    questionsHit = 0, // Tracking correct submissions
    questionsNumber = 1, // Tracking question number
    counter = 0,
    globalJSON = [], // Local JSON file 
    element = [], // Appends internalDataPacket objects for score results
    internalDataPacket = new Object; // Object for collecting user submissions

init(); // Initialize questions from local JSON file.

/*
    init
    --> Initialization function
*/
function init() {
    loadJSON(function (response) {
        actual_JSON = JSON.parse(response);
        globalJSON = actual_JSON;
    });
}

/*
    loadJSON
    --> Load local JSON file using GET request
*/
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'json/questions.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

/*
    getQuestion
    --> Fetch the current question and generate question HTML.
*/
var getQuestion = function () {
    if (typeof globalJSON !== undefined && globalJSON.length > 0) {
        var currentQuestion = globalJSON.shift();
        createQuestionElements(currentQuestion);
    } else {
        showScore();
    }
}

/*
    loadJSON
    --> Load local JSON file using GET request
*/
var createQuestionElements = function (currentQuestion) {
    counter += 1;
    var option,
        radio,
        label,
        btn;

    // BLOCK --> Info container
    var questionHolder = document.createElement('div');

    var firstHeading = document.createElement('h1');
    firstHeading.innerHTML = '<font color="black">Aptiv Quiz</font>';

    qH3 = document.createElement('div');
    qH3.classList.add("row");
    qH3.classList.add("align-items-center");

    option10 = document.createElement('div');
    option10.classList.add('col-md-12');
    option10.classList.add('d-flex');
    option10.classList.add('justify-content-center');

    option10.appendChild(firstHeading);
    questionHolder.appendChild(option10);


    // BLOCK --> Score
    qH2 = document.createElement('div');
    qH2.classList.add("row");
    qH2.classList.add("align-items-center");

    option3 = document.createElement('div');
    option3.classList.add('col-md-12');
    option3.classList.add('d-flex');
    option3.classList.add('justify-content-center');
    option3.innerHTML = "<h2><font color='black'>Question " + questionsNumber + " of " + " 5 </h2>";

    qH2.appendChild(option3);
    questionHolder.appendChild(qH2);

    // BLOCK --> Score
    qS2 = document.createElement('div');
    qS2.classList.add("row");
    qS2.classList.add("align-items-center");

    option8 = document.createElement('div');
    option8.classList.add('col-md-12');
    option8.classList.add('d-flex');
    option8.classList.add('justify-content-center');
    option8.innerHTML = "<h3><font color='black'>Score: " + questionsHit * 20 + "%" + "</font></h3>";

    qS2.appendChild(option8);
    questionHolder.appendChild(qS2);

    // BLOCK --> Question
    qQ2 = document.createElement('div');
    qQ2.classList.add("row");
    qQ2.classList.add("align-items-center");

    option4 = document.createElement('div');
    option4.classList.add('col-md-12');
    option4.classList.add('d-flex');
    option4.classList.add('justify-content-center');
    option4.innerHTML = "<h4><font color='black'>" + currentQuestion.question + "</font></h4>";

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

        radio.type = 'radio';
        radio.name = 'choice';

        option.appendChild(radio);
        option.appendChild(label);

        label.innerHTML = currentQuestion.choices[i];
        diver2.appendChild(option);
    }
    questionHolder.appendChild(diver2);

    // BLOCK --> Submit Button
    qH2 = document.createElement('div');
    qH2.classList.add("row");
    qH2.classList.add("align-items-center");

    option4 = document.createElement('div');
    option4.classList.add('col-md-12');
    option4.classList.add('d-flex');
    option4.classList.add('justify-content-center');

    var btn = document.createElement("button")
    btn.classList.add('btn');
    btn.classList.add('btn-small');
    btn.innerHTML = 'Submit';

    option4.appendChild(btn);
    qH2.appendChild(option4);
    questionHolder.appendChild(qH2);

    btn.addEventListener('click', function () {
        validateAnswer(currentQuestion);
    });


    // BLOCK --> Adding to the page
    quiz.appendChild(questionHolder);
}

/*
    validateAnswer
    --> Check which radio group button is checked
*/
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
        var option = document.querySelector('input:checked').parentNode;
        checkAnswer(option, currentQuestion);
    } else {
        // document.querySelector('.question-alert').style.display = 'block';
    }
};

/*
    checkAnswer
    --> Check answer and save to global object
*/
var checkAnswer = function (option, currentQuestion) {
    if (option.lastElementChild.innerHTML === currentQuestion.choices[currentQuestion.correctAnswer]) {
        questionsHit = questionsHit + 1;
        // whichquestion = whichquestion.concat(currentQuestion.question);
        internalDataPacket = {
            q: currentQuestion.question,
            selected: option.lastElementChild.innerHTML,
            choices: currentQuestion.choices,
            answer: currentQuestion.choices[currentQuestion.correctAnswer],
            state: true
        };
        element.push(internalDataPacket);
    } else {
        internalDataPacket = {
            q: currentQuestion.question,
            selected: option.lastElementChild.innerHTML,
            choices: currentQuestion.choices,
            answer: currentQuestion.choices[currentQuestion.correctAnswer],
            state: false
        };
        element.push(internalDataPacket);
    }
    questionsNumber = questionsNumber + 1;
    quiz.innerHTML = '';
    getQuestion();
};

var showScore = function () {
    var firstHeading = document.createElement('h1');
    firstHeading.innerHTML = '<font color="black">Aptiv Quiz Results</font>';

    qH2 = document.createElement('div');
    qH2.classList.add("row");
    qH2.classList.add("align-items-center");

    option4 = document.createElement('div');
    option4.classList.add('col-md-12');
    option4.classList.add('d-flex');
    option4.classList.add('justify-content-center');

    option4.appendChild(firstHeading);
    quiz.appendChild(option4);

    var secondHeading = document.createElement('h2');
    secondHeading.innerHTML = '<font color="black">' + questionsHit + ' out of 5 questions are correct</font>';

    qH3 = document.createElement('div');
    qH3.classList.add("row");
    qH3.classList.add("align-items-center");

    option5 = document.createElement('div');
    option5.classList.add('col-md-12');
    option5.classList.add('d-flex');
    option5.classList.add('justify-content-center');

    option5.appendChild(secondHeading);
    quiz.appendChild(option5);

    var thirdHeading = document.createElement('h3');
    thirdHeading.innerHTML = '<font color="black">Score - ' + questionsHit * 20 + '%</font>';

    qS3 = document.createElement('div');
    qS3.classList.add("row");
    qS3.classList.add("align-items-center");

    option9 = document.createElement('div');
    option9.classList.add('col-md-12');
    option9.classList.add('d-flex');
    option9.classList.add('justify-content-center');

    option9.appendChild(thirdHeading);
    quiz.appendChild(option9);

    // Add each questions 
    for (var key in element) {
        qH3 = document.createElement('div');
        qH3.classList.add("row");
        qH3.classList.add("align-items-center");

        option5 = document.createElement('div');
        option5.classList.add('col-md-12');
        option5.classList.add('d-flex');
        option5.classList.add('justify-content-center');

        var resultsDiv = document.createElement('h4');
        console.log(element[key].q);
        resultsDiv.innerHTML = element[key].q;

        option5.appendChild(resultsDiv)
        quiz.appendChild(option5);

        option5 = document.createElement('div');

        // Colorize the true and false answers 
        for (var i = 0; i < element[key].choices.length; i++) {
            if (element[key].choices[i] == element[key].selected) {
                if (element[key].selected == element[key].answer) { // right
                    option5.classList.add('col-md-12');
                    option5.classList.add('d-flex');
                    option5.classList.add('justify-content-center');

                    var option = document.createElement('h5');
                    option.classList.add('text-center');
                    option.innerHTML = '<font color="green">' + element[key].selected + '</font>';
                    resultsDiv.append(option);
                } else if (element[key].selected != element[key].answer) { // wrong

                    option5.classList.add('col-md-6');
                    option5.classList.add('d-flex');
                    option5.classList.add('justify-content-center');

                    var option = document.createElement('h5');
                    option.classList.add('text-center');
                    option.innerHTML = '<font color="red">Wrong: ' + element[key].selected + '</font>';
                    resultsDiv.append(option);

                    var option2 = document.createElement('h5');
                    option2.classList.add('text-center');
                    option2.innerHTML = '<font color="green">' + element[key].answer + '</font>';
                    resultsDiv.append(option2);
                }
            }
        }
    }

    // Create the download button, append to HTML
    var downloadButton = document.createElement('div');
    downloadButton.innerHTML = '<button class="btn btn-link" onclick="clickDL()">Download Results (.JSON)</button>';
    quiz.appendChild(downloadButton);
}

/*
    clickDL
    --> Download results as JSON file
*/
function clickDL() {
    const date = new Date().toLocaleString();
    let stringit = JSON.stringify(element);
    let filename = date + ".json"
    let a = document.createElement("a");
    let file = new Blob([stringit], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
}

/*
    btnStart
    --> Click Submit and get a new question
*/
btnStart.addEventListener('click', function () {
    quiz.innerHTML = '';
    getQuestion();
});

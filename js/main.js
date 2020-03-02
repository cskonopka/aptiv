/*
    Christopher Konopka
    03/02/2020
    Aptiv Quiz App
*/

/*
    0: Globals
*/
var quiz = document.getElementById('quiz'),
    btnStart = document.getElementById('start-quiz'),
    questionsHit = 0, // Tracking correct submissions
    questionsNumber = 1, // Tracking question number
    counter = 0,
    globalJSON = [], // Local JSON file 
    element = [], // Appends internalDataPacket objects for score results
    internalDataPacket = new Object; // Object for collecting user submissions

/*
    1: init
    --> Initialization function for loading the JSON to memory via a global variable.
*/
function init() {
    loadJSON(function (response) {
        actual_JSON = JSON.parse(response);
        globalJSON = actual_JSON;
    });
}

init(); // Initialize JSON file.

/*
    2: loadJSON
    --> Load local JSON file into memory using a GET request.
*/
function loadJSON(callback) {
    let xobj = new XMLHttpRequest();
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
    3: btnStart
    --> Listen for a click from the "start" button and get a new question.
*/
btnStart.addEventListener('click', function () {
    quiz.innerHTML = '';
    getQ();
});


/*
    4: getQ
    --> Fetch the current question from the loaded JSON object and either generate another question or display the quiz results.
*/
var getQ = function () {
    if (typeof globalJSON !== undefined && globalJSON.length > 0) {
        var currentQuestion = globalJSON.shift();
        generateQuestionElements(currentQuestion);
    } else {
        displayScore();
    }
}

/*
    5: generateQuestionElements
    --> Generate question HTML elements using data from the loaded JSON object.
*/
var generateQuestionElements = function (currentQuestion) {
    counter += 1;
    var radio,
        label,
        btn;

    // BLOCK --> Question Layout
    let questionLayout = document.createElement('div');

    // BLOCK --> Aptiv image header
    let imageAptiv = document.createElement('div');
    imageAptiv.innerHTML = '<img src="/assets/aptiv.png" class="img-fluid" alt="aptiv-logo">';

    headerAptivRow = document.createElement('div');
    headerAptivRow.classList.add("row");
    headerAptivRow.classList.add("align-items-center");

    headerAptivCol = document.createElement('div');
    headerAptivCol.classList.add('col-md-12');
    headerAptivCol.classList.add('d-flex');
    headerAptivCol.classList.add('justify-content-center');
    headerAptivCol.classList.add('text-center');

    headerAptivCol.appendChild(imageAptiv);
    headerAptivRow.appendChild(headerAptivCol);
    questionLayout.appendChild(headerAptivRow);

    // BLOCK --> Number of questions correct header
    let questionNumbers = document.createElement('h1');
    questionNumbers.setAttribute("style", "margin-bottom:0em");
    questionNumbers.innerHTML = "<font color='black'>Question " + questionsNumber + " of " + " 5";

    currentQuestionNumberRow = document.createElement('div');
    currentQuestionNumberRow.classList.add("row");
    currentQuestionNumberRow.classList.add("align-items-center");

    currentQuestionNumberCol = document.createElement('div');
    currentQuestionNumberCol.classList.add('col-md-12');
    currentQuestionNumberCol.classList.add('d-flex');
    currentQuestionNumberCol.classList.add('justify-content-center');
    currentQuestionNumberCol.classList.add('text-center');

    currentQuestionNumberCol.appendChild(questionNumbers);
    currentQuestionNumberRow.appendChild(currentQuestionNumberCol);
    questionLayout.appendChild(currentQuestionNumberRow);

    // BLOCK --> Score percent header
    let questionScore = document.createElement('h2');
    questionScore.setAttribute("style", "margin-bottom:0em");
    questionScore.innerHTML = "<font color='black'>Score: <em>" + questionsHit * 20 + "%</em>" + "</font>";

    headerShowPercentRow = document.createElement('div');
    headerShowPercentRow.classList.add("row");
    headerShowPercentRow.classList.add("align-items-center");

    headerShowPercentCol = document.createElement('div');
    headerShowPercentCol.classList.add('mt-4');
    headerShowPercentCol.classList.add('col-md-12');
    headerShowPercentCol.classList.add('d-flex');
    headerShowPercentCol.classList.add('justify-content-center');
    headerShowPercentCol.classList.add('text-center');

    headerShowPercentCol.appendChild(questionScore);
    headerShowPercentRow.appendChild(headerShowPercentCol);
    questionLayout.appendChild(headerShowPercentRow);

    // BLOCK --> Current question
    let questionCurrent = document.createElement('h3');
    questionCurrent.setAttribute("style", "margin-bottom:0em");
    questionCurrent.innerHTML = "<font color='black'>" + currentQuestion.question + "</font>";

    headerCurrentQuestionRow = document.createElement('div');
    headerCurrentQuestionRow.classList.add("row");
    headerCurrentQuestionRow.classList.add("align-items-center");

    headerCurrentQuestionCol = document.createElement('div');
    headerCurrentQuestionCol.classList.add('mt-4');
    headerCurrentQuestionCol.classList.add('col-md-12');
    headerCurrentQuestionCol.classList.add('d-flex');
    headerCurrentQuestionCol.classList.add('justify-content-center');
    headerCurrentQuestionCol.classList.add('text-center');
    // headerCurrentQuestionCol.innerHTML = "<h4></h4>";

    headerCurrentQuestionCol.appendChild(questionCurrent);
    headerCurrentQuestionRow.appendChild(headerCurrentQuestionCol);
    questionLayout.appendChild(headerCurrentQuestionRow);

    // BLOCK --> Multiple choice question radio group
    groupRadioRow = document.createElement('div');
    groupRadioRow.classList.add("row");
    groupRadioRow.classList.add("align-items-center");
    groupRadioRow.classList.add('d-flex');
    groupRadioRow.classList.add('justify-content-center');

    for (var i = 0; i < 4; i++) {
        groupRadioCol = document.createElement('div');
        groupRadioCol.classList.add('mt-4');
        groupRadioCol.classList.add('col-md-auto');
        groupRadioCol.classList.add('d-flex');
        groupRadioCol.classList.add('justify-content-center');

        radio = document.createElement('input');
        radio.type = 'radio';
        label = document.createElement('label');

        label.setAttribute("style", "margin-left:0.5em; margin-top:-0.2em");
        radio.name = 'choice';

        groupRadioCol.appendChild(radio);
        groupRadioCol.appendChild(label);

        label.innerHTML = currentQuestion.choices[i];
        groupRadioRow.appendChild(groupRadioCol);
    }
    questionLayout.appendChild(groupRadioRow);

    // BLOCK --> Submit Button
    buttonSubmitRow = document.createElement('div');
    buttonSubmitRow.classList.add("row");
    buttonSubmitRow.classList.add("align-items-center");

    buttonSubmitCol = document.createElement('div');
    buttonSubmitCol.classList.add('mt-4');
    buttonSubmitCol.classList.add('col-md-12');
    buttonSubmitCol.classList.add('d-flex');
    buttonSubmitCol.classList.add('justify-content-center');

    var btn = document.createElement("button")
    btn.classList.add('btn');
    btn.classList.add('btn-outline-dark');
    btn.innerHTML = 'Submit';

    buttonSubmitCol.appendChild(btn);
    buttonSubmitRow.appendChild(buttonSubmitCol);
    questionLayout.appendChild(buttonSubmitRow);

    // BLOCK --> When submit is clicked, validate the answer.
    btn.addEventListener('click', function () {
        validateAnswer(currentQuestion);
    });
    quiz.appendChild(questionLayout);
}

/*
    6: validateAnswer
    --> Check which radio group button is checked and then check if the answer is correct via "answerCheck"
*/
var validateAnswer = function (currentQuestion) {
    var input = document.querySelectorAll('input');
    var inputCounter = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i].checked) {
            inputCounter = inputCounter + 1;
        }
    }
    if (inputCounter > 0) {
        var option = document.querySelector('input:checked').parentNode;
        answerCheck(option, currentQuestion);
    } else {

    }
};

/*
    7: answerCheck
    --> Check answer and save to a new global JSON object for the survey results.
*/
var answerCheck = function (option, currentQuestion) {
    if (option.lastElementChild.innerHTML === currentQuestion.choices[currentQuestion.correctAnswer]) {
        questionsHit = questionsHit + 1;
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
    getQ(); // Restart the process
};

/*
    8: displayScore
    --> Display results of the quiz with a download .JSON button
*/
var displayScore = function () {
    // BLOCK --> Aptiv logo
    let imageAptiv = document.createElement('div');
    imageAptiv.innerHTML = '<img src="/assets/aptiv.png" class="img-fluid" alt="aptiv-logo">';

    headerAptivRow = document.createElement('div');
    headerAptivRow.classList.add("row");
    headerAptivRow.classList.add("align-items-center");

    headerAptivCol = document.createElement('div');
    headerAptivCol.classList.add('col-md-12');
    headerAptivCol.classList.add('d-flex');
    headerAptivCol.classList.add('justify-content-center');
    headerAptivCol.classList.add('text-center');

    headerAptivCol.appendChild(imageAptiv);
    headerAptivRow.appendChild(headerAptivCol);
    quiz.appendChild(headerAptivRow);

    // BLOCK --> Number of correct questions
    var secondHeading = document.createElement('h1');
    secondHeading.innerHTML = '<font color="black">' + questionsHit + ' out of 5 questions are correct</font>';

    headerQuestionsRow = document.createElement('div');
    headerQuestionsRow.classList.add("row");
    headerQuestionsRow.classList.add("justify-content-center");

    headerQuestionsCol = document.createElement('div');
    headerQuestionsCol.classList.add('col-md-auto');
    headerQuestionsCol.classList.add('d-flex');
    headerQuestionsCol.classList.add('justify-content-center');
    headerQuestionsCol.classList.add('text-center');

    headerQuestionsCol.appendChild(secondHeading);
    headerQuestionsRow.appendChild(headerQuestionsCol);
    quiz.appendChild(headerQuestionsRow);

    // BLOCK --> Score 
    var thirdHeading = document.createElement('h2');
    thirdHeading.innerHTML = '<font color="black">Score: <em>' + questionsHit * 20 + '%</em></font>';

    headerScoreRow = document.createElement('div');
    headerScoreRow.classList.add("row");
    headerScoreRow.classList.add("justify-content-center");

    headerScoreCol = document.createElement('div');
    headerScoreCol.classList.add('mt-4');
    headerScoreCol.classList.add('col-md-auto');
    headerScoreCol.classList.add('d-flex');
    headerScoreCol.classList.add('justify-content-center');
    headerScoreCol.classList.add('text-center');

    headerScoreCol.appendChild(thirdHeading);
    headerScoreRow.appendChild(headerScoreCol);
    quiz.appendChild(headerScoreRow);

    // BLOCK --> Display correct and incorrect results
    for (var key in element) {
        answerContainerRow = document.createElement('div');
        answerContainerRow.classList.add("row");
        answerContainerRow.classList.add("justify-content-center");

        answerContainerCol = document.createElement('div');
        answerContainerCol.classList.add('mt-4');
        answerContainerCol.classList.add('col-md-auto');
        answerContainerCol.classList.add('d-flex');
        answerContainerCol.classList.add('justify-content-center');
        answerContainerCol.classList.add('text-center');

        var checkquestion = document.createElement('h3');
        checkquestion.innerHTML = element[key].q;

        answerContainerCol.appendChild(checkquestion)
        answerContainerRow.appendChild(answerContainerCol);
        quiz.appendChild(answerContainerRow);

        // BLOCK --> Colorize the true and false answers 
        for (var i = 0; i < element[key].choices.length; i++) {
            if (element[key].choices[i] == element[key].selected) {
                if (element[key].selected == element[key].answer) { // right

                    answerCorrectSingleRow = document.createElement('div');
                    answerCorrectSingleRow.classList.add("row");
                    answerCorrectSingleRow.classList.add("justify-content-center");

                    answerCorrectSingleCol = document.createElement('div');
                    answerCorrectSingleCol.classList.add('mt-4');
                    answerCorrectSingleCol.classList.add('col-md-auto');
                    answerCorrectSingleCol.classList.add('d-flex');
                    answerCorrectSingleCol.classList.add('justify-content-center');

                    let textGreenCorrect = document.createElement('h4');
                    textGreenCorrect.classList.add('text-center');
                    textGreenCorrect.innerHTML = '<font color="green">' + element[key].selected + '</font>';

                    answerCorrectSingleCol.appendChild(textGreenCorrect);
                    answerCorrectSingleRow.appendChild(answerCorrectSingleCol);
                    quiz.appendChild(answerCorrectSingleRow);

                } else if (element[key].selected != element[key].answer) { // wrong
                    answerDoubleRow = document.createElement('div');
                    answerDoubleRow.classList.add('row');
                    answerDoubleRow.classList.add('justify-content-center');

                    textWrongCol = document.createElement('div');
                    textWrongCol.classList.add('mt-4');
                    textWrongCol.classList.add('col-md-auto');
                    textWrongCol.classList.add('d-flex');
                    textWrongCol.classList.add('justify-content-center');

                    let textWrong = document.createElement('h4');
                    textWrong.classList.add('text-center');
                    textWrong.innerHTML = '<font color="red">' + element[key].selected + '</font>';

                    textWrongCol.appendChild(textWrong);
                    answerDoubleRow.appendChild(textWrongCol);
                    quiz.appendChild(answerDoubleRow);

                    textRightCol = document.createElement('div');
                    textRightCol.classList.add('mt-4');
                    textRightCol.classList.add('col-md-auto');
                    textRightCol.classList.add('d-flex');
                    textRightCol.classList.add('justify-content-center');

                    let textRight = document.createElement('h4');
                    textRight.classList.add('text-center');
                    textRight.innerHTML = '<font color="green">' + element[key].answer + '</font>';

                    textRightCol.appendChild(textRight);
                    answerDoubleRow.appendChild(textRightCol);
                    quiz.appendChild(answerDoubleRow);
                }
            }
        }
    }

    // BLOCK --> Download JSON button
    var downloadButton = document.createElement('div');
    downloadButton.innerHTML = '<button class="btn btn-outline-dark" onclick="clickDL()">Download Results (.JSON)</button>';

    buttonDownloadRow = document.createElement('div');
    buttonDownloadRow.classList.add("row");
    buttonDownloadRow.classList.add("justify-content-center");

    buttonDownloadCol = document.createElement('div');
    buttonDownloadCol.classList.add('mt-4');
    buttonDownloadCol.classList.add('col-md-12');
    buttonDownloadCol.classList.add('d-flex');
    buttonDownloadCol.classList.add('justify-content-center');

    buttonDownloadCol.appendChild(downloadButton);
    buttonDownloadRow.appendChild(buttonDownloadCol);
    quiz.appendChild(buttonDownloadRow);
}

/*
    9: clickDL
    --> Download local JSON object as JSON file
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


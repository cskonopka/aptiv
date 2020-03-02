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
    --> Initialization function
*/
function init() {
    loadJSON(function (response) {
        actual_JSON = JSON.parse(response);
        globalJSON = actual_JSON;
    });
}

init(); // Initialize questions from local JSON file.

/*
    2: loadJSON
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
    3: btnStart
    --> Click Submit and get a new question
*/
btnStart.addEventListener('click', function () {
    quiz.innerHTML = '';
    getQuestion();
});


/*
    4: getQuestion
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
    5: createQuestionElements
    --> Load local JSON file using GET request
*/
var createQuestionElements = function (currentQuestion) {
    counter += 1;
    var option,
        radio,
        label,
        btn;

    // BLOCK --> Question Layout
    var questionLayout = document.createElement('div');

    // BLOCK --> Aptiv header
    var headerAptiv = document.createElement('h1');
    headerAptiv.innerHTML = '<font color="black">Aptiv Quiz</font>';

    headerAptivRow = document.createElement('div');
    headerAptivRow.classList.add("row");
    headerAptivRow.classList.add("align-items-center");

    headerAptivCol = document.createElement('div');
    headerAptivCol.classList.add('col-md-12');
    headerAptivCol.classList.add('d-flex');
    headerAptivCol.classList.add('justify-content-center');

    headerAptivCol.appendChild(headerAptiv);
    headerAptivRow.appendChild(headerAptivCol);
    questionLayout.appendChild(headerAptivRow);

    // BLOCK --> Number of questions correct header
    var questionNumbers = document.createElement('h1');
    questionNumbers.innerHTML = "<h2><font color='black'>Question " + questionsNumber + " of " + " 5 </h2>";

    currentQuestionNumberRow = document.createElement('div');
    currentQuestionNumberRow.classList.add("row");
    currentQuestionNumberRow.classList.add("align-items-center");

    currentQuestionNumberCol = document.createElement('div');
    currentQuestionNumberCol.classList.add('col-md-12');
    currentQuestionNumberCol.classList.add('d-flex');
    currentQuestionNumberCol.classList.add('justify-content-center');

    currentQuestionNumberCol.appendChild(questionNumbers);
    currentQuestionNumberRow.appendChild(currentQuestionNumberCol);
    questionLayout.appendChild(currentQuestionNumberRow);

    // BLOCK --> Score percent header
    headerShowPercentRow = document.createElement('div');
    headerShowPercentRow.classList.add("row");
    headerShowPercentRow.classList.add("align-items-center");

    headerShowPercentCol = document.createElement('div');
    headerShowPercentCol.classList.add('col-md-12');
    headerShowPercentCol.classList.add('d-flex');
    headerShowPercentCol.classList.add('justify-content-center');
    headerShowPercentCol.innerHTML = "<h3><font color='black'>Score: " + questionsHit * 20 + "%" + "</font></h3>";

    headerShowPercentRow.appendChild(headerShowPercentCol);
    questionLayout.appendChild(headerShowPercentRow);

    // BLOCK --> Current question
    headerCurrentQuestionRow = document.createElement('div');
    headerCurrentQuestionRow.classList.add("row");
    headerCurrentQuestionRow.classList.add("align-items-center");

    headerCurrentQuestionCol = document.createElement('div');
    headerCurrentQuestionCol.classList.add('col-md-12');
    headerCurrentQuestionCol.classList.add('d-flex');
    headerCurrentQuestionCol.classList.add('justify-content-center');
    headerCurrentQuestionCol.innerHTML = "<h4><font color='black'>" + currentQuestion.question + "</font></h4>";

    headerCurrentQuestionRow.appendChild(headerCurrentQuestionCol);
    questionLayout.appendChild(headerCurrentQuestionRow);

    // BLOCK --> Multiple choice question radio group
    groupRadioRow = document.createElement('div');
    groupRadioRow.classList.add("row");
    groupRadioRow.classList.add("align-items-center");

    for (var i = 0; i < 4; i++) {
        groupRadioCol = document.createElement('div');
        groupRadioCol.classList.add('col-md-3');
        groupRadioCol.classList.add('d-flex');
        groupRadioCol.classList.add('justify-content-center');

        radio = document.createElement('input');
        radio.type = 'radio';
        label = document.createElement('label');
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

    btn.addEventListener('click', function () {
        validateAnswer(currentQuestion);
    });
    quiz.appendChild(questionLayout);
}

/*
    6: validateAnswer
    --> Check which radio group button is checked
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
        checkAnswer(option, currentQuestion);
    } else {

    }
};

/*
    7: checkAnswer
    --> Check answer and save to global object
*/
var checkAnswer = function (option, currentQuestion) {
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
    getQuestion(); // Restart the process
};

/*
    8: showScore
    --> Display results of the quiz
*/
var showScore = function () {

    // BLOCK --> Quiz results
    var firstHeading = document.createElement('h1');
    firstHeading.innerHTML = '<font color="black">Aptiv Quiz Results</font>';

    headerAptivRow = document.createElement('div');
    headerAptivRow.classList.add("row");
    headerAptivRow.classList.add("justify-content-center");

    headerAptivCol = document.createElement('div');
    headerAptivCol.classList.add('col-md-12');
    headerAptivCol.classList.add('d-flex');
    headerAptivCol.classList.add('justify-content-center');

    headerAptivCol.appendChild(firstHeading);
    headerAptivRow.appendChild(headerAptivCol);
    quiz.appendChild(headerAptivRow);

    // BLOCK --> Number of correct questions
    var secondHeading = document.createElement('h2');
    secondHeading.innerHTML = '<font color="black">' + questionsHit + ' out of 5 questions are correct</font>';

    headerQuestionsRow = document.createElement('div');
    headerQuestionsRow.classList.add("row");
    headerQuestionsRow.classList.add("justify-content-center");

    headerQuestionsCol = document.createElement('div');
    headerQuestionsCol.classList.add('col-md-12');
    headerQuestionsCol.classList.add('d-flex');
    headerQuestionsCol.classList.add('justify-content-center');

    headerQuestionsCol.appendChild(secondHeading);
    headerQuestionsRow.appendChild(headerQuestionsCol);
    quiz.appendChild(headerQuestionsRow);

    // BLOCK --> Score 
    var thirdHeading = document.createElement('h3');
    thirdHeading.innerHTML = '<font color="black">Score - ' + questionsHit * 20 + '%</font>';

    headerScoreRow = document.createElement('div');
    headerScoreRow.classList.add("row");
    headerScoreRow.classList.add("justify-content-center");

    headerScoreCol = document.createElement('div');
    headerScoreCol.classList.add('col-md-12');
    headerScoreCol.classList.add('d-flex');
    headerScoreCol.classList.add('justify-content-center');

    headerScoreCol.appendChild(thirdHeading);
    headerScoreRow.appendChild(headerScoreCol);
    quiz.appendChild(headerScoreRow);

    // Add each questions 
    for (var key in element) {
        answerContainerRow = document.createElement('div');
        answerContainerRow.classList.add("row");
        answerContainerRow.classList.add("justify-content-center");

        answerContainerCol = document.createElement('div');
        answerContainerCol.classList.add('col-md-12');
        answerContainerCol.classList.add('d-flex');
        answerContainerCol.classList.add('justify-content-center');

        var checkquestion = document.createElement('h4');
        console.log(element[key].q);
        checkquestion.innerHTML = element[key].q;

        answerContainerCol.appendChild(checkquestion)
        answerContainerRow.appendChild(answerContainerCol);
        quiz.appendChild(answerContainerRow);

        // Colorize the true and false answers 
        for (var i = 0; i < element[key].choices.length; i++) {
            if (element[key].choices[i] == element[key].selected) {
                if (element[key].selected == element[key].answer) { // right

                    answerCorrectSingleRow = document.createElement('div');
                    answerCorrectSingleRow.classList.add("row");
                    answerCorrectSingleRow.classList.add("justify-content-center");

                    answerCorrectSingleCol = document.createElement('div');
                    answerCorrectSingleCol.classList.add('col-md-12');
                    answerCorrectSingleCol.classList.add('d-flex');
                    answerCorrectSingleCol.classList.add('justify-content-center');

                    var textGreenCorrect = document.createElement('h5');
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
                    textWrongCol.classList.add('col-md-4');
                    textWrongCol.classList.add('d-flex');
                    textWrongCol.classList.add('justify-content-center');

                    var textWrong = document.createElement('h5');
                    textWrong.classList.add('text-center');
                    textWrong.innerHTML = '<font color="red">' + element[key].selected + '</font>';

                    textWrongCol.appendChild(textWrong);
                    answerDoubleRow.appendChild(textWrongCol);
                    quiz.appendChild(answerDoubleRow);

                    textRightCol = document.createElement('div');
                    textRightCol.classList.add('col-md-4');
                    textRightCol.classList.add('d-flex');
                    textRightCol.classList.add('justify-content-center');

                    var textRight = document.createElement('h5');
                    textRight.classList.add('text-center');
                    textRight.innerHTML = '<font color="green">' + element[key].answer + '</font>';

                    textRightCol.appendChild(textRight);
                    answerDoubleRow.appendChild(textRightCol);
                    quiz.appendChild(answerDoubleRow);
                }
            }
        }
    }
    
    var downloadButton = document.createElement('div');
    downloadButton.innerHTML = '<button class="btn btn-outline-dark" onclick="clickDL()">Download Results (.JSON)</button>';

    buttonDownloadRow = document.createElement('div');
    buttonDownloadRow.classList.add("row");
    buttonDownloadRow.classList.add("justify-content-center");

    buttonDownloadCol = document.createElement('div');
    buttonDownloadCol.classList.add('col-md-12');
    buttonDownloadCol.classList.add('d-flex');
    buttonDownloadCol.classList.add('justify-content-center');

    buttonDownloadCol.appendChild(downloadButton);
    buttonDownloadRow.appendChild(buttonDownloadCol);
    quiz.appendChild(buttonDownloadRow);
}

/*
    9: clickDL
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


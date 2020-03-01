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
    currentQuestionNumberRow = document.createElement('div');
    currentQuestionNumberRow.classList.add("row");
    currentQuestionNumberRow.classList.add("align-items-center");

    currentQuestionNumberCol = document.createElement('div');
    currentQuestionNumberCol.classList.add('col-md-12');
    currentQuestionNumberCol.classList.add('d-flex');
    currentQuestionNumberCol.classList.add('justify-content-center');
    currentQuestionNumberCol.innerHTML = "<h2><font color='black'>Question " + questionsNumber + " of " + " 5 </h2>";

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
    btn.classList.add('btn-small');
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
    
        qH2 = document.createElement('div');
        qH2.classList.add("row");
        qH2.classList.add("justify-content-center");
    
        option4 = document.createElement('div');
        option4.classList.add('col-md-12');
        option4.classList.add('d-flex');
        option4.classList.add('justify-content-center');
    
        option4.appendChild(firstHeading);
        qH2.appendChild(option4);
        quiz.appendChild(qH2);
    
    
        // // BLOCK --> Aptiv header
        // var headerAptiv = document.createElement('h1');
        // headerAptiv.innerHTML = '<font color="black">Aptiv Quiz</font>';
    
        // headerAptivRow = document.createElement('div');
        // headerAptivRow.classList.add("row");
        // headerAptivRow.classList.add("justify-content-center");
    
        // headerAptivCol = document.createElement('div');
        // headerAptivCol.classList.add('col-md-12');
        // headerAptivCol.classList.add('d-flex');
        // headerAptivCol.classList.add('justify-content-center');
    
        // headerAptivCol.appendChild(headerAptiv);
        // headerAptivRow.appendChild(headerAptivCol);
        // questionHolder.appendChild(headerAptivRow);
    
    
        // 
        // var secondHeading = document.createElement('h2');
        // secondHeading.innerHTML = '<font color="black">Your score is ' + questionsHit + ' out of 5</font>';
    
        // qH3 = document.createElement('div');
        // qH3.classList.add("row");
        // qH3.classList.add("justify-content-center");
    
        // option5 = document.createElement('div');
        // option5.classList.add('col-md-12');
        // option5.classList.add('d-flex');
        // option5.classList.add('justify-content-center');
    
        // option5.appendChild(secondHeading);
        // quiz.appendChild(option5);
    
        // BLOCK --> Number of correct questions
        var secondHeading = document.createElement('h2');
        secondHeading.innerHTML = '<font color="black">' + questionsHit + ' out of 5 questions are correct</font>';
    
        qH3 = document.createElement('div');
        qH3.classList.add("row");
        qH3.classList.add("justify-content-center");
    
        option5 = document.createElement('div');
        option5.classList.add('col-md-12');
        option5.classList.add('d-flex');
        option5.classList.add('justify-content-center');
    
        // option5.appendChild(secondHeading);
        // quiz.appendChild(option5);
    
        option5.appendChild(secondHeading);
        qH3.appendChild(option5);
        quiz.appendChild(qH3);
    
    
    
            // BLOCK --> Score 
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
            qS3.appendChild(option9);
            quiz.appendChild(qS3);
        
    
        // Add each questions 
        for (var key in element) {
            qH3 = document.createElement('div');
            qH3.classList.add("row");
            qH3.classList.add("justify-content-center");
    
            option5 = document.createElement('div');
            option5.classList.add('col-md-12');
            option5.classList.add('d-flex');
            option5.classList.add('justify-content-center');
    
            var resultsDiv = document.createElement('h4');
            console.log(element[key].q);
            resultsDiv.innerHTML = element[key].q;
    
            option5.appendChild(resultsDiv)
            qH3.appendChild(option5);
            quiz.appendChild(qH3);
    
            // Colorize the true and false answers 
            for (var i = 0; i < element[key].choices.length; i++) {
                if (element[key].choices[i] == element[key].selected) {
                    if (element[key].selected == element[key].answer) { // right
    
                        qH3 = document.createElement('div');
                        qH3.classList.add("row");
                        qH3.classList.add("justify-content-center");
                
                        option5 = document.createElement('div');
                        option5.classList.add('col-md-12');
                        option5.classList.add('d-flex');
                        option5.classList.add('justify-content-center');
    
                        var option = document.createElement('h5');
                        option.classList.add('text-center');
                        option.innerHTML = '<font color="green">' + element[key].selected + '</font>';
                        
                        option5.appendChild(option);
                        qH3.appendChild(option5);
                        quiz.appendChild(qH3);
    
                    } else if (element[key].selected != element[key].answer) { // wrong
    
                        qH3 = document.createElement('div');
                        qH3.classList.add('row');
                        qH3.classList.add('justify-content-center');
                
                        option5 = document.createElement('div');
                        option5.classList.add('col-md-4');
                        option5.classList.add('d-flex');
                        option5.classList.add('justify-content-center');
    
                        option6 = document.createElement('div');
                        option6.classList.add('col-md-4');
                        option6.classList.add('d-flex');
                        option6.classList.add('justify-content-center');
                       
                        var option = document.createElement('h5');
                        option.classList.add('text-center');
                        option.innerHTML = '<font color="red">' + element[key].selected + '</font>';
    
                        option5.appendChild(option);
                        qH3.appendChild(option5);
                        quiz.appendChild(qH3);
                
                        option22 = document.createElement('div');
                        option22.classList.add('col-md-6');
                        option22.classList.add('d-flex');
                        option22.classList.add('justify-content-center');
    
                        var option2 = document.createElement('h5');
                        option2.classList.add('text-center');
                        option2.innerHTML = '<font color="green">' + element[key].answer + '</font>';
    
                        option6.appendChild(option2);
                        qH3.appendChild(option6);
                        quiz.appendChild(qH3);
    
                    }
                }
            }
        }

        
    // // BLOCK --> Quiz results
    // var firstHeading = document.createElement('h1');
    // firstHeading.innerHTML = '<font color="black">Aptiv Quiz Results</font>';

    // headerAptivRow = document.createElement('div');
    // headerAptivRow.classList.add("row");
    // headerAptivRow.classList.add("justify-content-center");

    // headerAptivCol = document.createElement('div');
    // headerAptivCol.classList.add('col-md-12');
    // headerAptivCol.classList.add('d-flex');
    // headerAptivCol.classList.add('justify-content-center');

    // headerAptivCol.appendChild(firstHeading);
    // headerAptivRow.appendChild(headerAptivCol);
    // quiz.appendChild(headerAptivRow);

    // // BLOCK --> Number of correct questions
    // var secondHeading = document.createElement('h2');
    // secondHeading.innerHTML = '<font color="black">' + questionsHit + ' out of 5 questions are correct</font>';

    // headerCorrectQuestionsRow = document.createElement('div');
    // headerCorrectQuestionsRow.classList.add("row");
    // headerCorrectQuestionsRow.classList.add("justify-content-center");

    // headerCorrectQuestionsCol = document.createElement('div');
    // headerCorrectQuestionsCol.classList.add('col-md-12');
    // headerCorrectQuestionsCol.classList.add('d-flex');
    // headerCorrectQuestionsCol.classList.add('justify-content-center');

    // headerCorrectQuestionsCol.appendChild(secondHeading);
    // headerCorrectQuestionsRow.appendChild(headerCorrectQuestionsCol);
    // quiz.appendChild(headerCorrectQuestionsRow);

    // // BLOCK --> Score 
    // var thirdHeading = document.createElement('h3');
    // thirdHeading.innerHTML = '<font color="black">Score - ' + questionsHit * 20 + '%</font>';

    // headerScoreRow = document.createElement('div');
    // headerScoreRow.classList.add("row");
    // headerScoreRow.classList.add("align-items-center");

    // headerScoreCol = document.createElement('div');
    // headerScoreCol.classList.add('col-md-12');
    // headerScoreCol.classList.add('d-flex');
    // headerScoreCol.classList.add('justify-content-center');

    // headerScoreCol.appendChild(thirdHeading);
    // headerScoreRow.appendChild(headerScoreCol);
    // quiz.appendChild(headerScoreRow);

    // for (var key in element) {
    //     textQuestionRow = document.createElement('div');
    //     textQuestionRow.classList.add("row");
    //     textQuestionRow.classList.add("justify-content-center");

    //     textQuestionCol = document.createElement('div');
    //     textQuestionCol.classList.add('col-md-12');
    //     textQuestionCol.classList.add('d-flex');
    //     textQuestionCol.classList.add('justify-content-center');

    //     var textQuestion = document.createElement('h4');
    //     textQuestion.innerHTML = element[key].q;

    //     textQuestionCol.appendChild(textQuestion)
    //     textQuestionRow.appendChild(textQuestionCol);
    //     quiz.appendChild(textQuestionRow);

    //     // Colorize the true and false answers 
    //     for (var i = 0; i < element[key].choices.length; i++) {
    //         if (element[key].choices[i] == element[key].selected) {
    //             if (element[key].selected == element[key].answer) { // right
    //                 answerCorrectRow = document.createElement('div');
    //                 answerCorrectRow.classList.add("row");
    //                 answerCorrectRow.classList.add("justify-content-center");

    //                 answerCorrectCol = document.createElement('div');
    //                 answerCorrectCol.classList.add('col-md-12');
    //                 answerCorrectCol.classList.add('d-flex');
    //                 answerCorrectCol.classList.add('justify-content-center');

    //                 var textGreenCorrect = document.createElement('h5');
    //                 textGreenCorrect.classList.add('text-center');
    //                 textGreenCorrect.innerHTML = '<font color="green">' + element[key].selected + '</font>';

    //                 answerCorrectCol.appendChild(option);
    //                 answerCorrectRow.appendChild(answerCorrectCol);
    //                 quiz.appendChild(answerCorrectRow);

    //             } else if (element[key].selected != element[key].answer) { // wrong
    //                 answerWrongRow = document.createElement('div');
    //                 answerWrongRow.classList.add('row');
    //                 answerWrongRow.classList.add('justify-content-center');

    //                 answerWrongCol = document.createElement('div');
    //                 answerWrongCol.classList.add('col-md-4');
    //                 answerWrongCol.classList.add('d-flex');
    //                 answerWrongCol.classList.add('justify-content-center');

    //                 var textRedText = document.createElement('h5');
    //                 textRedText.classList.add('text-center');
    //                 textRedText.innerHTML = '<font color="red">' + element[key].selected + '</font>';

    //                 answerWrongCol.appendChild(textRedText);
    //                 answerWrongRow.appendChild(answerWrongCol);
    //                 quiz.appendChild(answerWrongRow);

    //                 answerCorrectCol = document.createElement('div');
    //                 answerCorrectCol.classList.add('col-md-4');
    //                 answerCorrectCol.classList.add('d-flex');
    //                 answerCorrectCol.classList.add('justify-content-center');

    //                 var textGreenText = document.createElement('h5');
    //                 textGreenText.classList.add('text-center');
    //                 textGreenText.innerHTML = '<font color="green">' + element[key].answer + '</font>';

    //                 answerCorrectCol.appendChild(textGreenText);
    //                 answerCorrectRow.appendChild(answerCorrectCol);
    //                 quiz.appendChild(answerCorrectRow);

    //             }
    //         }
    //     }
    // }

    

    // Create the download button, append to HTML
    var downloadButton = document.createElement('div');
    downloadButton.innerHTML = '<button class="btn btn-link" onclick="clickDL()">Download Results (.JSON)</button>';
    quiz.appendChild(downloadButton);
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


<p align="center">
  <img width="65%" height="65%" src="https://i.ibb.co/7twxPvD/aptiv.png"/>  
</p>

This is an example quiz application built with Vanilla Javascript for Aptiv.

# Requirements

Primary
- The user should be presented with a series of multiple-choice questions, one at a time, and his/her progress (as percentage of questions answered) and score (as percentage answered correctly) should be visible at all times. [x]
- When the test is complete, a summary view should be shown that includes a list of the incorrectly answered questions along with their true answers. [x]
- The questions and answers for the test should be stored separately as a text file (CSV, TSV or similar) and easily edited without any code changes. The exact format of this file is up to you, as are the initial set of questions. [x]

Bonus
- Exportable data in the summary view (i.e. clicking a button downloads to the user’s machine a text file containing all the incorrect answer information). [x]

# How to run?

- Clone the project
- Navigate to the project's directory
- Serve the page using Python

*Python2*

```python
python -m SimpleHTTPServer 8080
```

*Python 3*

```python
python -m http.server 8080
```

- Navigate to *http://localhost:8080/*.



# How does it work?

- Click *Start*. 

![](https://i.ibb.co/b6L3JQq/Screen-Shot-2020-03-02-at-1-10-32-PM.png)

- Select an answer from the radio group and click *Submit*.

![](https://i.ibb.co/VBQzGs1/Screen-Shot-2020-03-02-at-12-48-15-PM.png)

- When the quiz is complete, review the results of the quiz. Export the results as a .JSON file using the button at the bottom of the page.

![](https://i.ibb.co/gjQrwF5/Screen-Shot-2020-03-02-at-1-12-07-PM.png)

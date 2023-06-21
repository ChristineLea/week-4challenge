// TOGGLE DISPLAY ON/OFF
const app = document.getElementById("app");
const quiz = document.getElementById("quiz");
const resultWin = document.getElementById("resultWin");
const resultLose = document.getElementById("resultLose");

// VARIABLES FOR QUIZ QA
const questionEl = document.getElementById("question");
const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");
const output = document.getElementById("output");
output.setAttribute(
	"style",
	"margin-top: 20px; font-size: 36px; font-style: italic; color: #66023c; font-weight: bolder; text-align: center;"
);

// DISPLAY TIMER
const countdown = document.getElementById("countdown");
// DISPLAY SCORE
let outputScore = document.getElementById("output-score");
// LOCAL STORAGE
let userNameSpan = document.getElementById("user-name");
let userScoreSpan = document.getElementById("user-score");

// VARIABLES
let totalScore = 0;
let questionsLeft = 10;
let duplicateArr = [];
let correctAnswer;
let thisQuestion;
let timer = 0;

// QUESTION ARRAY
let questionArray = [
	{
		question: "What functionality does JavaScript provide?",
		option1: "Structure",
		option2: "Layout",
		option3: "Wifi",
		option4: "Interactivity",
		answer: "option4",
	},
	{
		question: "What allows code blocks to be reusable?",
		option1: "Functions",
		option2: "Objects",
		option3: "Arrays",
		option4: "For loops",
		answer: "option1",
	},
	{
		question: "What allows data input for functions?",
		option1: "Methods",
		option2: "Index",
		option3: "Parameters",
		option4: "Expression",
		answer: "option3",
	},
	{
		question: "What will remove the last element from an array?",
		option1: ".unshift()",
		option2: ".push()",
		option3: ".shift()",
		option4: ".pop()",
		answer: "option4",
	},
	{
		question: "What parameter is used clearInterval()?",
		option1: "The ID generated by the setInterval() function",
		option2: "The boolean value of true",
		option3: "The same parameter as setInterval()",
		option4: "No parameters are needed",
		answer: "option1",
	},
	{
		question: "What parameters are required for an addEventListener?",
		option1: "event, attribute",
		option2: "event, function",
		option3: "event, method",
		option4: "event, target",
		answer: "option2",
	},
	{
		question: "What are the setItem() parameters?",
		option1: "Key",
		option2: "Variable, Value",
		option3: "Key, Value",
		option4: "URL, Value",
		answer: "option3",
	},
	{
		question: "What happens to data in local storage?",
		option1: "It expires after 24 hours",
		option2: "The data will clear after the computer is restarted",
		option3: "The data is cleared from local storage",
		option4: "The data will remain",
		answer: "option4",
	},
	{
		question: "JSON.stringify/JSON.parse are used for?",
		option1: "Storing and retrieving an object's data in local storage",
		option2: "Updating and deleting data in local storage",
		option3: "Converting data into a variable",
		option4: "Saving local storage to a server",
		answer: "option1",
	},
	{
		question: "What is the method .trim() used for?",
		option1: "Trim arguments from a function call",
		option2: "Trim whitespace in HTML",
		option3: "Trim whitespace from a string",
		option4: "Trim unused elements in an array",
		answer: "option3",
	},
];

// TOGGLE DISPLAY ON/OFF FUNCTION
function myFunction(x) {
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

// myFunction(app); // SHOW THIS PAGE
myFunction(quiz);
myFunction(resultWin);
myFunction(resultLose);

// QUIZ TIMER
const setTimer = () => {
	// let sec = timer;
	timer = 60;

	let interval = setInterval(function () {
		if (timer > 0 && duplicateArr.length !== 0) {
			timer--;
			countdown.textContent = timer;
			countdown.setAttribute(
				"style",
				"font-size: 32px; color: rgb(32, 30, 30); margin-right: 24px;"
			);
			// console.log(sec); //TEST
		} else if (timer > 0 && duplicateArr.length === 0) {
			timer = 0;
			winner();
		} else  {
			// HIDE quiz
			clearInterval(interval);

			outOfTime();
		} 
	}, 1000);
};

// START GAME (EVENT)
document.getElementById("startBtn").addEventListener("click", () => {
	// HIDE APP Page / SHOW QUIZ Page
	myFunction(app);
	myFunction(quiz);

	output.hidden = true;

	setTimer();

	// RESET
	questionsLeft = 10;
	totalScore = 0;

	// COPY question array
	duplicateArr = [...questionArray];

	showQuestion();
});

const showQuestion = () => {
    questionsLeft--;
    console.log("Q#");
	if (duplicateArr.length !== 0 && timer !== 0) {
		let randomIndex = Math.floor(Math.random() * duplicateArr.length);
		thisQuestion = duplicateArr[randomIndex];

		questionEl.textContent = thisQuestion.question;
		option1.textContent = thisQuestion.option1;
		option2.textContent = thisQuestion.option2;
		option3.textContent = thisQuestion.option3;
		option4.textContent = thisQuestion.option4;

		correctAnswer = thisQuestion.answer;
		
		// Remove used question from array
		duplicateArr.splice([randomIndex], 1);
	} else if (duplicateArr.length === 0 && timer > 0) {
		winner();
	} else {
		outOfTime();
    }

};

// EVENT FUNCTION
const checkAnswer = (e) => {
	const selectOption = e.target;
	const selectAnswer = selectOption.dataset["number"];

	if (selectAnswer === correctAnswer) {
		output.hidden = false;
		output.textContent = "That's Correct";
		totalScore++;
	} else {
		output.hidden = false;
		output.textContent = "That's Incorrect";
		timer--;
	}

	delay();
};

//  DELAY ON ANSWER RESPONSE
const delay = () => {
	let second = 1;

	let addDelay = setInterval(function () {
		if (second > 0) {
			second--;
		} else {
			clearInterval(addDelay);
			output.hidden = true;
			showQuestion();
		}
	}, 500);
};

// WIN FUNCTION
const winner = () => {
	myFunction(quiz);
	myFunction(resultWin);

	const displayScore = document.createElement("p");
	displayScore.textContent = `RESULT: ${totalScore} / 10`;
	outputScore.appendChild(displayScore);
	displayScore.setAttribute("style", "text-align: left; margin: 0;");

	return;
};

// LOSE FUNCTION
const outOfTime = () => {
	myFunction(quiz);
	myFunction(resultLose);
};

// HOME BUTTON
// EVENT FIRES FROM THE LOSE PAGE
document.querySelector(".lose-home").addEventListener("click", () => {
	myFunction(resultLose);

	myFunction(app);
});
// EVENT FIRES FROM WIN PAGE
document.querySelector(".win-home").addEventListener("click", () => {
	myFunction(resultWin);

	myFunction(app);
});

// GET LOCAL STORAGE
document.getElementById("scoreBtn").addEventListener("click", () => {
	let name = localStorage.getItem("name");
	let result = localStorage.getItem("score");

	if (!name || !result) {
		return;
	}

	userNameSpan.textContent = name;
	userScoreSpan.textContent = result;
});

// RESULT FORM - SET LOCAL STORAGE
document.getElementById("submit").addEventListener("click", function (event) {
	event.preventDefault();

	let name = document.getElementById("name").value;

	localStorage.setItem("name", name);
	localStorage.setItem("score", totalScore);
});

// QUIZ ANSWER EVENTS
option1.addEventListener("click", checkAnswer);
option2.addEventListener("click", checkAnswer);
option3.addEventListener("click", checkAnswer);
option4.addEventListener("click", checkAnswer);

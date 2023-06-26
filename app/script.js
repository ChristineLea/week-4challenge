// TOGGLE DISPLAY ON/OFF CONSTANTS
const sectionOne = document.querySelector(".one");
const sectionTwo = document.querySelector(".two");
const sectionThree = document.querySelector(".three");
const sectionFour = document.querySelector(".four");
const sectionFive = document.querySelector(".five");
// QUIZ QA CONSTANTS
const questionEl = document.querySelector("#question");
const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");
const output = document.querySelector("#output");
output.setAttribute(
	"style",
	"font-size: 24px; font-style: italic; color: #66023c; font-weight: bolder; text-align: center; margin-top: 5px;"
);
// SHOW SCORE
const showScore = document.querySelector("#win");
const showScoreEl = document.createElement("h2");
// TIMER
const countdown = document.querySelector("#countdown");
// LOCAL STORAGE
let nameInput = document.querySelector("#name");
const highScoresLi = document.createElement("li");
const highScoresOl = document.querySelector("#highScores");
// GLOBAL VARIABLES
let totalScore = 0;
let duplicateArr = [];
let correctAnswer;
let thisQuestion;
let timer = 0;
// QUESTION ARRAY
const questionArr = [
	{
		question: "What functionality does JavaScript provide?",
		option1: "1. Structure",
		option2: "2. Layout",
		option3: "3. Wifi",
		option4: "4. Interactivity",
		answer: "option4",
	},
	{
		question: "What allows code blocks to be reusable?",
		option1: "1. Functions",
		option2: "2. Objects",
		option3: "3. Arrays",
		option4: "4. For loops",
		answer: "option1",
	},
	{
		question: "What allows data input for functions?",
		option1: "1. Methods",
		option2: "2. Index",
		option3: "3. Parameters",
		option4: "4. Expression",
		answer: "option3",
	},
	{
		question: "What will remove the last element from an array?",
		option1: "1. .unshift()",
		option2: "2. .push()",
		option3: "3. .shift()",
		option4: "4. .pop()",
		answer: "option4",
	},
	{
		question: "What parameter is used clearInterval()?",
		option1: "1. The ID generated by the setInterval() function",
		option2: "2. The boolean value of true",
		option3: "3. The same parameter as setInterval()",
		option4: "4. No parameters are needed",
		answer: "option1",
	},
	{
		question: "What parameters are required for an addEventListener?",
		option1: "1. event, attribute",
		option2: "2. event, function",
		option3: "3. event, method",
		option4: "4. event, target",
		answer: "option2",
	},
	{
		question: "What are the setItem() parameters?",
		option1: "1. Key",
		option2: "2. Variable, Value",
		option3: "3. Key, Value",
		option4: "4. URL, Value",
		answer: "option3",
	},
	{
		question: "What happens to data in local storage?",
		option1: "1. It expires after 24 hours",
		option2: "2. The data will clear after the computer is restarted",
		option3: "3. The data is cleared from local storage",
		option4: "4. The data will remain",
		answer: "option4",
	},
	{
		question: "JSON.stringify/JSON.parse are used for?",
		option1: "1. Storing and retrieving an object's data in local storage",
		option2: "2. Updating and deleting data in local storage",
		option3: "3. Converting data into a variable",
		option4: "4. Saving local storage to a server",
		answer: "option1",
	},
	{
		question: "What is the method .trim() used for?",
		option1: "1. Trim arguments from a function call",
		option2: "2. Trim whitespace in HTML",
		option3: "3. Trim whitespace from a string",
		option4: "4. Trim unused elements in an array",
		answer: "option3",
	},
];
// TOGGLE OFF SECTION / TOGGLE ON HIGH SCORE SECTION
document.querySelector("#score-link").addEventListener("click", () => {
	const sections = document.querySelectorAll(".container");
	for (const section of sections) {
		if (section.style.display === "block") {
			myFunction(section);
		} else if (!section.style.display) {
			myFunction(section);
		} else {
			section.style.display === "none";
		}
	}
	myFunction(sectionFive);
	getHighScore();
});
// GET LOCAL STORAGE
const getHighScore = () => {
	let highScore = JSON.parse(localStorage.getItem("newScore"));
	if (highScore !== null) {
		highScoresLi.textContent = `Name: ${highScore.name} - Score: ${highScore.score}`;
		highScoresOl.append(highScoresLi);
	}
};
// SET LOCAL STORAGE
document.querySelector("#submit").addEventListener("click", function (event) {
	event.preventDefault();
	let newScore = {
		name: nameInput.value.trim(),
		score: totalScore,
	};
	localStorage.setItem("newScore", JSON.stringify(newScore));
});
// TOGGLE DISPLAY ON / OFF FUNCTION
function myFunction(x) {
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}
// myFunction(sectionOne); // SHOW THIS PAGE
myFunction(sectionTwo);
myFunction(sectionThree);
myFunction(sectionFour);
myFunction(sectionFive);
// TIMER
const setTimer = () => {
	timer = 100;
	let interval = setInterval(function () {
		if (timer > 0) {
			timer--;
			countdown.textContent = timer;
		} else {
			clearInterval(interval);
		}
	}, 1000);
	return;
};
// EVENT - START GAME
document.querySelector("#start-btn").addEventListener("click", () => {
	// HIDE sectionOne SHOW sectionTwo
	myFunction(sectionOne);
	myFunction(sectionTwo);

	output.hidden = true;
	showScoreEl.hidden = true;
	setTimer();
	totalScore = 0;

	duplicateArr = [...questionArr];
	showQuestion();
});
// SHOW QUESTION
const showQuestion = () => {
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
// CHECK ANSWER Event Function
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
// DELAY ON ANSWER RESPONSE
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
	// HIDE sectionTwo SHOW sectionThree
	myFunction(sectionTwo);
	myFunction(sectionThree);
	// OUTPUT Score
	showScoreEl.hidden = false;
	showScoreEl.textContent = `RESULT: ${totalScore} / 10`;
	showScore.appendChild(showScoreEl);
	showScoreEl.setAttribute("class", "heading");
	return;
};
// OUT OF TIME / LOSE FUNCTION
const outOfTime = () => {
	// HIDE sectionTwo SHOW sectionFour
	myFunction(sectionTwo);
	myFunction(sectionFour);
	return;
};
// EVENT / HOME Button from WIN
document.querySelector("#win-home").addEventListener("click", () => {
	myFunction(sectionThree);
	myFunction(sectionOne);
});
// EVENT / HOME Button from LOSE
document.querySelector("#lose-home").addEventListener("click", () => {
	myFunction(sectionFour);
	myFunction(sectionOne);
});
// EVENT / HOME Button from SCORE
document.querySelector("#score-home").addEventListener("click", () => {
	myFunction(sectionFive);
	myFunction(sectionOne);
});
// EVENT Check Answer Function
option1.addEventListener("click", checkAnswer);
option2.addEventListener("click", checkAnswer);
option3.addEventListener("click", checkAnswer);
option4.addEventListener("click", checkAnswer);
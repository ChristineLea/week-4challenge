// STEP ONE add div elements & set up toggle display

const app = document.getElementById("app");
const quiz = document.getElementById("quiz");


function myFunction(x) {
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

myFunction(app);
myFunction(quiz);
//LOADER

let loader = document.querySelector(".loader-wraper");

window.onload = function() {
 loader.style.display = 'none';
 //getNewQuestion(); // initialize process to get a question from the json
}


// RESULT MODAL

document.getElementById("myBtn").addEventListener("click", function submitBreak(e){
    e.preventDefault()
  });

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    window.location.reload(false); 
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    window.location.reload(false); 
    }
}


//EXIT INTENT MODAL

let modalExitCounter = 0;

document.addEventListener("mouseleave", function(e){
    if( e.clientY < 0 && modalExitCounter === 0 && document.getElementById("myModal").style.display === "none")
    {
        // Get the modal
        var modal = document.getElementById("myModal-exit");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[1];

        //Make the modal appear
        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.display = "none";
            }
        }
    }

    modalExitCounter++;

}, false); 



// RIGHT ANSWERS

let rightAnswers = ["brown", "grey", "walk", "safe", "warm", "stop", "knees", "pretend", "cold", "dreamin1", "dreamin2", "dreamin3", "california", "winter"];


// GETTING A NEW QUESTION - JSON FETCHING

let questionsAlreadyDone = [];

let answers = [];

let score = 0;

function getNewQuestion() {

    //GETTING DATA FROM FORM
    
    let form = document.getElementById("californiaForm");

    if (document.getElementById("question-input").children.length > 0) {
        for (let i = 0; i < form.elements.length; i++ ) {
        let e = form.elements[i];
        if (e.type === "checkbox" || e.type === "radio") {
            if (e.checked === true) {
                answers.push(e.value)
        }} 
        else {
            answers.push(e.value.toLowerCase())
        };
    }}

    document.getElementById("myBtn").innerHTML = "Next";
    document.getElementById("myBtn").classList.add("myBtn--mod");
    document.getElementById("game-title").classList.add("h1--mod");
    fetch("../questions.json")
    .then((response) => response.json())
    .then((data) => {
        if (questionsAlreadyDone.length === 5) {
            modal.style.display = "block";
            getScore();
            sendToDb();
            console.log("score : " + score);
            console.log(answers);
            console.log(questionsAlreadyDone);
            getResult();
        } else {
        let randomQuestionIndex = Math.floor(Math.random() * data.length);
        while (questionsAlreadyDone.includes(randomQuestionIndex)) {
            randomQuestionIndex = Math.floor(Math.random() * data.length);
        }
        let label = data[randomQuestionIndex].label;
        let question = data[randomQuestionIndex].input;
        document.getElementById("question-title").innerHTML = label;
        document.getElementById("question-input").innerHTML = question;
        questionsAlreadyDone.push(randomQuestionIndex);
    };

    if (questionsAlreadyDone.length > 4) {
        document.getElementById("myBtn").innerHTML = "Finish";
    };

})};


//GETTING SCORE

function getScore () {

for (let i = 0; i < answers.length; i++ ) {
    if (rightAnswers.includes(answers[i])) {
        score++
        }
    }   
};


// PRESSING ENTER TO PRESS BUTTON

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        getNewQuestion();
    }
});

// PRESSING ESC TO CLOSE MODAL

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === "block") {{
        e.preventDefault();
        window.location.reload(false); 
    }}});
    

//TOGGLE BACKGROUND

function toggleBg() {
    let switchButton = document.getElementById("switch-button");

    if (switchButton.checked) {
        document.getElementById("main-container").classList.toggle("background-image");
        document.querySelector(".switch-text").classList.toggle("video-off");
        }
}


//FIREBASE

let firebaseConfig = {
    apiKey: "AIzaSyDe3XtpFLEPhy5dqTiCEWpzKXtMWzagmtw",
    authDomain: "california-dreamin-form.firebaseapp.com",
    projectId: "california-dreamin-form",
    storageBucket: "california-dreamin-form.appspot.com",
    messagingSenderId: "526235533541",
    appId: "1:526235533541:web:b17e224fe0aba7a1bbd40c"
  };

//INIT FIREBASE

firebase.initializeApp(firebaseConfig);
let firestore = firebase.firestore();

let db = firestore.collection("californiaDreaminData");

//SEND ANSWERS TO DATABASE

function sendToDb () {
    
let scoreInput = score;
db.doc().set(
    {score: scoreInput}
)};

//GETTING DATA FROM FIREBASE AND CREATING FEEDBACK FOR THE USER

let allScores = [];

function getResult () {
    db.get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            allScores.push(doc.data().score);
        console.log(allScores);
            let reducer = ((a, b) => a + b);
            let summUp = allScores.reduce(reducer);
        console.log("summUp : " + summUp);
            let average = Math.floor(summUp / allScores.length);
        console.log("average : " + average);
            let resultBoxTitle = document.getElementById("result-title");
            let resultBox = document.getElementById("result");
            if (score === 0) {
                resultBoxTitle.innerHTML = `Oh...` 
                resultBox.innerHTML = `You got ${score} points.</br> But c'mon. This is the 70s.</br>Just take another ride.` 
            } else if (score === 1) {
                resultBoxTitle.innerHTML = `Ok...` 
                resultBox.innerHTML = `You got ${score} point.</br>That's a bit below average.</br>Another ride?` 
            }else if (score < average) {
                resultBoxTitle.innerHTML = `Cool!` 
                resultBox.innerHTML = `You got ${score} points.</br>That's a bit below average thoug.</br>Another ride to improve it?` 
            } else if (score === average) {
                resultBoxTitle.innerHTML = `Right on!` 
                resultBox.innerHTML = `You got ${score} points.</br>That's spot on the average.</br>You can always try again to improve your score.`     
            } else if (score > average) {
                resultBoxTitle.innerHTML = `Rad!` 
                resultBox.innerHTML = `You got ${score} points.</br>That's above the average.</br>You're the joint my dude(t)!`    
            } else if (score > average + 2) {
                resultBoxTitle.innerHTML = `Gnarly!` 
                resultBox.innerHTML = `You got ${score} points.</br>That's quite above the average.</br>You're sick my dude(t)!`    
            }
    }
    );
    }
    )
    
};
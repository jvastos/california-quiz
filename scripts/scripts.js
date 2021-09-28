//LOADER

let loader = document.querySelector(".loader-wraper");

window.onload = function() {
 loader.style.display = 'none';
 //getNewQuestion(); // initialize process to get a question from the json
}


// MODAL

document.getElementById("myBtn").addEventListener("click", function submitBreak(event){
    event.preventDefault()
  });

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 


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


// GETTING A NEW QUESTION - JSON FETCHING

let questionsAlreadyDone = [];

function getNewQuestion() {
    document.getElementById("myBtn").innerHTML = "Next";
    document.getElementById("myBtn").classList.add("myBtn--mod");
    document.getElementById("game-title").classList.add("h1--mod");
    fetch("../questions.json")
    .then((response) => response.json())
    .then((data) => {
        if (questionsAlreadyDone.length === 5) {
            modal.style.display = "block";
            
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
        console.log(questionsAlreadyDone);
    };

    if (questionsAlreadyDone.length > 4) {
        document.getElementById("myBtn").innerHTML = "Finish";
    };

})};


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

const firebaseConfig = {
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
/*var spinner = $('#loader');
        const scriptURLC ='https://script.google.com/a/macros/hyperisland.se/s/AKfycbyJ6xcKhfmsjik35PF4R7ZVW23HFXwmz-v8y6_9r0dVyPf8UTDqPh7_S3x1oGLbsCJ8/exec'
        const serverlessForm = document.forms['serverless-form'];

        serverlessForm.addEventListener('submit', e => {
            e.preventDefault();
            spinner.show();


            fetch(scriptURLC, {
                    method: 'POST',
                    body: new FormData(serverlessForm)
                })
                .then(res => {

                    console.log(res);
                    spinner.hide();

                    if (res['status'] == 200) {
                        swal("Your form has been submitted!",
                            "We will get back to you soon. Have a great day!", "success");
                        return true;

                    } else {
                        swal("Something went wrong!", "Please try after some time", "error");

                    }
                    document.getElementById('submitForm').classList.remove('loading');
                })
                .catch(error => {

                    swal("Something went wrong!", "Please try after some time", "error");
                    // todo enable submit button

                })
        });

*/

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
btn.onclick = function() {
    modal.style.display = "block";
}

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
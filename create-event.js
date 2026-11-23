 

let form = document.querySelector("form");
form.addEventListener("submit", validateForm);

function validateForm(event) {

  event.preventDefault();

  // Read the values (.value gives what the user typed)
  let title = document.getElementById("title").value.trim();
  let seats = document.getElementById("seats").value;
  let date = document.getElementById("date").value;
  let deadline = document.getElementById("deadline").value;
  let venue = document.getElementById("venue").value.trim();
  let organizer = document.getElementById("organizer").value.trim();
  let description = document.getElementById("description").value.trim();

   let now = new Date();
  let month = now.getMonth() + 1;//getMonth() gives 0 for January and 11 for December
  let day = now.getDate();
  //add zero infornt of single digit 
  if (month < 10) { month = "0" + month; }
  if (day < 10) { day = "0" + day; }
  let today = now.getFullYear() + "-" + month + "-" + day;

  // ----- Step 1: title and seats -----
  if (title.length < 3) {
    alert("Event title must be at least 3 characters");
    return;
  }
  if (seats == "" || seats <= 0) {
    alert("Seats must be greater than 0");
    return;
  }

  // ----- Step 2: dates are filled, and the event is not in the past -----
  if (date == "") {
    alert("Please choose the event date");
    return;
  }
  if (deadline == "") {
    alert("Please choose the registration deadline");
    return;
  }
  if (date < today) {
    alert("Event date cannot be in the past");
    return;
  }

  // ----- Step 3: deadline must be on or before the event date -----
  // (dates in yyyy-mm-dd form can be compared directly with < and >)
  if (deadline > date) {
    alert("Registration deadline must be on or before the event date");
    return;
  }

   if (venue == "") {
    alert("Venue must be filled out");
    return;
  }
  if (organizer == "") {
    alert("Organizer must be filled out");
    return;
  }
  if (description.length < 10) {
    alert("Description must be at least 10 characters");
    return;
  }

   alert("Event published successfully!");
   
  form.reset();
}

 
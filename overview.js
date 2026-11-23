 
const stats = [9, 5, 9, 2];

// The 5 events in "Upcoming events"
const events = [
  { name: "Web Development Workshop", date: "15 Nov 2026", venue: "Computer Lab DS105, D Building" },
  { name: "Mobile Photography Workshop", date: "18 Nov 2026", venue: "Amphitheatre" },
  { name: "AI & the Future of Technology", date: "20 Nov 2026", venue: "Auditorium, 10th floor,D Building" },
  { name: "AIUB Champions League (ACL)", date: "22 Nov 2026", venue: "Sports Gallery" },
  { name: "8 Ball Pool Tournament", date: "28 Nov 2026", venue: "AIUB Indoor,10th floor,D Building" }
];

// The rows in "Recent registrations"
const registrations = [
  { student: "Minhajul Islam", event: "Web Development Workshop", date: "10 Nov 2026" },
  { student: "HASIN NILOVE", event: "Web Development Workshop", date: "10 Nov 2026" },
  { student: "LABIB HASAN", event: "AI & the Future of Technology", date: "9 Nov 2026" },
  { student: "KHANDAKAR NAZMUZ SAKIB", event: "Programming Contest 2026", date: "9 Nov 2026" },
  { student: "Mahmudul Hasan", event: "Freshers Cultural Night", date: "8 Nov 2026" }
];

 

//  Fill the 4 small boxes 
let numbers = document.querySelectorAll(".number");
for (let i = 0; i < numbers.length; i++) {
  numbers[i].innerHTML = stats[i];
}

//  Fill the two big boxes 
let bigBoxes = document.querySelectorAll(".two-boxes .box");

// Left box: upcoming events  
let eventsText = "";
for (let i = 0; i < events.length; i++) {
  eventsText += `
    <div class="event-row">
      <div>
        <p class="event-name">${events[i].name}</p>
        <p class="event-info">${events[i].date} · ${events[i].venue}</p>
      </div>
      <a href="#" class="view-btn">View</a>
    </div>`;
}
bigBoxes[0].innerHTML += eventsText;

// Right box: recent registrations  
let regTable = document.querySelector("table");
let regText = "";
for (let i = 0; i < registrations.length; i++) {
  regText += `
    <tr>
      <td>${registrations[i].student}</td>
      <td>${registrations[i].event}</td>
      <td class="light-text">${registrations[i].date}</td>
    </tr>`;
}
 regTable.innerHTML += regText;

// View button
function showEventInfo(i) {
  alert(
    "Event: " + events[i].name +
    "\nDate: " + events[i].date +
    "\nVenue: " + events[i].venue
  );
}

// The buttons are created above, so we find them AFTER the loop
let viewButtons = document.querySelectorAll(".view-btn");
for (let i = 0; i < viewButtons.length; i++) {
  viewButtons[i].addEventListener("click", function (event) {
     showEventInfo(i);
  });
}
 
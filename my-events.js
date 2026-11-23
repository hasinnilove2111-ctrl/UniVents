const events = [
  { name: "Web Development Workshop", date: "15 Nov 2026", category: "Workshop", seatsLeft: 148, totalSeats: 150 },
  { name: "AI & the Future of Technology", date: "20 Nov 2026", category: "Seminar", seatsLeft: 299, totalSeats: 300 },
  { name: "Programming Contest 2026", date: "28 Nov 2026", category: "Technology", seatsLeft: 89, totalSeats: 90 },
  { name: "Freshers Cultural Night", date: "5 Dec 2026", category: "Cultural", seatsLeft: 499, totalSeats: 500 },
  { name: "Inter-Department Football Cup", date: "22 Nov 2026", category: "Sports", seatsLeft: 200, totalSeats: 200 },
  { name: "Career Planning Seminar", date: "10 Dec 2026", category: "Seminar", seatsLeft: 120, totalSeats: 120 },
  { name: "Robotics & IoT Expo", date: "14 Dec 2026", category: "Technology", seatsLeft: 400, totalSeats: 400 },
  { name: "Mobile Photography Workshop", date: "18 Nov 2026", category: "Workshop", seatsLeft: 40, totalSeats: 40 },
  { name: "Campus Badminton Open", date: "2 Dec 2026", category: "Sports", seatsLeft: 64, totalSeats: 64 }
];


let table = document.querySelector("table");

let text = "";
for (let i = 0; i < events.length; i++) {
  text += `
    <tr>
      <td><b>${events[i].name}</b></td>
      <td class="light-text">${events[i].date}</td>
      <td class="light-text">${events[i].category}</td>
      <td class="light-text">${events[i].seatsLeft} / ${events[i].totalSeats}</td>
      <td>
        <button type="button" class="postpone-btn">Postpone</button>
      </td>
    </tr>`;
}
table.innerHTML += text;

 function postponeEvent(i, button) {
  alert(events[i].name + " has been postponed.");
   button.innerHTML = "Postponed";   
  button.disabled = true;      //it can not be pressed again      
}

// The buttons are created above, so we find them AFTER the loop
let postponeButtons = document.querySelectorAll(".postpone-btn");
for (let i = 0; i < postponeButtons.length; i++) {
  postponeButtons[i].addEventListener("click", function () {
    postponeEvent(i, postponeButtons[i]);
  });
}

 
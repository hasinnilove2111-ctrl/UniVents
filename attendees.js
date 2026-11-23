 
const attendees = [
  { name: "Minhaj", id: "2022-1-60-001", event: "Web Development Workshop", date: "10 Nov 2026", attended: true },
  { name: "Shakib", id: "2022-1-60-014", event: "Web Development Workshop", date: "10 Nov 2026", attended: false },
  { name: "Tanvir", id: "2021-2-50-033", event: "AI & the Future of Technology", date: "9 Nov 2026", attended: true },
  { name: "Nilove", id: "2023-1-60-102", event: "Programming Contest 2026", date: "9 Nov 2026", attended: false },
  { name: "Mahmudul", id: "2024-1-10-007", event: "Freshers Cultural Night", date: "8 Nov 2026", attended: false }
];
 
let table = document.querySelector("table");

let text = "";
for (let i = 0; i < attendees.length; i++) {

  // it makes the true value checked
  let tick = "";
  if (attendees[i].attended == true) {
    tick = "checked";
  } else {
    tick = "";
  }

  text += `
    <tr>
      <td>${attendees[i].name}</td>
      <td class="light-text">${attendees[i].id}</td>
      <td>${attendees[i].event}</td>
      <td class="light-text">${attendees[i].date}</td>
      <td><input type="checkbox" ${tick} /></td>
    </tr>`;
}
table.innerHTML += text;


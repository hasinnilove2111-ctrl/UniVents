


// ---------- Chhoto helper function gulo ----------

// data.js-e id jodi "3" (text) hishebe thake, shegulo number kore nei
// jate findUser / findEvent shob jaygay mile jay
for (let i = 0; i < users.length; i++) { users[i].id = Number(users[i].id); }
for (let i = 0; i < events.length; i++) { events[i].id = Number(events[i].id); }
for (let i = 0; i < registrations.length; i++) {
  registrations[i].userId = Number(registrations[i].userId);
  registrations[i].eventId = Number(registrations[i].eventId);
}

// aajker date, "2026-11-22" format-e
function getToday() {
  let d = new Date();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  if (month < 10) { month = "0" + month; }
  if (day < 10) { day = "0" + day; }
  return d.getFullYear() + "-" + month + "-" + day;
}

// "2026-09-05" -> "05 Sept 2026"
function formatDate(text) {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  let year = text.slice(0, 4);
  let month = Number(text.slice(5, 7));
  let day = text.slice(8, 10);
  return day + " " + months[month - 1] + " " + year;
}

function findUser(id) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) { return users[i]; }
  }
  return null;
}

function findEvent(id) {
  for (let i = 0; i < events.length; i++) {
    if (events[i].id === id) { return events[i]; }
  }
  return null;
}

// ekta event-e koyta registration (Registered)
function countRegs(eventId) {
  let count = 0;
  for (let i = 0; i < registrations.length; i++) {
    if (registrations[i].eventId === eventId && registrations[i].status === "Registered") {
      count++;
    }
  }
  return count;
}

// ekta event-e koyjon Present
function countPresent(eventId) {
  let count = 0;
  for (let i = 0; i < registrations.length; i++) {
    if (registrations[i].eventId === eventId && registrations[i].attendance === "Present") {
      count++;
    }
  }
  return count;
}

// status text -> coloured badge
function badge(text) {
  let cls = "status-open";
  if (text === "Active" || text === "Open" || text === "Registered" || text === "Present") {
    cls = "status-active";
  } else if (text === "Not marked") {
    cls = "status-notmarked";
  } else {
    cls = "status-inactive";
  }
  return '<span class="status ' + cls + '">' + text + '</span>';
}

// header-er "Admin User · Admin" badge
function setBadge() {
  let box = document.getElementById("adminBadge");
  if (box !== null) {
    box.innerHTML = currentAdmin.name + " · " + currentAdmin.role;
  }
}

// ekta event select dropdown-e shob event add kore
function fillEventSelect(selectId) {
  let select = document.getElementById(selectId);
  for (let i = 0; i < events.length; i++) {
    let option = document.createElement("option");
    option.value = events[i].id;
    option.innerHTML = events[i].title;
    select.appendChild(option);
  }
}

// "Recent Registrations" table (Overview + Reports )
function showRecent() {
  let html = "";
  for (let i = 0; i < registrations.length && i < 5; i++) {
    let r = registrations[i];
    let u = findUser(r.userId);
    let e = findEvent(r.eventId);
    if (u !== null && e !== null) {
      html += "<tr>";
      html += "<td>" + u.name + "</td>";
      html += "<td>" + e.title + "</td>";
      html += "<td>" + r.registered + "</td>";
      html += "</tr>";
    }
  }
  document.getElementById("recentBody").innerHTML = html;
}


// 1. OVERVIEW 

function showOverview() {
  // started: false hole event ekhono shuru hoyni (upcoming)
  let upcoming = 0;
  for (let i = 0; i < events.length; i++) {
    if (events[i].started === false) { upcoming++; }
  }

  document.getElementById("totalEvents").innerHTML = events.length;
  document.getElementById("totalUsers").innerHTML = users.length;
  document.getElementById("totalRegs").innerHTML = registrations.length;
  document.getElementById("upcomingEvents").innerHTML = upcoming;

  showRecent();

  let stats = getAttendanceStats();
  document.getElementById("platformBar").style.width = stats.rate + "%";
  document.getElementById("platformText").innerHTML =
    stats.attended + " of " + stats.eligible + " eligible registrations marked present (" + stats.rate + "%)";
}


//  2. MANAGE EVENTS 

function showEvents() {
  let search = document.getElementById("eventSearch").value.toLowerCase();
  let category = document.getElementById("eventCategory").value;
  let status = document.getElementById("eventStatus").value;
  let date = document.getElementById("eventDate").value;
  let sort = document.getElementById("eventSort").value;

  // filter kora event gulo ekta notun array-te
  let list = [];
  for (let i = 0; i < events.length; i++) {
    let e = events[i];
    let text = e.title.toLowerCase() + " " + e.organizer.toLowerCase();
    let show = true;

    if (search !== "" && text.indexOf(search) === -1) { show = false; }
    if (category !== "" && e.category !== category) { show = false; }
    if (status !== "" && e.status !== status) { show = false; }
    if (date !== "" && e.dateValue !== date) { show = false; }

    if (show === true) { list.push(e); }
  }

  // sort (simple bubble sort)
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length - 1 - i; j++) {
      let swap = false;
      if (sort === "dateAsc" && list[j].dateValue > list[j + 1].dateValue) { swap = true; }
      if (sort === "dateDesc" && list[j].dateValue < list[j + 1].dateValue) { swap = true; }
      if (sort === "title" && list[j].title > list[j + 1].title) { swap = true; }
      if (swap === true) {
        let temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
      }
    }
  }

  let html = "";
  for (let i = 0; i < list.length; i++) {
    let e = list[i];
    html += "<tr>";
    html += "<td>" + e.title + "</td>";
    html += "<td>" + e.organizer + "</td>";
    html += "<td>" + e.category + "</td>";
    html += "<td>" + e.date + "</td>";
    html += "<td>" + e.venue + "</td>";
    html += "<td>" + countRegs(e.id) + "</td>";
    html += "<td>" + e.capacity + "</td>";
    html += "<td>" + badge(e.status) + "</td>";
    html += "<td>";
    html += '<button class="btn-view" onclick="viewEvent(' + e.id + ')">View</button> ';
    html += '<button class="btn-edit" onclick="editEvent(' + e.id + ')">Edit</button> ';
    html += '<button class="btn-delete" onclick="deleteEvent(' + e.id + ')">Delete</button>';
    html += "</td>";
    html += "</tr>";
  }
  if (list.length === 0) {
    html = '<tr><td colspan="9">No events found.</td></tr>';
  }
  document.getElementById("eventBody").innerHTML = html;
}

function viewEvent(id) {
  let e = findEvent(id);
  alert(e.title + "\n" +
        "Organizer: " + e.organizer + "\n" +
        "Category: " + e.category + "\n" +
        "Date: " + e.date + "\n" +
        "Venue: " + e.venue + "\n" +
        "Registrations: " + countRegs(e.id) + " / " + e.capacity + "\n" +
        "Status: " + e.status);
}

// Edit button: 
function editEvent(id) {
  let e = findEvent(id);
  document.getElementById("editId").value = e.id;
  document.getElementById("editTitle").value = e.title;
  document.getElementById("editCapacity").value = e.capacity;
  document.getElementById("editStatus").value = e.status;
  clearEditErrors();
  document.getElementById("editBox").style.display = "block";
}

function cancelEdit() {
  document.getElementById("editBox").style.display = "none";
  clearEditErrors();
}

function clearEditErrors() {
  document.getElementById("editError").innerHTML = "";
  document.getElementById("editTitle").style.borderColor = "";
  document.getElementById("editCapacity").style.borderColor = "";
}

// Save Changes: validation + data update
function saveEvent() {
  let id = Number(document.getElementById("editId").value);
  let titleBox = document.getElementById("editTitle");
  let capacityBox = document.getElementById("editCapacity");
  let error = document.getElementById("editError");

  let title = titleBox.value.trim();
  let capacityText = capacityBox.value;
  let capacity = Number(capacityText);

  clearEditErrors();
  error.style.color = "red";

  if (title === "") {
    error.innerHTML = "Event title is required.";
    titleBox.style.borderColor = "red";
    return false;
  }
  if (title.length < 3) {
    error.innerHTML = "Event title must be at least 3 characters.";
    titleBox.style.borderColor = "red";
    return false;
  }
  if (capacityText === "") {
    error.innerHTML = "Capacity is required.";
    capacityBox.style.borderColor = "red";
    return false;
  }
  if (isNaN(capacity) || capacity < 1) {
    error.innerHTML = "Capacity must be a number greater than 0.";
    capacityBox.style.borderColor = "red";
    return false;
  }
  if (capacity < countRegs(id)) {
    error.innerHTML = "Capacity cannot be less than current registrations (" + countRegs(id) + ").";
    capacityBox.style.borderColor = "red";
    return false;
  }

  // sob thik thakle, data update
  let e = findEvent(id);
  e.title = title;
  e.capacity = capacity;
  e.status = document.getElementById("editStatus").value;

  cancelEdit();
  showEvents();
  alert("Event updated.");
  return true;
}

// Delete: event delete + related registrations delete
function deleteEvent(id) {
  let newEvents = [];
  for (let i = 0; i < events.length; i++) {
    if (events[i].id !== id) { newEvents.push(events[i]); }
  }
  events = newEvents;

  let newRegs = [];
  for (let i = 0; i < registrations.length; i++) {
    if (registrations[i].eventId !== id) { newRegs.push(registrations[i]); }
  }
  registrations = newRegs;

  showEvents();
  alert("Event deleted.");
}


// 3. MANAGE USERS 
function showUsers() {
  let search = document.getElementById("userSearch").value.toLowerCase();
  let role = document.getElementById("userRole").value;
  let status = document.getElementById("userStatus").value;

  let html = "";
  let count = 0;

  for (let i = 0; i < users.length; i++) {
    let u = users[i];
    let text = u.name.toLowerCase() + " " + u.email.toLowerCase();
    let show = true;

    if (search !== "" && text.indexOf(search) === -1) { show = false; }
    if (role !== "" && u.role !== role) { show = false; }
    if (status !== "" && u.status !== status) { show = false; }

    if (show === true) {
      count++;
      html += "<tr>";

      // name
      if (u.id === 1) {
        html += "<td>" + u.name + " <small>(you)</small></td>";
      } else {
        html += "<td>" + u.name + "</td>";
      }
      html += "<td>" + u.email + "</td>";

      // role: admin hole text, onno hole dropdown
      if (u.role === "Admin") {
        html += "<td>Admin</td>";
      } else {
        html += "<td>" + roleSelect(u) + "</td>";
      }

      html += "<td>" + badge(u.status) + "</td>";
      html += "<td>" + u.joined + "</td>";

      // actions
      html += '<td><button class="btn-view" onclick="viewUser(' + u.id + ')">View</button> ';
      if (u.role !== "Admin") {
        if (u.status === "Active") {
          html += '<button class="btn-deactivate" onclick="toggleUser(' + u.id + ')">Deactivate</button>';
        } else {
          html += '<button class="btn-activate" onclick="toggleUser(' + u.id + ')">Activate</button>';
        }
      }
      html += "</td>";
      html += "</tr>";
    }
  }

  if (count === 0) {
    html = '<tr><td colspan="6">No users found.</td></tr>';
  }
  document.getElementById("userBody").innerHTML = html;
}

function roleSelect(u) {
  let roles = ["Admin", "Organizer", "Student"];
  let html = '<select class="field" onchange="changeRole(' + u.id + ', this.value)">';
  for (let i = 0; i < roles.length; i++) {
    if (roles[i] === u.role) {
      html += '<option value="' + roles[i] + '" selected>' + roles[i] + "</option>";
    } else {
      html += '<option value="' + roles[i] + '">' + roles[i] + "</option>";
    }
  }
  html += "</select>";
  return html;
}

function changeRole(id, newRole) {
  findUser(id).role = newRole;
  showUsers();
}

function toggleUser(id) {
  let u = findUser(id);
  if (u.status === "Active") {
    u.status = "Inactive";
  } else {
    u.status = "Active";
  }
  showUsers();
}

function viewUser(id) {
  let u = findUser(id);
  let text = u.name + "\n" +
             "Email: " + u.email + "\n" +
             "Role: " + u.role + "\n" +
             "Status: " + u.status + "\n" +
             "Joined: " + u.joined;
  if (u.studentId !== "") {
    text += "\nStudent ID: " + u.studentId;
  }
  alert(text);
}


//  4. ALL REGISTRATIONS 

function showRegistrations() {
  let search = document.getElementById("regSearch").value.toLowerCase();
  let eventValue = document.getElementById("regEvent").value;
  let status = document.getElementById("regStatus").value;
  let attendance = document.getElementById("regAttendance").value;

  let html = "";
  let count = 0;

  for (let i = 0; i < registrations.length; i++) {
    let r = registrations[i];
    let u = findUser(r.userId);
    let e = findEvent(r.eventId);
    let show = true;
    let text = "";
    if (u === null || e === null) {
      show = false;            // user/event data.js-e nai, ei row skip
    } else {
      text = u.name.toLowerCase() + " " + u.studentId.toLowerCase();
    }

    if (search !== "" && text.indexOf(search) === -1) { show = false; }
    if (eventValue !== "" && r.eventId !== Number(eventValue)) { show = false; }
    if (status !== "" && r.status !== status) { show = false; }
    if (attendance !== "" && r.attendance !== attendance) { show = false; }

    if (show === true) {
      count++;
      html += "<tr>";
      html += "<td>" + u.name + "</td>";
      html += "<td>" + u.studentId + "</td>";
      html += "<td>" + e.title + "</td>";
      html += "<td>" + e.date + "</td>";
      html += "<td>" + r.registered + "</td>";
      html += "<td>" + badge(r.status) + "</td>";
      html += "<td>" + badge(r.attendance) + "</td>";
      html += "</tr>";
    }
  }

  if (count === 0) {
    html = '<tr><td colspan="7">No registrations found.</td></tr>';
  }
  document.getElementById("regBody").innerHTML = html;
}


// 5. ATTENDANCE 

// Eligible = event shuru hoye geche, othoba already Present
function isEligible(r) {
  let e = findEvent(r.eventId);
  if (e === null || findUser(r.userId) === null) { return false; }
  if (r.attendance === "Present") { return true; }
  if (e.started === true) { return true; }
  return false;
}

function getAttendanceStats() {
  let eligible = 0;
  let attended = 0;
  for (let i = 0; i < registrations.length; i++) {
    if (isEligible(registrations[i])) {
      eligible++;
      if (registrations[i].attendance === "Present") { attended++; }
    }
  }
  let rate = 0;
  if (eligible > 0) {
    rate = Math.round(attended / eligible * 100);
  }
  return { eligible: eligible, attended: attended, rate: rate };
}

function showAttendance() {
  let eventValue = document.getElementById("attEvent").value;
  let status = document.getElementById("attStatus").value;

  let stats = getAttendanceStats();
  document.getElementById("eligibleCount").innerHTML = stats.eligible;
  document.getElementById("attendedCount").innerHTML = stats.attended;
  document.getElementById("notMarkedCount").innerHTML = stats.eligible - stats.attended;
  document.getElementById("rateCount").innerHTML = stats.rate + "%";
  document.getElementById("attendanceBar").style.width = stats.rate + "%";

  let html = "";
  let count = 0;
  for (let i = 0; i < registrations.length; i++) {
    let r = registrations[i];
    let show = isEligible(r);

    if (eventValue !== "" && r.eventId !== Number(eventValue)) { show = false; }
    if (status !== "" && r.attendance !== status) { show = false; }

    if (show === true) {
      count++;
      let u = findUser(r.userId);
      let e = findEvent(r.eventId);
      html += "<tr>";
      html += "<td>" + e.title + "</td>";
      html += "<td>" + u.name + " <small>" + u.studentId + "</small></td>";
      html += "<td>" + e.date + "</td>";
      html += "<td>" + badge(r.attendance) + "</td>";
      html += "</tr>";
    }
  }
  if (count === 0) {
    html = '<tr><td colspan="4">No attendance records found.</td></tr>';
  }
  document.getElementById("attendanceBody").innerHTML = html;
}


// 6. REPORTS & ACTIVITY 

function showReports() {
  // Registrations per Event (bar)
  let bars = "";
  for (let i = 0; i < events.length; i++) {
    let e = events[i];
    let regs = countRegs(e.id);
    let percent = regs / e.capacity * 100;
    bars += '<div class="bar-row">';
    bars += '<span class="bar-label">' + e.title + "</span>";
    bars += '<div class="bar"><div class="bar-fill" style="width:' + percent + '%"></div></div>';
    bars += '<span class="bar-count">' + regs + "/" + e.capacity + " · " + countPresent(e.id) + " present</span>";
    bars += "</div>";
  }
  document.getElementById("eventBars").innerHTML = bars;

  // Recent registrations
  showRecent();

  // Most recently added events (last event age)
  let eventHtml = "";
  for (let i = events.length - 1; i >= 0; i--) {
    let e = events[i];
    eventHtml += '<div class="list-row">';
    eventHtml += "<div><b>" + e.title + "</b><span>" + e.date + " · " + e.organizer + "</span></div>";
    eventHtml += badge(e.status);
    eventHtml += "</div>";
  }
  document.getElementById("newEvents").innerHTML = eventHtml;

  // Newest accounts (last 5 jon)
  let userHtml = "";
  for (let i = users.length - 1; i >= 0 && i >= users.length - 5; i--) {
    let u = users[i];
    userHtml += '<div class="list-row">';
    userHtml += "<div><b>" + u.name + "</b><span>" + u.role + " · joined " + u.joined + "</span></div>";
    userHtml += "</div>";
  }
  document.getElementById("newUsers").innerHTML = userHtml;
}


// 7. SETTINGS (form validation) 

// Show password checkbox
function showPassword() {
  let box = document.getElementById("showPass");
  let type = "password";
  if (box.checked) { type = "text"; }
  document.getElementById("password").type = type;
  document.getElementById("confirmPassword").type = type;
}

// onsubmit="return saveProfile()"
// ekta ekta kore check kori; bhul pele message dekhaye return false
function saveProfile() {
  let name = document.getElementById("fullName").value.trim();
  let empId = document.getElementById("empId").value.trim();
  let designation = document.getElementById("designation").value;
  let office = document.getElementById("office").value;
  let phone = document.getElementById("phone").value.trim();
  let joinDate = document.getElementById("joinDate").value;
  let password = document.getElementById("password").value;
  let confirm = document.getElementById("confirmPassword").value;
  let message = document.getElementById("saveMessage");

  let numberChar = /[0-9]/;
  let empPattern = /^EMP-[0-9]{4}$/;
  let phonePattern = /^01[0-9]{9}$/;
  let specialChar = /[!@#$%^&*]/;

  if (name === "") {
    message.innerHTML = "Full name is required.";
    message.style.color = "red";
    return false;
  }

  if (name.length < 3) {
    message.innerHTML = "Full name needs at least 3 characters.";
    message.style.color = "red";
    return false;
  }

  if (numberChar.test(name)) {
    message.innerHTML = "Full name cannot contain numbers.";
    message.style.color = "red";
    return false;
  }

  if (!empPattern.test(empId)) {
    message.innerHTML = "Employee ID must be like EMP-1024.";
    message.style.color = "red";
    return false;
  }

  if (designation === "") {
    message.innerHTML = "Please select a designation.";
    message.style.color = "red";
    return false;
  }

  if (office === "") {
    message.innerHTML = "Please select an office.";
    message.style.color = "red";
    return false;
  }

  if (!phonePattern.test(phone)) {
    message.innerHTML = "Phone must be 11 digits and start with 01.";
    message.style.color = "red";
    return false;
  }

  if (joinDate === "") {
    message.innerHTML = "Date of joining is required.";
    message.style.color = "red";
    return false;
  }

  if (joinDate > getToday()) {
    message.innerHTML = "Date of joining cannot be in the future.";
    message.style.color = "red";
    return false;
  }

  // password optional: khali rakhle current password-i thakbe
  if (password !== "") {
    if (password.length < 5) {
      message.innerHTML = "Password needs at least 5 characters.";
      message.style.color = "red";
      return false;
    }

    if (password === password.toLowerCase()) {
      message.innerHTML = "Password needs an uppercase letter.";
      message.style.color = "red";
      return false;
    }

    if (!specialChar.test(password)) {
      message.innerHTML = "Password needs a special character (! @ # $ % ^ & *).";
      message.style.color = "red";
      return false;
    }
  }

  if (password !== confirm) {
    message.innerHTML = "Password and Confirm Password do not match.";
    message.style.color = "red";
    return false;
  }

  currentAdmin.name = name;
  setBadge();
  message.innerHTML = "Profile saved.";
  message.style.color = "green";
  return false;
}


// ---------- Page load hole ja ja kora lagbe ----------

setBadge();
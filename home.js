

console.log("home.js loaded");   // F12 -> Console-e eta dekhle  bujhbo file ta add hoyeche

let searchBox;
let eventCards;
let categoryCards;

// Card-gulo dekhano/lukano
function showCards(text) {
  let found = 0;

  for (let i = 0; i < eventCards.length; i++) {
    let card = eventCards[i];
    let cardText = card.innerText.toLowerCase();

    if (cardText.indexOf(text.toLowerCase()) === -1) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
      found++;
    }
  }

  // kono event na pele message
  let message = document.getElementById("noEvents");
  if (found === 0) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
}

// 1. Search button / Enter  (form: onsubmit="return searchEvents()")
function searchEvents() {
  showCards(searchBox.value);
  goToEvents();
  return false;      // false: page reload hobe na
}

// event section-e scroll kore, jate result dekha jay
function goToEvents() {
  window.location.href = "#eventGrid";
}

// type korar shomoy (scroll korbe na)
function typeSearch() {
  showCards(searchBox.value);
}

// 2. Category card click
function categoryClick() {
  let category = this.querySelector("h3").innerHTML;
  searchBox.value = category;
  showCards(category);
  goToEvents();
}

// Page load hole eta cholbe
function startHome() {
  searchBox = document.querySelector(".search input");
  eventCards = document.querySelectorAll(".event-card");
  categoryCards = document.querySelectorAll(".category-card");

  // "No events found" message element
  let message = document.createElement("p");
  message.id = "noEvents";
  message.innerHTML = "No events found.";
  message.style.display = "none";
  message.style.color = "red";
  document.querySelector(".event-grid").appendChild(message);

  // event section-er jonno id (scroll korar jonno)
  document.querySelector(".event-grid").id = "eventGrid";

  // Search button 
  document.querySelector(".search").onsubmit = searchEvents;

  // type korar shathe shathe filter
  searchBox.addEventListener("keyup", typeSearch);

  // category card click
  for (let i = 0; i < categoryCards.length; i++) {
    categoryCards[i].addEventListener("click", categoryClick);
  }

  console.log("home.js ready: " + eventCards.length + " events found");
}

window.addEventListener("load", startHome);
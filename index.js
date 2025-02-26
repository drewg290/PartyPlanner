/**
 * @typedef Event
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} imageUrl
 */

// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2412-FTB-ET-WEB"; // Make sure to change this!
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===
let events = [];
let selectedEvent;

/** Updates state with all artists from the API */
async function getEvents() {
  // TODO

  const response = await fetch(API);
  const result = await response.json();
  events = result.data;
  render();
}

/** Updates state with a single artist from the API */

async function getEvent(id) {
  const response = await fetch(`${API}/${id}`);
  const result = await response.json();
  return result.data; // Return the artist data
}

// === Components ===

/** Artist name that shows more details about the artist when clicked */

function EventListItem(event) {
  const $card = document.createElement("li");
  $card.classList.add("event");

  const $link = document.createElement("a");
  $link.href = "#selected";
  $link.textContent = event.name;
  if (selectedEvent && selectedEvent.id === event.id) {
    $link.className = "selected";
  }
  // Add click event listener to fetch and display artist details
  $link.addEventListener("click", async () => {
    selectedEvent = await getEvent(event.id);
    render();
  });

  $card.appendChild($link);
  return $card;
}

/** A list of names of all artists */
function EventList() {
  // TODO
  const $collection = document.createElement("ul");
  $collection.classList.add("lineup");
  const $events = events.map(EventListItem);
  $collection.replaceChildren(...$events);
  return $collection;
}

/** Detailed information about the selected artist */
function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event to learn more.";
    return $p;
  }

  // TODO
  const $card = document.createElement("article");
  $card.classList.add("event");
  $card.innerHTML = `
   <section class="event">
     <h3>${selectedEvent.name}</h3>
<div class = "dataandloc">
  <p > ${selectedEvent.date}</p>
  <p >${selectedEvent.location}</p>
</div>
     <p>${selectedEvent.description}</p>
   
   </section>
  `;
  return $card;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <EventList></EventList>
      </section>
      <section id="selected">
        <h2>Event Details</h2>
        <EventDetails></EventDetails>
      </section>
    </main>
  `;
  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();

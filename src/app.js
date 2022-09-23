let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = `${now.getHours()}`.padStart(2, 0);
let minutes = `${now.getMinutes()}`.padStart(2, 0);
let weekday = weekdays[now.getDay()];

let time = `${hour}:${minutes} ${weekday}`;
document.getElementById("hourday").innerHTML = time;

let date = now.getDate();
let monthnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let month = `${monthnumbers[now.getMonth()]}`.padStart(2, 0);
let year = now.getFullYear();

let numberdate = `${date}/${month}/${year}`;
document.getElementById("numberdate").innerHTML = numberdate;

//Seleccionar los elementos 
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document-getElementById("list");
const input = document.getElementById("input");

//nombre de las clases 
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Enseñar la fecha de hoy
const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


//Seleccionar los elementos 
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//nombre de las clases 
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables 
let LIST, id;
//tener items de localstorage
let data = localStorage.getItem("TODO");

//checar si datos no estan vacios
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    //si no esta vacio
    LIST = [];
    id = 0;
}

//cargar archivos en la interfaz del usuario
function loadList(array) {
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
//limpiar localstorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//Enseñar la fecha de hoy
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("es-MX", options);

// funcion to do
function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }
    const DONE = done ? CHECK: UNCHECK;
    const LINE = done ? LINE_THROUGH: "";
    const item = `
        <li class="item">
            <i class="fa ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}">${toDo}</p>
            <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>
    `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//añadir un item a la lista cuando se presione enter
document.addEventListener("keyup", function(even){
    if (event.keyCode == 13) {
        const toDo = input.value

        // y si esta vacio
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            //agregar items a localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});


//completar lista to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//selecionar los elementos creados dinamicamente 
list.addEventListener("click", function(event){
    const element = event.target; //regresa el elemento clickeado dentro de la lista
    const elementJob = element.attributes.job.value; //completar o eleminar 

    if(elementJob == "complete"){
        completeToDo(element);
    }else if (elementJob == "delete"){
        removeToDo(element);
    }

    //agregar items a localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
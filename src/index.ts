
/*
document.querySelector('#add_btn').addEventListener('click',evt => {
    console.log('click test');
})
*/
/*
interface Todo{
    addTodo: string;
}

let addBtn = document.querySelector('#add_btn');
addBtn.addEventListener('click', function () {
    console.log('testtttttttt');
});
*/

const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("textarea"),
    toDoAddBtn = document.querySelector('#add_btn'),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = [];

function paintToDo(text:string){
    const li = document.createElement("li");
    const comBtn = document.createElement("input");
    const delBtn = document.createElement("input");
    comBtn.setAttribute("type", "button");
    comBtn.setAttribute("value", "✔️");
    delBtn.setAttribute("type", "button");
    delBtn.setAttribute("value", "❌");
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(comBtn);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    //console.log(text);
    const toDoObj = {
        text: text,
        id: toDos.length + 1
    }
}
/*
<li>
<input type="checkbox" id="list01" name="" value="" checked>
<label for="list01">index:0, value:"할일"</label>
</li>
*/

toDoAddBtn.addEventListener("click", function () {
    const currentValue = toDoInput.value; //toDoForm.querySelector("#~")로 했을 때 toDoInput.nodevalue?
    paintToDo(currentValue);
    //console.log("currentValue",currentValue);
    if(currentValue.replace(/^\s/gm, '') !== ""){
        toDoInput.value = "";
    }
});

function loadToDos(){
    const toDos = localStorage.getItem(TODOS_LS);
    if(toDos !== null){
        
    }
}

function clear(){
    toDoInput.value = "";
}

function init(){
    loadToDos();
    clear();
}

init();

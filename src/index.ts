
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

interface TodoObject {
    todo:string;
    id:string;
}

const toDoForm = document.querySelector(".todo-form"),
    toDoInput = toDoForm.querySelector("textarea"),
    toDoAddBtn = document.querySelector('.add-btn'),
    toDoList = document.querySelector(".todo-list");

const TODOS_LS = "toDos";

const toDos:string[] = [];

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text:string){
    const li = document.createElement("li");
    const idx:any = toDos.length + 1;

    const comBtn = document.createElement("button");
    const comImg = document.createElement("img");
    const delBtn = document.createElement("button");
    const delImg = document.createElement("img");
    comBtn.setAttribute("type", "button");
    comImg.setAttribute("src", "./img/bg2.png");
    comBtn.appendChild(comImg);
    delBtn.setAttribute("type", "button");
    delImg.setAttribute("src", "./img/bg2.png");
    delBtn.appendChild(delImg);

    const p = document.createElement("p");
    const span = document.createElement("span");
    p.appendChild(span);
    span.innerText = text;

    const div = document.createElement("div");
    div.setAttribute("class", "li-btn");
    div.appendChild(comBtn);
    div.appendChild(delBtn);
    li.appendChild(p);
    li.appendChild(div);
    li.id = "idx-"+idx;
    toDoList.appendChild(li);

    let toDoObj: TodoObject;

    toDoObj = {
        todo: text,
        id: idx
    };
    toDos.push(toDoObj);
    saveToDos();
}

toDoAddBtn.addEventListener("click", function () {
    const currentValue = toDoInput.value; //toDoForm.querySelector("#~")로 했을 때 toDoInput.nodevalue?
    if(currentValue.replace(/^\s/gm, '') !== ""){
        paintToDo(currentValue);
        toDoInput.value = "";
    }else{
        alert("할 일을 입력하세요");
    }
});

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo:any){
            paintToDo(toDo.text);
        });
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

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
var toDoForm = document.querySelector(".todo-form"), toDoInput = toDoForm.querySelector("textarea"), toDoAddBtn = document.querySelector('.add-btn'), toDoList = document.querySelector(".todo-list");
var TODOS_LS = "toDos";
var toDos = [];
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function paintToDo(text) {
    var li = document.createElement("li");
    var idx = toDos.length + 1;
    var comBtn = document.createElement("button");
    var comImg = document.createElement("img");
    var delBtn = document.createElement("button");
    var delImg = document.createElement("img");
    comBtn.setAttribute("type", "button");
    comImg.setAttribute("src", "./img/bg2.png");
    comBtn.appendChild(comImg);
    delBtn.setAttribute("type", "button");
    delImg.setAttribute("src", "./img/bg2.png");
    delBtn.appendChild(delImg);
    var p = document.createElement("p");
    var span = document.createElement("span");
    p.appendChild(span);
    span.innerText = text;
    var div = document.createElement("div");
    div.setAttribute("class", "li-btn");
    div.appendChild(comBtn);
    div.appendChild(delBtn);
    li.appendChild(p);
    li.appendChild(div);
    li.id = "idx-" + idx;
    toDoList.appendChild(li);
    var toDoObj;
    toDoObj = {
        todo: text,
        id: idx
    };
    toDos.push(toDoObj);
    saveToDos();
}
toDoAddBtn.addEventListener("click", function () {
    var currentValue = toDoInput.value; //toDoForm.querySelector("#~")로 했을 때 toDoInput.nodevalue?
    if (currentValue.replace(/^\s/gm, '') !== "") {
        paintToDo(currentValue);
        toDoInput.value = "";
    }
    else {
        alert("할 일을 입력하세요");
    }
});
function loadToDos() {
    var loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        var parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}
function clear() {
    toDoInput.value = "";
}
function init() {
    loadToDos();
    clear();
}
init();
//# sourceMappingURL=index.js.map
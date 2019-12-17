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
var toDoForm = document.querySelector(".js-toDoForm"), toDoInput = toDoForm.querySelector("textarea"), toDoAddBtn = document.querySelector('#add_btn'), toDoList = document.querySelector(".js-toDoList");
var TODOS_LS = "toDos";
function paintToDo(text) {
    var li = document.createElement("li");
    var comBtn = document.createElement("input");
    var delBtn = document.createElement("input");
    comBtn.setAttribute("type", "button");
    comBtn.setAttribute("value", "✔️");
    delBtn.setAttribute("type", "button");
    delBtn.setAttribute("value", "❌");
    var span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(comBtn);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    //console.log(text);
}
/*
<li>
<input type="checkbox" id="list01" name="" value="" checked>
<label for="list01">index:0, value:"할일"</label>
</li>
*/
toDoAddBtn.addEventListener("click", function () {
    var currentValue = toDoInput.value; //toDoForm.querySelector("#~")로 했을 때 toDoInput.nodevalue?
    paintToDo(currentValue);
    //console.log("currentValue",currentValue);
    if (currentValue.replace(/^\s/gm, '') !== "") {
        toDoInput.value = "";
    }
});
function loadToDos() {
    var toDos = localStorage.getItem(TODOS_LS);
    if (toDos !== null) {
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
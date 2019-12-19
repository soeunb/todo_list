var today = new Date();
var week = new Array('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');
var month = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
var todayText = document.querySelector(".today-text");
todayText.innerHTML = week[today.getDay()] + ", " + today.getDate() + " " + month[today.getMonth()];
var toDoForm = document.querySelector(".todo-form"), toDoInput = toDoForm.querySelector("textarea"), toDoAddBtn = document.querySelector(".add-btn"), toDoList = document.querySelector(".todo-list");
var TODO_STORAGE = "todo";
var todos = [];
function saveTodo() {
    localStorage.setItem(TODO_STORAGE, JSON.stringify(todos));
}
function addTodo(text) {
    var li = document.createElement("li");
    var idx = todos.length + 1;
    var comBtn = document.createElement("button");
    var comImg = document.createElement("img");
    var delBtn = document.createElement("button");
    var delImg = document.createElement("img");
    comBtn.setAttribute("type", "button");
    comBtn.setAttribute("class", "com-btn");
    comImg.setAttribute("src", "./img/img.png");
    comBtn.appendChild(comImg);
    delBtn.setAttribute("type", "button");
    delBtn.setAttribute("class", "del-btn");
    delImg.setAttribute("src", "./img/img2.png");
    delBtn.appendChild(delImg);
    delBtn.addEventListener("click", deleteTodo);
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
    li.id = idx;
    toDoList.appendChild(li);
    var todoObj = {
        text: text,
        idx: idx
    };
    todos.push(todoObj);
    saveTodo();
}
function deleteTodo(event) {
    var btn = event.target;
    var li = btn.parentNode.parentNode.parentNode;
    toDoList.removeChild(li);
    // filter - foreach
    var reDelTodo = todos.filter(function (todo) {
        console.log(deleteTodo);
        return todo.idx !== parseInt(li.id);
    });
    todos = reDelTodo;
    saveTodo();
}
toDoAddBtn.addEventListener("click", function () {
    var currentValue = toDoInput.value; //toDoForm.querySelector("#~")로 했을 때 toDoInput.nodevalue?
    if (currentValue.replace(/^\s/gm, '') !== "") {
        addTodo(currentValue);
        toDoInput.value = "";
    }
    else {
        alert("할 일을 입력하세요");
    }
});
function loadTodo() {
    var storedTodo = localStorage.getItem(TODO_STORAGE);
    if (storedTodo !== null) {
        var parsedTodo = JSON.parse(storedTodo);
        parsedTodo.forEach(function (todo) {
            addTodo(todo.text);
        });
    }
}
function clear() {
    toDoInput.value = "";
}
function init() {
    loadTodo();
    clear();
}
init();
//# sourceMappingURL=index.js.map
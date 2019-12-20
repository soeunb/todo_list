var todayText = document.querySelector(".today-text");
function time() {
    var today = new Date();
    var week = new Array('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');
    var month = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    todayText.innerHTML = week[today.getDay()] + ", " + today.getDate() + " " + month[today.getMonth()];
    todayText.setAttribute("data-cur-time", today.toString());
    setTimeout("time()", 1000);
}
window.onload = function () {
    time();
};
var toDoForm = document.querySelector(".todo-form"), toDoInput = toDoForm.querySelector("textarea"), toDoAddBtn = document.querySelector(".add-btn"), toDoList = document.querySelector(".todo-list");
var TODO_STORAGE = "todo";
var todos = [];
function re() {
}
function saveTodo() {
    localStorage.setItem(TODO_STORAGE, JSON.stringify(todos));
}
function addTodo(text, curTime) {
    var li = document.createElement("li");
    var idx = todos.length + 1;
    var comBtn = document.createElement("button");
    var comImg = document.createElement("img");
    /*
    const delBtn = document.createElement("button");
    const delImg = document.createElement("img");
    */
    comBtn.setAttribute("type", "button");
    comBtn.setAttribute("class", "com-btn");
    comImg.setAttribute("src", "./img/c_btn.png");
    comBtn.appendChild(comImg);
    /*
    delBtn.setAttribute("type", "button");
    delBtn.setAttribute("class", "del-btn");
    delImg.setAttribute("src", "./img/x_btn.png");
    delBtn.appendChild(delImg);
    delBtn.addEventListener("click", deleteTodo);
    */
    var p = document.createElement("p");
    var span = document.createElement("span");
    var spanTime = document.createElement("span");
    spanTime.setAttribute("class", "li-time");
    p.appendChild(span);
    p.appendChild(spanTime);
    span.innerText = text;
    spanTime.innerText = "(" + todayText.getAttribute("data-cur-time").split(" GMT")[0] + ")";
    var div = document.createElement("div");
    div.setAttribute("class", "li-btn");
    div.appendChild(comBtn);
    //div.appendChild(delBtn);
    li.appendChild(p);
    li.appendChild(div);
    li.id = idx;
    toDoList.appendChild(li);
    var todoObj = {
        text: text,
        idx: idx,
        curTime: curTime
    };
    console.log(curTime);
    todos.push(todoObj);
    saveTodo();
}
function deleteTodo(event) {
    var btn = event.target;
    var li = btn.parentNode.parentNode.parentNode;
    toDoList.removeChild(li);
    // filter - foreach
    var reDelTodo = todos.filter(function (todo) {
        return todo.idx !== parseInt(li.id);
    });
    todos = reDelTodo;
    saveTodo();
}
// 추가 버튼 클릭 시
toDoAddBtn.addEventListener("click", function () {
    var inputVal = toDoInput.value; //toDoForm.querySelector("#~")로 했을 때 toDoInput.nodevalue?
    var curTime = todayText.getAttribute("data-cur-time");
    if (inputVal.replace(/^\s/gm, '') !== "") {
        addTodo(inputVal, curTime);
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
            //const loadCurTime = todo.curTime.toUTCString();          
            addTodo(todo.text, todo.curTime);
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
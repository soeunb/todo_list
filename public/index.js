var todayText = document.querySelector(".today-text");
function time() {
    var today = new Date();
    var week = new Array('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');
    var month = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    todayText.innerHTML = week[today.getDay()] + ", " + today.getDate() + " " + month[today.getMonth()];
    todayText.setAttribute("data-cur-time", today.toString());
    setTimeout("time()", 3000);
}
window.onload = function () {
    time();
};
var toDoForm = document.querySelector(".todo-form"), toDoInput = toDoForm.querySelector("textarea"), toDoAddBtn = document.querySelector(".add-btn"), toDoList = document.querySelector(".todo-list");
var TODO_STORAGE = "todo";
var todos = [];
function saveTodo() {
    localStorage.setItem(TODO_STORAGE, JSON.stringify(todos));
}
function drawTodo(text, curTime, finYN) {
    var li = document.createElement("li");
    var idx = todos.length + 1;
    var finBtn = document.createElement("button");
    var finImg = document.createElement("img");
    var delBtn = document.createElement("button");
    var delImg = document.createElement("img");
    finBtn.setAttribute("type", "button");
    finBtn.setAttribute("class", "fin-btn");
    finImg.setAttribute("src", "./img/f_btn.png");
    finBtn.appendChild(finImg);
    finBtn.addEventListener("click", finTodo);
    delBtn.setAttribute("type", "button");
    delBtn.setAttribute("class", "del-btn");
    delImg.setAttribute("src", "./img/x_btn.png");
    delBtn.appendChild(delImg);
    delBtn.addEventListener("click", delTodo);
    var p = document.createElement("p");
    var span = document.createElement("span");
    var spanTime = document.createElement("span");
    spanTime.setAttribute("class", "li-time");
    p.appendChild(span);
    p.appendChild(spanTime);
    span.innerText = text;
    if (spanTime) {
        spanTime.innerText = "(" + curTime.split(" GMT")[0] + ")";
    }
    var div = document.createElement("div");
    div.setAttribute("class", "li-btn");
    div.appendChild(finBtn);
    div.appendChild(delBtn);
    li.appendChild(p);
    li.appendChild(div);
    li.id = idx;
    if (finYN === "Y") {
        li.className = "fin-y";
    }
    else {
        delBtn.style.visibility = "hidden";
    }
    toDoList.appendChild(li);
    var todoObj = {
        text: text,
        idx: idx,
        curTime: curTime,
        finYN: finYN
    };
    todos.push(todoObj);
    saveTodo();
}
// 삭제 버튼 클릭 시
function delTodo(event) {
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
function addTodo() {
    var inputVal = toDoInput.value; //toDoForm.querySelector("#~")로 했을 때 toDoInput.nodevalue?
    var curTime = todayText.getAttribute("data-cur-time");
    var finYN = "";
    if (inputVal.replace(/^\s/gm, '') !== "") {
        drawTodo(inputVal, curTime, finYN);
        toDoInput.value = "";
    }
    else {
        alert("할 일을 입력하세요");
    }
}
// 완료 버튼 클릭 시
function finTodo(event) {
    var btn = event.target;
    var li = btn.parentNode.parentNode.parentNode;
    var localFin = localStorage.getItem(TODO_STORAGE);
    var parsedTodo = JSON.parse(localFin);
    parsedTodo.forEach(function (todo) {
        if (todo.idx == li.id) {
            if (parsedTodo[todo.idx - 1]["finYN"] === "Y") {
                // 완료 -> 미완료
                parsedTodo[todo.idx - 1]["finYN"] = "N";
                localStorage.setItem(TODO_STORAGE, JSON.stringify(parsedTodo));
                li.classList.remove("fin-y");
                li.querySelector(".del-btn").style.visibility = "hidden";
            }
            else {
                // 미완료 -> 완료
                parsedTodo[todo.idx - 1]["finYN"] = "Y";
                localStorage.setItem(TODO_STORAGE, JSON.stringify(parsedTodo));
                li.className = "fin-y";
                li.querySelector(".del-btn").style.visibility = "";
            }
        }
    });
}
function loadTodo() {
    var storedTodo = localStorage.getItem(TODO_STORAGE);
    var parsedTodo = JSON.parse(storedTodo);
    if (storedTodo !== null) {
        parsedTodo.forEach(function (todo) {
            if (parsedTodo[todo.idx - 1]["finYN"] === "Y") {
                todo.finYN = "Y";
            }
            else {
                todo.finYN = "N";
            }
            drawTodo(todo.text, todo.curTime, todo.finYN);
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
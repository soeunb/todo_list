var todayText = document.querySelector(".today-text");
function time() {
    var today = new Date();
    var week = new Array("sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday");
    var month = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    todayText.innerHTML = week[today.getDay()] + ", " + today.getDate() + " " + month[today.getMonth()];
    todayText.setAttribute("data-cur-time", today.toString());
    setTimeout("time()", 2000);
}
function clear() {
    toDoInput.value = "";
}
function init() {
    loadTodo();
    time();
    clear();
}
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
    var undoBtn = document.createElement("button");
    var undoImg = document.createElement("img");
    finBtn.setAttribute("type", "button");
    finBtn.setAttribute("class", "fin-btn");
    finImg.setAttribute("src", "../src/img/fin_btn.png");
    finBtn.appendChild(finImg);
    finBtn.addEventListener("click", changeTodo);
    delBtn.setAttribute("type", "button");
    delBtn.setAttribute("class", "del-btn");
    delImg.setAttribute("src", "../src/img/del_btn.png");
    delBtn.appendChild(delImg);
    delBtn.addEventListener("click", delTodo);
    undoBtn.setAttribute("type", "button");
    undoBtn.setAttribute("class", "undo-btn");
    undoImg.setAttribute("src", "../src/img/undo_btn.png");
    undoBtn.appendChild(undoImg);
    undoBtn.addEventListener("click", changeTodo);
    var p = document.createElement("p");
    var span = document.createElement("span");
    var spanTime = document.createElement("span");
    spanTime.setAttribute("class", "li-time");
    p.appendChild(span);
    p.appendChild(spanTime);
    span.innerText = text;
    if (curTime !== undefined) {
        spanTime.innerText = "(" + curTime.split(" GMT")[0] + ")";
    }
    var div = document.createElement("div");
    div.setAttribute("class", "li-btn");
    div.appendChild(finBtn);
    div.appendChild(delBtn);
    div.appendChild(undoBtn);
    li.appendChild(p);
    li.appendChild(div);
    li.id = idx;
    if (finYN === "Y") {
        li.className = "fin-y";
        finBtn.style.display = "none";
    }
    else if (finYN === "N") {
        delBtn.style.display = "none";
        undoBtn.style.display = "none";
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
// delBtn 클릭 시
function delTodo(event) {
    var btn = event.target;
    var li = btn.parentNode.parentNode.parentNode;
    toDoList.removeChild(li);
    var reDelTodo = todos.filter(function (todo) {
        return todo.idx !== parseInt(li.id);
    });
    todos = reDelTodo;
    saveTodo();
}
// addBtn 클릭 시
function addTodo() {
    var inputVal = toDoInput.value;
    var curTime = todayText.getAttribute("data-cur-time");
    var finYN = "N";
    if (inputVal.replace(/^\s/gm, '') !== "") {
        drawTodo(inputVal, curTime, finYN);
        toDoInput.value = "";
    }
    else {
        alert("할 일을 입력하세요");
    }
}
// finBtn or undoBtn 클릭 시
function changeTodo(event) {
    var btn = event.target;
    var li = btn.parentNode.parentNode.parentNode;
    var localFin = localStorage.getItem(TODO_STORAGE);
    var parsedTodo = JSON.parse(localFin);
    parsedTodo.forEach(function (todo) {
        if (todo.idx === parseInt(li.id)) {
            if (parsedTodo[todo.idx - 1]["finYN"] === "Y") {
                // 완료 -> 미완료
                parsedTodo[todo.idx - 1]["finYN"] = "N";
                localStorage.setItem(TODO_STORAGE, JSON.stringify(parsedTodo));
                li.classList.remove("fin-y");
                li.querySelector(".fin-btn").style.display = "block";
                li.querySelector(".del-btn").style.display = "none";
                li.querySelector(".undo-btn").style.display = "none";
            }
            else if (parsedTodo[todo.idx - 1]["finYN"] === "N") {
                // 미완료 -> 완료
                parsedTodo[todo.idx - 1]["finYN"] = "Y";
                localStorage.setItem(TODO_STORAGE, JSON.stringify(parsedTodo));
                li.className = "fin-y";
                li.querySelector(".fin-btn").style.display = "none";
                li.querySelector(".del-btn").style.display = "block";
                li.querySelector(".undo-btn").style.display = "block";
            }
        }
    });
}
function loadTodo() {
    var storedTodo = localStorage.getItem(TODO_STORAGE);
    if (storedTodo !== null) {
        var parsedTodo_1 = JSON.parse(storedTodo);
        parsedTodo_1.forEach(function (todo) {
            if (parsedTodo_1[todo.idx - 1]["finYN"] === "N") {
                todo.finYN = "N";
            }
            else if (parsedTodo_1[todo.idx - 1]["finYN"] === "Y") {
                todo.finYN = "Y";
            }
            drawTodo(todo.text, todo.curTime, todo.finYN);
        });
    }
}
/*
function sortTodo() {
    const storedTodo = localStorage.getItem(TODO_STORAGE);
    const parsedTodo = JSON.parse(storedTodo);
    parsedTodo.sort(function(sort1:any, sort2:any) {
        if (sort1.finYN === "Y") {
            if (sort2.finYN === "Y") {
                return 0;
            }else{
                return -1;
            }
        } else {
            if (sort2.finYN === "Y"){
                if (sort2.finYN === "Y") {
                    return 1;
                }else{
                    return 0;
                }
            }
        }
    });
}
*/
init();
//# sourceMappingURL=index.js.map
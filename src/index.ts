const todayText = document.querySelector(".today-text");

function time(){
    const today = new Date();
    const week = new Array('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');
    const month = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    todayText.innerHTML = week[today.getDay()] + ", " + today.getDate() + " " + month[today.getMonth()];
    todayText.setAttribute("data-cur-time",today.toString());
    setTimeout("time()", 3000);
}

window.onload = function(){
    time();
}

interface TodoObject {
    todoText: string;
    todoIdx: any;
}

const toDoForm = document.querySelector(".todo-form"),
    toDoInput = toDoForm.querySelector("textarea"),
    toDoAddBtn = document.querySelector(".add-btn"),
    toDoList = document.querySelector(".todo-list");

const TODO_STORAGE = "todo";

let todos:any[] = [];

function saveTodo(){
    localStorage.setItem(TODO_STORAGE, JSON.stringify(todos));	
}

function drawTodo(text:string, curTime:any, finYN:string){
    const li = document.createElement("li");
    const idx:any = todos.length + 1;
    const finBtn = document.createElement("button");
    const finImg = document.createElement("img");

    const delBtn = document.createElement("button");
    const delImg = document.createElement("img");

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

    const p = document.createElement("p");
    const span = document.createElement("span");
    const spanTime = document.createElement("span");
    spanTime.setAttribute("class", "li-time");
    p.appendChild(span);
    p.appendChild(spanTime);
    span.innerText = text;
    if(spanTime){
        spanTime.innerText = "(" + curTime.split(" GMT")[0] + ")";
    }
    const div = document.createElement("div");
    div.setAttribute("class", "li-btn");
    div.appendChild(finBtn);
    div.appendChild(delBtn);
    li.appendChild(p);
    li.appendChild(div);
    li.id = idx;
    if(finYN === "Y") {
        li.className = "fin-y";
    }else{
        delBtn.style.visibility = "hidden";
    }
    toDoList.appendChild(li);

    const todoObj = {
        text: text,
        idx: idx,
        curTime : curTime,
        finYN : finYN
    };
    todos.push(todoObj);
    saveTodo();
}

// 삭제 버튼 클릭 시
function delTodo(event:any){
    const btn = event.target;
    const li = btn.parentNode.parentNode.parentNode;
    toDoList.removeChild(li);
    // filter - foreach
    const reDelTodo = todos.filter(function(todo){
        return todo.idx !== parseInt(li.id);
    });
    todos = reDelTodo;
    saveTodo();
}

// 추가 버튼 클릭 시
function addTodo(){
    const inputVal = toDoInput.value; //toDoForm.querySelector("#~")로 했을 때 toDoInput.nodevalue?
    const curTime = todayText.getAttribute("data-cur-time");
    const finYN = "";
    if(inputVal.replace(/^\s/gm, '') !== ""){
        drawTodo(inputVal, curTime, finYN);
        toDoInput.value = "";
    }else{
        alert("할 일을 입력하세요");
    }
}

// 완료 버튼 클릭 시
function finTodo(event:any){
    const btn = event.target;
    const li = btn.parentNode.parentNode.parentNode;
    const localFin = localStorage.getItem(TODO_STORAGE);
    const parsedTodo = JSON.parse(localFin);
   
    parsedTodo.forEach(function(todo:any){
        if(todo.idx == li.id){ 
            if(parsedTodo[todo.idx-1]["finYN"] === "Y"){
                // 완료 -> 미완료
                parsedTodo[todo.idx-1]["finYN"] = "N";
                localStorage.setItem(TODO_STORAGE, JSON.stringify(parsedTodo));
                li.classList.remove("fin-y");
                li.querySelector(".del-btn").style.visibility = "hidden";
            }else{
                // 미완료 -> 완료
                parsedTodo[todo.idx-1]["finYN"] = "Y";
                localStorage.setItem(TODO_STORAGE, JSON.stringify(parsedTodo));
                li.className="fin-y"
                li.querySelector(".del-btn").style.visibility = "";
            }
        }
    });
}

function loadTodo(){
    const storedTodo = localStorage.getItem(TODO_STORAGE);
    const parsedTodo = JSON.parse(storedTodo);

    if(storedTodo !== null){
        parsedTodo.forEach(function(todo:any){
            if(parsedTodo[todo.idx-1]["finYN"] === "Y"){
                todo.finYN = "Y";
            }else{
                todo.finYN = "N";
            }
            drawTodo(todo.text, todo.curTime, todo.finYN);
        });
    }
}

function clear(){
    toDoInput.value = "";
}

function init(){
    loadTodo();
    clear();
}

init();
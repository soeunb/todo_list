const todayText = document.querySelector(".today-text");

function time(){
    const today = new Date();
    const week = new Array('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');
    const month = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    todayText.innerHTML = week[today.getDay()] + ", " + today.getDate() + " " + month[today.getMonth()];
    todayText.setAttribute("data-cur-time",today.toString());
    setTimeout("time()", 1000);
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

function re(){
    
}

function saveTodo(){
    localStorage.setItem(TODO_STORAGE, JSON.stringify(todos));
}

function addTodo(text:string, curTime:any){
    const li = document.createElement("li");
    const idx:any = todos.length + 1;
    const comBtn = document.createElement("button");
    const comImg = document.createElement("img");
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
    const p = document.createElement("p");
    const span = document.createElement("span");
    const spanTime = document.createElement("span");
    spanTime.setAttribute("class", "li-time");
    p.appendChild(span);
    p.appendChild(spanTime);
    span.innerText = text;
    spanTime.innerText = "("+todayText.getAttribute("data-cur-time").split(" GMT")[0]+")";
    const div = document.createElement("div");
    div.setAttribute("class", "li-btn");
    div.appendChild(comBtn);
    //div.appendChild(delBtn);
    li.appendChild(p);
    li.appendChild(div);
    li.id = idx;
    toDoList.appendChild(li);

    const todoObj = {
        text: text,
        idx: idx,
        curTime : curTime
    };
    console.log(curTime);
    todos.push(todoObj);
    saveTodo();
}

function deleteTodo(event:any){
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
toDoAddBtn.addEventListener("click", function () {
    const inputVal = toDoInput.value; //toDoForm.querySelector("#~")로 했을 때 toDoInput.nodevalue?
    const curTime = todayText.getAttribute("data-cur-time");
    if(inputVal.replace(/^\s/gm, '') !== ""){
        addTodo(inputVal, curTime);
        toDoInput.value = "";
    }else{
        alert("할 일을 입력하세요");
    }
});

function loadTodo(){
    const storedTodo = localStorage.getItem(TODO_STORAGE);
    if(storedTodo !== null){
        const parsedTodo = JSON.parse(storedTodo);
        parsedTodo.forEach(function(todo:any){
            //const loadCurTime = todo.curTime.toUTCString();          
            addTodo(todo.text, todo.curTime);
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
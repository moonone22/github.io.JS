const toDoform = document.getElementById("todo-form")
const toDoinput = document.querySelector("#todo-form input")
const toDoList = document.getElementById("todo-list")
let toDos = []
const TODS_KEY = "todos"
const savelocalstorage = localStorage.getItem(TODS_KEY)




//function
function handleToDoSubmit (event) {
    event.preventDefault();
    const newTodo = toDoinput.value
    toDoinput.value = ""
    //input 값을 newTodo에 저장하고  공백으로 만들기
    const newTodoObj = {
        text : newTodo,
        id : Date.now(),
    }
    
    toDos.push(newTodoObj)
    //저장한 input 값을 배열안에 저장 
    
    
    paintToDo(newTodoObj);
    saveToDos();
    
    
    
}

function paintToDo(newTodo){
    const li = document.createElement('li')
    //엘리먼트에 id 넣어주기
    li.id = newTodo.id;
    const span = document.createElement('span')
    const button = document.createElement('button')
    const time =document.createElement('h2')
    time.innerText = `${new Date().getFullYear()}년${new Date().getMonth()+1}월${new Date().getDate()}일`;
    span.innerText = newTodo.text;
    button.innerText = "❌"
    button.addEventListener('click',deletToDo);
    
    li.append(span);
    li.append(button);
    button.append(time);
    toDoList.append(li);

    
}

function deletToDo(event){
    //li=button 의 부모요소 
    const li = event.target.parentElement
    //li 삭제 (삭제하기전에 ID를 알수있다.)
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id))
    
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODS_KEY,JSON.stringify(toDos))
}





toDoform.addEventListener('submit',handleToDoSubmit)

if(savelocalstorage !== null){
    const parsedToDos = JSON.parse(savelocalstorage);
    console.log(parsedToDos);
    parsedToDos.forEach(paintToDo);
    toDos = parsedToDos;
}
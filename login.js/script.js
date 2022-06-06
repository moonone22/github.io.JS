const loginForm = document.querySelector("#login-form");
const loginBox =  document.querySelector("#login_Box");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const LOG_OUT = document.getElementById("LOG_OUT");
const log_out = document.getElementById("log_out");


const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
const saveUserName = localStorage.getItem(USERNAME_KEY);

function onLoginSUbmit(event){
    event.preventDefault();
   
    loginBox.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY,username);
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerText = `hello ${username}`;
    LOG_OUT.classList.remove(HIDDEN_CLASSNAME);
    
 
}
function LOGOUT(){
    
    //전체 항목 제거 
    localStorage.clear();
    //항목제거 
    //localStorage.removeItme('key');
    window.location.reload();
    
}

loginForm.addEventListener("submit", onLoginSUbmit);

LOG_OUT.addEventListener("click",LOGOUT);
log_out.addEventListener("click",LOGOUT);

if(saveUserName === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSUbmit);
    
    
}else{
    loginBox.classList.add(HIDDEN_CLASSNAME);
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerText = `hello ${saveUserName}`;
    LOG_OUT.addEventListener("click",LOGOUT);
    LOG_OUT.classList.remove(HIDDEN_CLASSNAME);
}
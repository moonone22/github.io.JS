
// DOM
const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector('.game-text')
const scoreDisplay = document.querySelector('.score')
const restartButton = document.querySelector('.game-text > button')
const startGame = document.querySelector('.startgame')
const startButton = document.querySelector('.startgame > button')


// Setting 
const GAME_ROWS = 20;
const GAME_COLS = 10;
const BLOCKS = {
    tree:[
        [[2,1],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[2,1],[1,1]],
        [[2,1],[1,2],[1,0],[1,1]],
    ],
    square:[
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
    ],
    bar:[
        [[1,0],[2,0],[3,0],[4,0]],
        [[2,-1],[2,0],[2,1],[2,2]],
        [[1,0],[2,0],[3,0],[4,0]],
        [[2,-1],[2,0],[2,1],[2,2]],
    ],
    zee:[
        [[0,0],[1,0],[1,1],[2,1]],
        [[0,1],[1,0],[1,1],[0,2]],
        [[0,1],[1,1],[1,2],[2,2]],
        [[2,0],[2,1],[1,1],[1,2]],
    ],
    elLeft:[
        [[0,0],[0,1],[1,1],[2,1]],
        [[1,0],[1,1],[1,2],[0,2]],
        [[0,1],[1,1],[2,1],[2,2]],
        [[1,0],[2,0],[1,1],[1,2]],
    ],
    elRight:[
        [[1,0],[2,0],[1,1],[1,2]],
        [[0,0],[0,1],[1,1],[2,1]],
        [[0,2],[1,0],[1,1],[1,2]],
        [[0,1],[1,1],[2,1],[2,2]],
    ],
    
}

//variables
let score = 0;
let duration = 500;
let downInterval;
let tmepMovingItem;


const movingItem = {
    type: "tree",
    direction:0 ,
    top: 0,
    left: 3,
}

//시작화면
init();


//function


function init(){
   
    tmepMovingItem = { ...movingItem };
    for (let i = 0; i < GAME_ROWS; i++){
        prependNewLine()
    }
    
}

//ul안에 20개 행과 각 행마다 10개열 만들어 주기 
function prependNewLine(){
        const li = document.createElement("li");
        const ul = document.createElement("ul");
            for(let j=0; j<10; j++){
                const matrix = document.createElement("li");
                ul.prepend(matrix);
            }
            li.prepend(ul)
            playground.prepend(li);
    }

function renderBlocks(movetype = "") { 
    const {type, direction, top, left} = tmepMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    })

    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
 //const xxx = 조건 ? 참일경우 : 거짓일경우
        
        const isAvailable = checkEmpty(target);

        if (isAvailable) {
            target.classList.add(type, "moving")
            //target 값이 있다면 클래스를 추가
        } else {
            tmepMovingItem = { ...movingItem }
            if(movetype === 'retry'){
                clearInterval(downInterval);
                showGameoverText()
            }
            setTimeout(() => {
              renderBlocks('retry');
              if(movetype === "top"){
                seizeBlock()
            }
            },0)
            //target 값이 null 일때는 ...movigitem값을 다시 넣음 setTimeout을 써서 무한반복을 막음 
            
            return true;
            //forEach 반복문은 break 시킬수 없기 때문에 
            //some 사용해서 원하는 시점에 반복문을 중지시킨다 
            //현재 setTimeout으로 무한반복이 되지는 않지만 
            //이렇게 하는것이 더 효율적이다
        }
    })
    //저장 
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;  
   
}

function showGameoverText(){
    gameText.style.display = "flex"
}

function seizeBlock(){
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    })
    checkMatch()
   
}

//한줄 전체가 seized인줄 없애기  
function checkMatch(){

    const childNodes = playground.childNodes;
    childNodes.forEach(child => {
        let matched = true;
        child.children[0].childNodes.forEach(li=>{
            //li의 라인중에서 seized클래스가 없는곳 찾기
            if(!li.classList.contains("seized")){
                matched = false;
            }
            
        })
        //만약 seized클래스가 없는곳을 찾았다면
        if(matched){
            child.remove();
            //child = li라인 하나 전체를 말함 
            prependNewLine()
            score++;
            scoreDisplay.innerText = score;
        }
    });


    generateNewBlock()
}

// 새블럭 생성
function generateNewBlock(){
    clearInterval(downInterval);
    downInterval = setInterval(() => {
        moveBlock('top',1)
    }, duration);
    const blockArray = Object.entries(BLOCKS);
    // Object.entries 는 객체안에 갯수를 구하기위해씀 
    const randomIndex = Math.floor(Math.random() * blockArray.length)

    movingItem.type = blockArray[randomIndex][0];
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tmepMovingItem = { ...movingItem};
    renderBlocks();
}


function checkEmpty(target){
    if(!target || target.classList.contains("seized")){
        return false;
        //target 값이 null일때 
    }
    return true;
}

function moveBlock(movetype, amount){
    tmepMovingItem[movetype] += amount;
    renderBlocks(movetype)
}


function chageDirection(){
    const direction = tmepMovingItem.direction;
    direction === 3 ? tmepMovingItem.direction = 0 : tmepMovingItem.direction += 1; 

    //if(tmepMovingItem.direction === 3){
       // tmepMovingItem.direction = 0;
    //}
    renderBlocks();
}

function dropBlock(){
    clearInterval(downInterval);
    downInterval = setInterval(() => {
        moveBlock("top",1)
    }, 10);
}

// event handling



restartButton.addEventListener("click",() =>{
    playground.innerHTML = "";
    gameText.style.display = "none";
    //버튼 누르면 다시 0점 만들기
    score = 0;
    scoreDisplay.innerText = score;
    generateNewBlock()
    init()
})

startButton.addEventListener("click",() =>{
    startGame.className="hidden";
    generateNewBlock()
    
    //시작버튼을 눌렀을때 keydown 명령이 작동한다 
    document.addEventListener("keydown", e =>{
        switch(e.keyCode){
            case 39:
                moveBlock("left", 1);
                break;
            case 37:
                moveBlock("left", -1)
                break //break가 없을시 밑에도 같이 실행됨
            case 40:
                moveBlock("top", 1)
                break
            case 38:
                chageDirection();
                break
             case 32:
                dropBlock();
                break
            default:
                break;
        }
    })
})

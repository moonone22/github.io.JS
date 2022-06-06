//li 배열로 가져오기
const SlideIMG = document.querySelectorAll('.SlideIMG')

const SHOWPAGE = document.querySelector('.SHOWPAGE')



//배열 0은 0% 1은 -100% -2는 -200% 이런식으로 주기
//반복문이용
for(i=0 ; i < SlideIMG.length ; i++){
    //현재 i는 0~5까지 반복되는 상황
    
    leftprice = i * 100 + "%";
    
    SlideIMG[i].style.left = i * 100 + "%";

    const span = document.createElement('span')
    SHOWPAGE.appendChild(span)
    span.innerText = i;
}

//document.querySelectorAll('span')로 했을시 문서전체에서 찾기 때문에
//다른 span에 querySelectorAll될수있기때문에
//SHOWPAGE.querySelectorAll('span') 이렇게 설정하니 정확하게 원하는 div의 안에 span을 찾아갔다.
let SpanBUTTON = SHOWPAGE.querySelectorAll('span')

for(a=0; a < SpanBUTTON.length ; a++){

    function MovePage(e){
    let PAGENUM = e.target.innerText;
    GOTOPAGE(PAGENUM);
 }
 SpanBUTTON[a].addEventListener('click', MovePage)
 }
 

 function GOTOPAGE(addc){
    SlideSmallBox.style.left = -100 * addc + '%';

    for(i=0; i<SpanBUTTON.length; i++){
    SpanBUTTON[i].classList.remove("active");
    }
    SpanBUTTON[addc].classList.add("active");
    console.log(SpanBUTTON[addc]);
    console.log(SpanBUTTON[addc].length);
 } 
 
 

 







let Slideprev = document.getElementById('Slideprev')
let Slidenext = document.getElementById('Slidenext')
let SlideSmallBox = document.querySelector('.SlideSmallBox')

//왼쪽 오른쪽 버튼 누를때 SlideSmallBox left 값 변경시키기

let currenIdex = 0

function moveprev(){

    if(currenIdex == 0){
    SlideSmallBox.style.left = 0 + "%";
    }else{
    currenIdex = currenIdex-1
    GOTOPAGE(currenIdex);
    }
    
}

Slideprev.addEventListener('click',moveprev)

function movenext(){
    if(currenIdex == SlideIMG.length-1){
    SlideSmallBox.style.left = -(SlideIMG.length-1) * 100 + "%";
    }else{
    currenIdex = currenIdex+1
    GOTOPAGE(currenIdex);
    }
    
}

Slidenext.addEventListener('click',movenext)

GOTOPAGE(0);
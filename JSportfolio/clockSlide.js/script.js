
const slide = document.querySelectorAll('.slide')
let slideHeight = 0
let slideWidht = 0
const slideCount = slide.length
const container = document.querySelector(".container")
const slide_contiainer = document.querySelector(".slide_contiainer")




for(let a=0 ; a < slideCount ; a++){
    slide[a].style.left = a * 100 + "%";
}





for(let i=0 ; i < slideCount ; i++){
    if(slideHeight < slide[i].offsetHeight ){
        slideHeight = slide[i].offsetHeight;
    }
    
}

console.log(slideWidht);

container.style.height = slideHeight + 'px';
slide_contiainer.style.height = slideHeight + 'px';



//현재 슬라이드는 absolute인 상태이기 때문에 부모영역의 높이갚이 잡히지 않는다
//그래서 slide중에서 가장 높은 높이값을 부모영역 에게 주도록하자 
//현재 부모영역에는 
//container 
//slide_contiainer 영역 두개가 있다 둘다 높이값을 줘야한다 
//현 container 영역에 overflow : hidden을 주어도 높이값이 없어서 
//자식요소들이 보이지 않는 상태이다.
//자식영역중 최고 높이값을 부모영역에 주기 

//for(let b = 0 ; b < slide.length ; b++){
    //slide 중 최고 높이값 찾기 
//    if(slideHeight < slide[b].offsetHeight){
//        slideHeight = slide[b].offsetHeight;
//    }
    //부모영역에 높이값 주기
//}

//매개변수 N값에 의해 슬라이드 이동 
function gotoslide(N){
    //slide[0] 일때는 left 값이 0 
    //slide[1] 일때는 left 값이 -100
    slide_contiainer.style.left = N * -100 + "%";
    pagerBtn[N].classList.remove("active");
}
//pater 안에 span 요소들 배열형태로 가져오기 
const pagerBtn = document.querySelectorAll('.pager span')

console.log(pagerBtn)

// 변수 c가 0부터  C < pagerBtn배열의 갯수 까지 실행하는 반복문 
// pagerBtn[0]이 클릭 되었을때 함수 실행
for(var c = 0 ; c < pagerBtn.length ; c++ ){
    pagerBtn[c].classList.add("active");


    pagerBtn[c].addEventListener('click',function(e){
        var pagerNum = e.target.innerText;
        gotoslide(pagerNum);
        for(var s = 0 ; s < pagerBtn.length ; s++ ){
            pagerBtn[s].classList.add("active");
        }
        e.target.classList.remove("active");
    })
    
       
}

gotoslide(0);
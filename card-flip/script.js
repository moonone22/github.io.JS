let circle = document.querySelector('.color_option');

circle.addEventListener('click',(e)=>{
    
    let target = e.target;
    if(target.classList.contains("circle")){
        circle.querySelector(".active").classList.remove("active");
        target.classList.add("active");
        document.querySelector(".main-images .active").classList.remove("active");
        document.querySelector(`.main-images .${target.id}`).classList.add("active");
    }
});

const cardbutton = document.querySelector('.cardbutton')
const card = document.querySelector('.BIGBOXX');

cardbutton.addEventListener('click',() =>{
card.classList.toggle('card--flipped');
})
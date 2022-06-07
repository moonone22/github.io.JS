const API_KEY ="45f58ba7e2c5d910bed859420f4b6735"



//.getCurrentPosition(성공했을시,오류시)
//성공했을 success 함수는 Geolocationposition object 하나를
function onGeoOk(position){
    const lat = position.coords.latitude;
    const log = position.coords.longitude;
    console.log("you live in", lat, log);
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`;
    //units=metric를 추가해서 화씨온도표시를 섭씨로 바꿔준다.
    console.log(url);
    fetch(url).then(response => response.json()).then(data =>{
        const name = document.querySelector("#name")
        const temp = document.querySelector("#temp")
        const weater_icon = document.createElement("img")
        const icon_img = data.weather[0].icon
        const box = document.querySelector("#box")
        
        name.innerText = data.name;
        temp.innerText = Math.floor(data.main.temp) + "º";
        weater_icon.src=`https://openweathermap.org/img/wn/${icon_img}.png`
        
        
    });
    //fetch는 자바스크립트가  url을 찾게한다
}
function onGeoError(){
    alert("can't find you");
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError)

//두번쨰 단계는 이 숫자들을  장소로 바꿔줄 서비스를 사용해야된다
//API 계정을 열자

const today = document.querySelector("#today")

function getToday(){
    const data = new Date();
    const day = data.getDay();
    
    const month = data.toLocaleDateString('en-us',{month:'short'})
                       //월별로 글자로 바꾸어 출력하는 방법
    const date = data.getDate();

    var dayName;
    
    switch(day){
        case 0:dayName="일요일"; break;
        case 1:dayName="월요일"; break;
        case 2:dayName="화요일"; break;
        case 3:dayName="수요일"; break;
        case 4:dayName="목요일"; break;
        case 5:dayName="금요일"; break;
        case 6:dayName="토요일"; break;
    }

  

    today.innerText = `${dayName} ${month} ${date<10?`0${date}`:date}`

      
}
getToday();



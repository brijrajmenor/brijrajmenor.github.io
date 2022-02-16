const timeE1=document.getElementById('time');
const dateE1=document.getElementById('date');
const currentWeatherItemsE1=document.getElementById('current-weather-items');
const timezone=document.getElementById('time-zone');
const country1=document.getElementById('country');
const weatherForecastE1=document.getElementById('weather-forecast');
const currentTempE1=document.getElementById('current-temp');


const days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months=['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug','Sept','Oct', 'Nov','Dec'];

const API_KEY='746dda1284c1af92cc0cec33558f0b9a';


setInterval(()=>{
    const time= new Date();
    const month= time.getMonth();
    const date= time.getDate();
    const day= time.getDay();
    const hour=time.getHours();
    const minutes= '0'+time.getMinutes();

    timeE1.innerHTML=hour + ':' + minutes.slice(-2);

    dateE1.innerHTML=days[day] + ', '+ date+' '+months[month];
},100);


getWeatherData();
function getWeatherData() {
    navigator.geolocation.getCurrentPosition(success => {

        let{latitude, longitude}=success.coords;

        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&units=metric&appid=746dda1284c1af92cc0cec33558f0b9a').then(res=>res.json()).then(data => {
            console.log(data);
            showWeatherData(data);
            //timezone.innerHTML= data.lat+'N'+data.lon+'E';
        });
    })
}

function showWeatherData(data){
    let {humidity, pressure, sunrise, sunset, wind_speed}=data.current;
    
    
    timezone.innerHTML=data.timezone;
    country1.innerHTML=data.lat+'N '+data.lon+'E';

    currentWeatherItemsE1.innerHTML=        
        `<div class='weather-item'>
           <div>Humidity</div>
           <div>${humidity}%</div>
       </div>
       <div class='weather-item'>
           <div>Pressure</div>
           <div>${pressure}</div>
       </div>
       <div class='weather-item'>
           <div>Wind Speed</div>
           <div>${wind_speed}</div>
       </div>
       <div class='weather-item'>
           <div>Sun Rise</div>
           <div>${window.moment(sunrise*1000).format('HH:mm')} AM</div>
       </div>
       <div class='weather-item'>
           <div>Sun Set</div>
           <div>${window.moment(sunset*1000).format('HH:mm')} PM</div>
       </div>
       `;

       let otherDayForecast=''
       data.daily.forEach((day,idx)=>{
           if (idx==0) {
               currentTempE1.innerHTML=
               `
               <div class="today" id="current-temp">
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
                    <div class="other">
                        <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                        <div class="temp">Night:${day.temp.night}&#176; C</div>
                        <div class="temp">Day: 3${day.temp.day}&#176; C</div>
                    </div>
                </div>
               `
               
           }else{ 
                otherDayForecast+=`
                <div class="weather-forecast-item">
                    <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                    <div class="temp">Night: ${day.temp.night}&#176; C</div>
                    <div class="temp">Day: ${day.temp.day}&#176; C</div>
                </div>
                `
           }
       })

       weatherForecastE1.innerHTML=otherDayForecast;
}

const apikey = "0b6d653ae7e4d618ea7c1188163035bb";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const city = document.getElementsByClassName("city")[0];
const temp = document.getElementsByClassName("temp")[0];
const humidity = document.getElementsByClassName("humidity")[0];
const wind = document.getElementsByClassName("wind")[0];

const searchbox = document.getElementsByClassName("searchinput")[0];
const searchbtn = document.getElementsByClassName("searchbtn")[0];
const icon = document.getElementsByClassName("weather-icon")[0];

const weather = document.getElementsByClassName("weather")[0];

const error = document.getElementsByClassName("catch")[0];

async function checkweather(cityname) {
    const response = await fetch(apiurl + cityname + `&appid=${apikey}`);
    if (
        response.status==404){error.style.display = "block"
        weather.style.display = "none";
        searchbox.value = "";
    }
    else{
        var data = await response.json();
        if(data.name===undefined){weather.style.display = "none"}            
        else {city.innerHTML = data.name;}
        temp.innerHTML = Math.round(data.main.temp) + "°C";
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + " kmph";

        if (data.weather[0].main == "Mist"){icon.src = "images/mist.png";}
        else if (data.weather[0].main == "Clear"){icon.src = "images/clear.png";}
        else if (data.weather[0].main == "Clouds"){icon.src = "images/clouds.png";}
        else if (data.weather[0].main == "Drizzle"){icon.src = "images/drizzle.png.png";}
        else if (data.weather[0].main == "Rain"){icon.src = "images/rain.png";}
        else if (data.weather[0].main == "Snow"){icon.src = "images/snow.png";}

        weather.style.display = "block";
        searchbox.value = "";
        error.style.display = "none"
    }

}

searchbtn.addEventListener("click",()=> {
    const city = searchbox.value
    checkweather(city);
})
const apiKey = ''; //api key here
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric'

const cityName = document.querySelector('.city')
const temp = document.querySelector('.temp')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')
const weather = document.querySelector('.weather')

searchBox.value = ""


async function checkWeather(city) {
    const response = await fetch(apiUrl + `&q=${city}&appid=${apiKey}`)
    if(response.status == 404) {
        wrongCity()
    } else {
        const data = await response.json()
        cityName.textContent = data.name
        temp.textContent = `${Math.round(data.main.temp)}°C`
        humidity.textContent = data.main.humidity + '%'
        wind.textContent = `${Math.round(data.wind.speed)} km/h`
        
        weatherIcon.src = `img/${data.weather[0].main.toLowerCase()}.png`
    }
}

searchBtn.addEventListener('click',()=> {
    checkWeather(searchBox.value)
    weather.classList.remove('hidden')
})

function wrongCity() {
    searchBox.value = "Wrong City Name"
    cityName.textContent = "???"
    temp.textContent = "???°C"
    humidity.textContent = '? %'
    wind.textContent = "? km/h"
}

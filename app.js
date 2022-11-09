const btn = document.querySelector('#search').addEventListener('click', getData)

function getData() {

    let userInput = document.querySelector('.user-input').value
    let cityName = document.querySelector('.city-name')

    if (userInput == "") {
        cityName.textContent = 'Please Enter a City Name'
        cityName.style.color = 'red'
    }
    else {
        let myDate = document.querySelector('#date')
        let myTime = document.querySelector('#time')
        let description = document.querySelector('.description')
        let wImg = document.querySelector('.weather-img')
        cityName.textContent = userInput
        cityName.style.color = '#fff';

        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + userInput + '&appid=912eb481fa057004fd44f1032a1a0957')
            .then((resp) => resp.json())
            .then((data) => {
                for (i = 0; i < 5; i++) {
                    let calC = data.list[i + 1].dt_txt.slice(11, 16)
                    myDate.innerHTML = data.list[0].dt_txt.slice(0, 10)
                    myTime.innerHTML = 'Around: ' + data.list[i].dt_txt.slice(11, 16) + " - " + calC
                    // description.innerHTML = data.list[i].weather[0].description
                    wImg.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png"
                    if (data.list[i].weather[0].main === "Rain") {
                        description.innerHTML = "IT WILL RAIN";
                    } else {
                        description.innerHTML = "IT WON'T RAIN"
                        myTime.innerHTML = ''
                    }
                }
            })
            .catch(err => {
                cityName.textContent = 'Unkown City'
                cityName.style.color = 'red'
            })
    }
}
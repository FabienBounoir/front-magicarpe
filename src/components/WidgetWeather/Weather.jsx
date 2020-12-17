import React from "react";
import  "./_Weather.css"

var keyApiWeather = "489c0d28e5b8d9f56e438c3570995d6c"

export const Weather = () => {
    return (
        <div className="weather">
            <div className="parametreWidgetWeather">
                <input id="nomVille" type="text" name="name" />
                <button onClick={ChangeVille}>changer ville</button>
            </div>

            <div className="WeatherDonnee">
            </div>
        </div>
    )
}

//methode qui fait un call a l'api meteo pour recuperer les information meteorologique.
function ChangeVille() {
    let ville = document.getElementById("nomVille").value;

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://api.openweathermap.org/data/2.5/weather?q="+ ville +"&units=metric&appid=" + keyApiWeather, requestOptions)
      .then(response => response.text())
      .then(result => extraireInfoMeteo(result))
      .catch(error => console.log('error', error));
}

//methode qui extrait les donnée de la meteo pour mettre a jour le widget
function extraireInfoMeteo(weatherInfo)
{
    let obj = JSON.parse(weatherInfo)

    document.getElementsByClassName("WeatherDonnee")[0].innerHTML = `
        <div className="WeatherInfo">
            <h1> ${ obj.name } </h1>
            <p>➜ Temperature: ${ obj.main.temp }°C</p>
            <p>➜ Humidité:  ${ obj.main.humidity }%</p>
            <p>➜ Vitesse vent:  ${ obj.wind.speed } m/s</p>
            <p>➜ Pression:  ${ obj.main.pressure } Hpa</p>
        </div>
        <div className="WeatherVisuel">
            <img src=${ "http://openweathermap.org/img/w/" + obj["weather"][0].icon  + ".png" } style="border: medium none; width: 200px; height: 200px; background: url(&quot;${ "http://openweathermap.org/img/w/" + obj["weather"][0].icon  + ".png" }&quot;) repeat scroll 0% 0% transparent;" width="300" height="300" ></img>
            <p>${ obj["weather"][0].main }</p>
        </div>`


    updateWidget()
}

//methode qui met à jour le widget
function updateWidget()
{
    document.getElementsByClassName("parametreWidgetWeather")[0].style.display = "none";

    setTimeout(function(){
        ChangeVille();
    },(document.getElementById("timeActualisation").value * 1000))
}
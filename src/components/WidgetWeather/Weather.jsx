import React, { useEffect, useState } from "react";
import  "./_Weather.css"

var keyApiWeather = "489c0d28e5b8d9f56e438c3570995d6c"

export const Weather = ({value, updateWidget, index}) => {
    const [city, setCity] = useState(value || "");
    const [isActive, setIsActive] = useState(value === "");
    const [weatherInfos, setWeatherInfos] = useState({
        temp: "",
        humidity: "",
        speed: "",
        name: "",
        pressure: "",
        icon: "",
        current: ""
    });

    useEffect(() => {
        if(value) {
            callApi();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    //methode qui fait un call a l'api meteo pour recuperer les information meteorologique.
    async function callApi() {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let res = await fetch("http://api.openweathermap.org/data/2.5/weather?q="+ value +"&units=metric&appid=" + keyApiWeather, requestOptions)
            .then(response => response.text())
            .catch(error => console.log('error', error));

        extraireInfoMeteo(res);
    }

    //methode qui extrait les donnée de la meteo pour mettre a jour le widget
    function extraireInfoMeteo(weatherInfo)
    {
        let obj = JSON.parse(weatherInfo)
        if(obj.cod !== 200) return;
        setWeatherInfos({
            name: obj.name,
            temp: obj.main.temp,
            humidity: obj.main.humidity,
            speed: obj.wind.speed,
            pressure: obj.main.pressure,
            icon: `http://openweathermap.org/img/w/${obj["weather"][0].icon}.png`,
            current: obj["weather"][0].main
        })

        setIsActive(true);
        updateWidget(index, )
        refreshWidget()
    }

    //methode qui met à jour le widget
    function refreshWidget()
    {
        console.log("reload1weather")
        setTimeout(function(){
            console.log("reload2weather")
            callApi();
        },(document.getElementById("timeActualisation").value * 1000))
    }

    return (
        <div className="weather">
            {!isActive ? (
                <div className="parametreWidgetWeather">
                    <input id="nomVille" value={city} onChange={(e) => setCity(e.currentTarget.value)} type="text" name="name" />
                    <button onClick={() => updateWidget(index, city, "city")}>Changer ville</button>
                </div>
            ) : (
                <div className="WeatherDonnee">
                    <div className="WeatherInfo">
                        <h1>{weatherInfos.name}</h1>
                        <p>➜ Temperature: {weatherInfos.temp}°C</p>
                        <p>➜ Humidité:  {weatherInfos.humidity}%</p>
                        <p>➜ Vitesse vent: {weatherInfos.speed} m/s</p>
                        <p>➜ Pression: {weatherInfos.pressure}Hpa</p>
                    </div>
                    <div className="WeatherVisuel">
                        <img src={weatherInfos.icon} style={{border: "medium none", width: "200px", height: "200px", background: `url(${weatherInfos.icon}) repeat scroll 0% 0% transparent`}} width="300" height="300" alt=""></img>
                        <p>{weatherInfos.current}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
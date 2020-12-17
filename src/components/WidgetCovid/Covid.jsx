import React from "react";

//token api covid
const tokenApiCovid = "fb72ebee16msh50b3cee7668bb2bp1bf384jsnd2bad9036ece"


export const Covid = () => {
    return (
        <div className="covid">
            <div className="parametreWidgetCovid">
                <input id="nomPays" type="text" name="name" />
                <button onClick={changePays}>changer pays</button>
            </div>

            <div className="CovidDonnee">
            </div>
        </div>
    )
}

//methode qui fait un call a l'api meteo pour recuperer les information meteorologique.
function changePays() {

    let pays = document.getElementById("nomPays").value;

    fetch("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=" + pays, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": tokenApiCovid,
        }
    })
    .then(response => response.text())
    .then(result => extraireInfoCovid(result))
    .catch(error => console.log('error', error));

}

//methode qui extrait les donnée de la meteo pour mettre a jour le widget
function extraireInfoCovid(weatherInfo)
{
    let obj = JSON.parse(weatherInfo)

    document.getElementsByClassName("CovidDonnee")[0].innerHTML = `
    <h1>${obj.data.location}</h1
    <p>➜ Nombre de morts: ${obj.data.deaths}</p>
    <p>➜ Nombre de cas totals: ${obj.data.confirmed}</p>
    <p>➜ Nombre de guérie ${obj.data.recovered}</p>
    `

    updateWidget()
}

//methode qui met à jour le widget
function updateWidget()
{
    document.getElementsByClassName("parametreWidgetCovid")[0].style.display = "none";

    setTimeout(function(){
        changePays();
    },(document.getElementById("timeActualisation").value * 1000))
}
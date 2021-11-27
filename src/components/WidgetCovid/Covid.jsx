import React, { useEffect, useState } from "react";
import  "./_Covid.css"

//token api covid
const tokenApiCovid = "fb72ebee16msh50b3cee7668bb2bp1bf384jsnd2bad9036ece"


export const Covid = ({value, updateWidget, index}) => {
    const [country, setPays] = useState(value || "");
    const [isActive, setIsActive] = useState(value === "");
    const [paysInfos, setPaysInfos] = useState({
        location: "",
        deaths: "",
        confirmed: "",
        recovered: ""
    });

    useEffect(() => {
        if(value) {
            changePays();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

//methode qui fait un call a l'api meteo pour recuperer les information meteorologique.
    async function changePays() {

        let res = await fetch("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=" + value, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": tokenApiCovid,
            }
        })
        .then(response => response.text())
        .catch(error => console.log('error', error));

        extraireInfoCovid(res)
    }

    //methode qui extrait les donnée de la meteo pour mettre a jour le widget
    function extraireInfoCovid(covidInfo)
    {
        let obj = JSON.parse(covidInfo)
        // if(obj.cod !== 200) return;
        setPaysInfos({
            location: obj.data.location,
            deaths: obj.data.deaths,
            confirmed: obj.data.confirmed,
            recovered: obj.data.recovered
        })

        setIsActive(true);
        updateWidget(index, )
        refreshWidget()
    }

    //methode qui met à jour le widget
    function refreshWidget()
    {
        setTimeout(function(){
            changePays();
        },(document.getElementById("timeActualisation").value * 1000))
    }

    return (
        <div className="covid">
            {!isActive ? (
            <div className="parametreWidgetCovid">
                <input id="nomPays" value={country} onChange={(e) => setPays(e.currentTarget.value)} type="text" name="name" />
                <button onClick={() => updateWidget(index, country, "country")}>Changer pays</button>
            </div>
            ) : (
            <div className="CovidDonnee">
                <h1 id="playName">{paysInfos.location}</h1>
                <p>➜ Nombre de morts: {paysInfos.deaths}</p>
                <p>➜ Nombre de cas totals: {paysInfos.confirmed}</p>
                <p>➜ Nombre de guérie {paysInfos.recovered}</p>
            </div>
            )}
        </div>
    )
}
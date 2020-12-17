import React from "react";
import  "./_Twitch.css"

const keyApiTwitch = "tn2qigcd7zaj1ivt1xbhw0fl2y99c4y"
var infoCompte = "";
var chaineActuel = "";

export const Twitch = () => {
    return (
        <div className="twitch">
            <div className="parametreWidgetTwitch">
                <input id="nomChainetwitch" type="text" name="name" />
                <button onClick={ChangeChaine}>changer chaine</button>
            </div>
            <div className="twitchDonnee">
            </div>
        </div>
    )
}

function ChangeChaine() {
    searchChaine(document.getElementById("nomChainetwitch").value);
}

//methode qui fait un call a l'api de twitch pour recuperer l'id de la chaine choisie
function searchChaine(nom = "badbounsTV")
{
    //permet de tester si la requete pour trouver l'utilisateur n'a pas deja etait fais.
    if(nom !== chaineActuel)
    {
        chaineActuel = nom;

        const myHeaders = new Headers();
        myHeaders.append("Client-ID", keyApiTwitch);
        myHeaders.append("Accept", "application/vnd.twitchtv.v5+json");
        
        const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        
        fetch("https://api.twitch.tv/kraken/search/channels?query="+ nom +"", requestOptions)
        .then(response => response.text())
        .then(result => recupInfoChaine(JSON.parse(result)))
        .catch(error => console.log('error', error));
    }
    else //utilisateur deja trouver donc envoie de la donnée deja stocker
    {
        recupInfoChaine(infoCompte);
    }

}

//methode qui fait un call a l'api de twitch pour recupere les info de la chaine
function recupInfoChaine(id)
{
    infoCompte = id;

    var myHeaders = new Headers();
    myHeaders.append("Client-ID", keyApiTwitch);
    myHeaders.append("Accept", "application/vnd.twitchtv.v5+json");


    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://api.twitch.tv/kraken/streams/"+id.channels[0]["_id"], requestOptions)
        .then(response => response.text())
        .then(result => extraireInfoChaine(result))
        .catch(error => console.log('error', error));
}

//met a jour les information de la chaine sur le widget
function extraireInfoChaine(result)
{
    let obj = JSON.parse(result)

    document.getElementsByClassName('twitchDonnee')[0].innerHTML = 
    `<div className="logoTwitch"> 
    ${obj.stream == null ? (
    `<img src=${infoCompte.channels[0]["logo"] } style="width: 100px; height: 100px; border-radius: 10px;" ></img></div>
    <div className="infoTwitch">
    <p>${infoCompte.channels[0]["display_name"] } est offline</p>`
    ) : (
        `<a title="Lien chaine twitch" href="${obj.stream.channel.url}" target="_blank"><img src=${infoCompte.channels[0]["logo"] } style="width: 100px; height: 100px; border-radius: 10px;" ></img></a></div>
        <div className="infoTwitch">
        <p> ${ obj.stream.channel.display_name } en live sur ${(obj.stream.game === "" ? 'quelque chose !' : obj.stream.game )} <br> ➜ ${ obj.stream.viewers } ${(obj.stream.viewers === 1 ? 'viewer' : "viewers" )}</p>`
    )}
    </div>`

    updateWidget()
}

//methode qui met à jour le widget
function updateWidget()
{
    document.getElementsByClassName("parametreWidgetTwitch")[0].style.display = "none";

    setTimeout(function(){
        ChangeChaine();
    },(document.getElementById("timeActualisation").value * 1000))
}
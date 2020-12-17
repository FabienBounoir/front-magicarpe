import React from "react";

const KeySteam = "81514D3BC45C590CC787643AD8C8A833";
var idCompte = "";

export const Steam = () => {
    return (
        <div className="steam">
            <div className="parametreWidgetSteam">
                <input id="nomIdSteam" type="text" name="name" />
                <button onClick={ChangeID}>changer ID</button>
            </div>
            
            <div className="SteamDonnee">
            </div>
        </div>
    )
}

function ChangeID() {
    recupIdJoueur(document.getElementById("nomIdSteam").value);
}

//methode qui fait un call a l'api de youtube pour recuperer l'id de la chaine choisie
function searchInformationCompte(id)
{
    idCompte = id;

    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+ KeySteam +"&steamids=" + id.response.steamid, requestOptions)
      .then(response => response.text())
      .then(result => extraireInfoCompte(result))
      .catch(error => console.log('error', error));
}

//met a jour le nom et la photo de profils du compte steam
function extraireInfoCompte(result)
{
    let compte = JSON.parse(result)

    document.getElementsByClassName('SteamDonnee')[0].innerHTML =  `<h1><a title="lien steam compte" href="${compte.response.players[0].profileurl}" target="_blank"><img src=${compte.response.players[0].avatarfull} style="width: 100px; height: 100px; border-radius: 10px;" ></img></a>${ compte.response.players[0].personaname }</h1>`

    if(compte.response.players[0].gameextrainfo == null)
        document.getElementsByClassName('SteamDonnee')[0].innerHTML +=`<p>➜ Hors Ligne.</p>`
    else 
    {
        document.getElementsByClassName('SteamDonnee')[0].innerHTML +=`<p>➜ joue à ${compte.response.players[0].gameextrainfo}.</p>`
    }

    updateWidget()
}

//methode qui fait un call a l'api de youtube pour recupere les info de la chaine (nb abo, nb vue, nb video)
function recupIdJoueur(name)
{    
    //permet de tester si la requete pour trouver la chaine n'a pas deja etait fais.
    if(name !== idCompte)
    {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch("https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?key=81514D3BC45C590CC787643AD8C8A833&vanityurl=" + name,  {
            "method": "GET",
            "headers": {
                "Host": "localhost:3000"
            }
        })
            .then(response => response.text())
            .then(result => searchInformationCompte(JSON.parse(result)))
            .catch(error => console.log('error', error));
    }
    else
    {
        searchInformationCompte(idCompte);
    }
}

//methode qui met à jour le widget
function updateWidget()
{
    document.getElementsByClassName("parametreWidgetSteam")[0].style.display = "none";

    setTimeout(function(){
        ChangeID();
    },(document.getElementById("timeActualisation").value * 1000))
}
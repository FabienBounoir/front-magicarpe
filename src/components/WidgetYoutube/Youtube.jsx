import React from "react";

const keyApiYoutube = "AIzaSyAMxQv1KSXrpnQ5gG9-kcq4G5rv9LN6-_0";
var chaineActuel = "";
var Idsauvegarder = "";

export const Youtube = () => {
    return (
        <div className="youtube">
            <div className="parametreWidgetYoutube">
                <input id="nomChaineYoutube" type="text" name="name" />
                <button onClick={ChangeChaine}>changer chaine</button>
            </div>

            <div className="YoutubeDonnee">
            </div>
        </div>
    )
}

function ChangeChaine() {
    searchChaine(document.getElementById("nomChaineYoutube").value);
}

//methode qui fait un call a l'api de youtube pour recuperer l'id de la chaine choisie
function searchChaine(nom = "pewdiepie")
{
    //permet de tester si la requete pour trouver la chaine n'a pas deja etait fais.
    if(nom !== chaineActuel)
    {
        chaineActuel = nom;

        const requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
        
        fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&q="+ nom +"&type=channel&key="+ keyApiYoutube, requestOptions)
        .then(response => response.text())
        .then(result => extraireChaineName(result))
        .catch(error => console.log('error', error));
    }
    else //si deja fait on envoie les donnée stocker.
    {
        extraireChaineName(Idsauvegarder);
    }
}

//met a jour le nom et la photo de profils de la chaine
function extraireChaineName(result)
{
    Idsauvegarder = result;

    let compte = JSON.parse(result)

    document.getElementsByClassName('YoutubeDonnee')[0].innerHTML =  `<h1><a title="lien chaine youtube" href="https://www.youtube.com/channel/${compte.items[0].id.channelId}" target="_blank"><img src=${compte.items[0].snippet.thumbnails.default.url } style="width: 100px; height: 100px; border-radius: 10px;" ></img></a>${ compte.items[0].snippet.title }</h1>`

    recupInfoChaine(compte.items[0].id.channelId);

}

//methode qui fait un call a l'api de youtube pour recupere les info de la chaine (nb abo, nb vue, nb video)
function recupInfoChaine(id)
{
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://youtube.googleapis.com/youtube/v3/channels?key="+ keyApiYoutube + "&part=statistics&id="+ id, requestOptions)
        .then(response => response.text())
        .then(result => extraireInfoChaine(result))
        .catch(error => console.log('error', error));
}

//met a jour les information de la chaine sur le widget
function extraireInfoChaine(result)
{
    let obj = JSON.parse(result)

    document.getElementsByClassName('YoutubeDonnee')[0].innerHTML += `<p> abonné: ${ obj.items[0].statistics.subscriberCount } </p>`+
    `<p> nombre de vue: ${ obj.items[0].statistics.viewCount } </p>`+
    `<p> nombre de video: ${ obj.items[0].statistics.videoCount } </p>`

    updateWidget()
}

//methode qui met à jour le widget
function updateWidget()
{
    document.getElementsByClassName("parametreWidgetYoutube")[0].style.display = "none";

    setTimeout(function(){
        ChangeChaine();
    },(document.getElementById("timeActualisation").value * 1000))
}
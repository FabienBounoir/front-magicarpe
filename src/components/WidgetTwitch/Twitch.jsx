import React, { useEffect, useState } from "react";
import  "./_Twitch.css"

const keyApiTwitch = "tn2qigcd7zaj1ivt1xbhw0fl2y99c4y"
var infoCompte = "";
var chaineActuel = "";

export const Twitch = ({value, updateWidget, index}) => {
    const [channel, setChaine] = useState(value || "");
    const [isActive, setIsActive] = useState(value === "");
    const [chaineInfos, setChaineInfos] = useState({
        logo: "",
        nom: "",
        etat: null,
        name: "",
        url: "",
        jeux: "",
        nbViewer: ""
    });

    useEffect(() => {
        if(value) {
            searchChaine();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    
    //methode qui fait un call a l'api de twitch pour recuperer l'id de la chaine choisie
    async function searchChaine() {
        //permet de tester si la requete pour trouver l'utilisateur n'a pas deja etait fais.
        if(value !== chaineActuel)
        {
            chaineActuel = value;
    
            const myHeaders = new Headers();
            myHeaders.append("Client-ID", keyApiTwitch);
            myHeaders.append("Accept", "application/vnd.twitchtv.v5+json");
            
            const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch("https://api.twitch.tv/kraken/search/channels?query="+ value +"", requestOptions)
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
    async function recupInfoChaine(id)
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
        console.log(obj);
        // if(obj.cod !== 200) return;
        if(obj.stream == null)
        {
            setChaineInfos({
                logo: infoCompte.channels[0]["logo"],
                nom: infoCompte.channels[0]["display_name"],
                etat: obj.stream,
                jeux: "quelque chose !"
            })
        }
        else{
            setChaineInfos({
                logo: infoCompte.channels[0]["logo"],
                nom: infoCompte.channels[0]["display_name"],
                etat: obj.stream,
                name: obj.stream.channel.display_name,
                url: obj.stream.channel.url,
                jeux: obj.stream.game,
                nbViewer: obj.stream.viewers
            })
        }

        setIsActive(true);
        updateWidget(index, )
        refreshWidget()
    }
    
    //methode qui met à jour le widget
    function refreshWidget()
    {
        console.log("reload1twich")
        setTimeout(function(){
            console.log("reload2twitch")
            searchChaine();
        },(document.getElementById("timeActualisation").value * 1000))
    }


    return (
        <div className="twitch">
            {!isActive ? (
                <div className="parametreWidgetTwitch">
                    <input id="nomChainetwitch" value={channel} onChange={(e) => setChaine(e.currentTarget.value)} type="text" name="name" />
                    <button onClick={() => updateWidget(index, channel, "chaine")}>Changer Chaine</button>
                </div>
            ) : (
                <div className="twitchDonnee">
                    {chaineInfos.etat == null ? (
                    <div className="twitchChaineHorsLigne">
                        <div className="logoTwitch"> 
                            <img src={chaineInfos.logo} style={{width: "100px", height: "100px", borderRadius: "10px" }} alt="" ></img>
                        </div>
                        <div className="infoTwitch">
                            <p>{chaineInfos.nom} est offline</p>
                        </div>
                    </div>
                    ) : (
                        <div className="twitchChaineEnLigne">
                            <div className="logoTwitch"> 
                                <a title="Lien chaine twitch" href={chaineInfos.url} target="_blank" rel="noreferrer">
                                    <img src={chaineInfos.logo } style={{width: "100px", height: "100px", borderRadius: "10px"}} alt="" ></img>
                                </a>
                            </div>
                            <div className="infoTwitch">
                                <p> {chaineInfos.name} en live sur {chaineInfos.jeux} <br /> ➜ {chaineInfos.nbViewer} viewers</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

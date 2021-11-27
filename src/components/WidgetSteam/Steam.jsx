import React, { useEffect, useState } from "react";

const KeySteam = "81514D3BC45C590CC787643AD8C8A833";
var idCompte = "";

export const Steam = ({value, updateWidget, index}) => {
    const [account, setAccount] = useState(value || "");
    const [isActive, setIsActive] = useState(value === "");
    const [accountInfos, setAccountInfos] = useState({
        nom: "",
        logo: "",
        url: "",
        jeu: ""
    });

    useEffect(() => {
        if(value) {
            recupIdJoueur();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    //methode qui fait un call a l'api de youtube pour recupere les info de la chaine (nb abo, nb vue, nb video)
    async function recupIdJoueur()
    {    
        //permet de tester si la requete pour trouver la chaine n'a pas deja etait fais.
        if(value !== idCompte)
        {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            
            fetch("https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?key=81514D3BC45C590CC787643AD8C8A833&vanityurl=" + value, requestOptions)
                .then(response => response.text())
                .then(result => searchInformationCompte(JSON.parse(result)))
                .catch(error => console.log('error', error));
        }
        else
        {
            searchInformationCompte(idCompte);
        }
    }
    
    //methode qui fait un call a l'api de youtube pour recuperer l'id de la chaine choisie
    async function searchInformationCompte(id)
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
        
        setAccountInfos({
            nom: compte.response.players[0].personaname,
            logo: compte.response.players[0].avatarfull,
            url: compte.response.players[0].profileurl,
            jeu: compte.response.players[0].gameextrainfo == null ? null : compte.response.players[0].gameextrainfo
        })
    
        setIsActive(true);
        updateWidget(index, )
        refreshWidget()
    }
    
    //methode qui met à jour le widget
    function refreshWidget()
    {
        setTimeout(function(){
            recupIdJoueur();
        },(document.getElementById("timeActualisation").value * 1000))
    }


    return (
        <div className="steam">            
            {!isActive ? (
                <div className="parametreWidgetSteam">
                    <input id="nomIdSteam" value={account} onChange={(e) => setAccount(e.currentTarget.value)} type="text" name="name" />
                    <button onClick={() => updateWidget(index, account, "account")}>Changer ID</button>
                </div>
            ) : (
            <div className="SteamDonnee">
                <h1>
                    <a title="lien steam compte" href={accountInfos.url} target="_blank" rel="noreferrer">
                        <img src={accountInfos.logo} style={{width: "100px", height: "100px", borderRadius: "10px"}} alt="" ></img>
                    </a>{accountInfos.nom}
                </h1>
                {accountInfos.jeu == null ? (
                    <p>➜ Hors Ligne.</p>
                ) : (
                    <p>➜ joue à {accountInfos.jeu}</p>
                )}

            </div>
            )}
        </div>
    )
}


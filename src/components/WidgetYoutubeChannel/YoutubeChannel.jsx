import React, { useEffect, useState } from "react";

const keyApiYoutube = "AIzaSyAMxQv1KSXrpnQ5gG9-kcq4G5rv9LN6-_0";
var chaineActuel = "";
var Idsauvegarder = "";

export const YoutubeChannel = ({value, updateWidget, index}) => {
    const [channel, setChaine] = useState(value || "");
    const [isActive, setIsActive] = useState(value === "");
    const [chaineInfos, setChaineInfos] = useState({
        name: "",
        id: "",
        logo: "",
        nbSub: "",
        nbView: "",
        nbVideo: "",
    });

    useEffect(() => {
        if(value) {
            searchChaine();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    
    //methode qui fait un call a l'api de youtube pour recuperer l'id de la chaine choisie
    async function searchChaine()
    {
        //permet de tester si la requete pour trouver la chaine n'a pas deja etait fais.
        if(value !== chaineActuel)
        {
            chaineActuel = value;
    
            const requestOptions = {
            method: 'GET',
            redirect: 'follow'
            };
            
            fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&q="+ value +"&type=channel&key="+ keyApiYoutube, requestOptions)
            .then(response => response.text())
            .then(result => recupInfoChaine(result))
            .catch(error => console.log('error', error));
        }
        else //si deja fait on envoie les donnée stocker.
        {
            recupInfoChaine(Idsauvegarder);
        }
    }
    
    //methode qui fait un call a l'api de youtube pour recupere les info de la chaine (nb abo, nb vue, nb video)
    async function recupInfoChaine(id)
    {
        Idsauvegarder = id;

        let compte = JSON.parse(id)

        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://youtube.googleapis.com/youtube/v3/channels?key="+ keyApiYoutube + "&part=statistics&id="+ compte.items[0].id.channelId, requestOptions)
            .then(response => response.text())
            .then(result => extraireInfoChaine(result, compte))
            .catch(error => console.log('error', error));

    }
    
    //met a jour les information de la chaine sur le widget
    function extraireInfoChaine(infochaine, infoRecherche)
    {
        let obj = JSON.parse(infochaine)
    
        setChaineInfos({
            name: infoRecherche.items[0].snippet.title,
            id: infoRecherche.items[0].id.channelId,
            logo: infoRecherche.items[0].snippet.thumbnails.default.url,
            nbSub: obj.items[0].statistics.subscriberCount,
            nbView: obj.items[0].statistics.viewCount,
            nbVideo: obj.items[0].statistics.videoCount,
        })
    
        setIsActive(true);
        updateWidget(index, )
        refreshWidget()
    }
    
    //methode qui met à jour le widget
    function refreshWidget()
    {
        setTimeout(function(){
            searchChaine();
        },(document.getElementById("timeActualisation").value * 1000))
    }


    return (
        <div className="youtubeChannel">
            {!isActive ? (
                <div className="parametreWidgetWeather">
                    <input id="nomChaine" value={channel} onChange={(e) => setChaine(e.currentTarget.value)} type="text" name="name" />
                    <button onClick={() => updateWidget(index, channel, "channel")}>Changer chaine</button>
                </div>
            ) : ( 
                <div className="YoutubeDonneeChannel">
                    <h1>
                        <a title="lien chaine youtube" href={"https://www.youtube.com/channel/" + chaineInfos.id} target="_blank" rel="noreferrer">
                            <img src={chaineInfos.logo } style={{width: "100px", height: "100px", borderRadius: "10px"}} alt="" ></img>
                        </a>
                        { chaineInfos.name }
                    </h1>
                    <p> abonné: {chaineInfos.nbSub} </p>
                    <p> nombre de vue: {chaineInfos.nbView} </p>
                    <p> nombre de video: {chaineInfos.nbVideo} </p>
                </div>
            )}
        </div>
    )
}


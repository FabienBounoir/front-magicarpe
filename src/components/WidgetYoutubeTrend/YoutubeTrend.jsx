import React, { useEffect, useState } from "react";
import  "./_YoutubeTrend.css"

const keyApiYoutube = "AIzaSyD1JSZeO3k1tZmydwy5FkqOblI-laqDaCg";
var chaineActuel = "";

export const YoutubeTrend = ({value, updateWidget, index}) => {
    const [acronymePays, setAcronymePays] = useState(value || "");
    const [isActive, setIsActive] = useState(value === "");
    const [trendInfos, setTrendInfos] = useState({
        videos: "",
        totalResult: ""
    });

    useEffect(() => {
        if(value) {
            searchChaine();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    
    //methode qui fait un call a l'api de youtube pour recuperer les tendance suivant le pays
    async function searchChaine()
    {
            const requestOptions = {
            method: 'GET',
            redirect: 'follow'
            };
            
            fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&regionCode="+ value +"&key="+ keyApiYoutube, requestOptions)
            .then(response => response.text())
            .then(result => extraireInfoTendance(result))
            .catch(error => console.log('error', error));

    }
    
    //met a jour les information des tendances
    function extraireInfoTendance(infoTendance)
    {
        let obj = JSON.parse(infoTendance)
    
        if(obj.error != null)
        {
            setTrendInfos({
                erreur: obj.error.errors[0].message
            })
        }
        else
        {
            setTrendInfos({
                videos: obj.items,
                totalResult: obj.pageInfo.resultsPerPage,
                erreur: ""
            })
        }
    
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
                    <input id="nomPays" value={acronymePays} onChange={(e) => setAcronymePays(e.currentTarget.value)} type="text" name="name" />
                    <button onClick={() => updateWidget(index, acronymePays, "acronymePays")}>Changer acronyme pays</button>
                </div>
            ) : ( 
                trendInfos.erreur !== "" ? (
                    <div className="parametreWidgetWeather">
                        <p style={{color: "red"}} >⚠️ { trendInfos.erreur } ⚠️</p>
                        <input id="nomPays" value={acronymePays} onChange={(e) => setAcronymePays(e.currentTarget.value)} type="text" name="name" />
                        <button onClick={() => updateWidget(index, acronymePays, "acronymePays")}>Changer acronyme pays</button>
                    </div>
                    ) : (
                    <div className="YoutubeDonneeChannel">
                        {(() => {
                        const videolist = [];

                        for (let i = 0; i < trendInfos.totalResult; i++) {
                            videolist.push(
                                <div className="videoInfo">
                                    <div className="miniatureVideo"> 
                                        <a title="Lien playlist" href="google.fr" target="_blank" rel="noreferrer">
                                            <img src={trendInfos.videos[i].snippet.thumbnails.medium.url} style={{borderRadius: "10px"}} alt="" ></img>
                                        </a>
                                    </div>

                                    <div className="infoVideo">
                                        <p>titre: {trendInfos.videos[i].snippet.title} </p>
                                        <p>chaine: {trendInfos.videos[i].snippet.channelTitle}</p>
                                        <p>nombre de vue: {trendInfos.videos[i].statistics.viewCount} </p>
                                        <p>nombre de commentaire: {trendInfos.videos[i].statistics.commentCount} </p>
                                        <p>like: {trendInfos.videos[i].statistics.likeCount} | dislike: {trendInfos.videos[i].statistics.dislikeCount}</p>
                                    </div>
                                </div>
                            );
                        }

                        return videolist;
                        })()}
                    </div>
                )
            )}
        </div>
    )
}


import React, { useEffect, useState } from "react";
import  "./_Spotify.css"

// var tokenApiSpotify = "BQAgnfaCFLhiIOjcqLgOUSLfCQXI7IRw6ntl416MDFQ0j29YqXlGKnTtvKMJ0Nnqvc-W7PR6Kt-OdifU6vNAC-4DPOB_cI5XJLyZt5u1kplpwSeds5az9m1oNctS7GDWzRpVJZZG5to9ZmQQwj1R1syufy_jaMIDGZwJngCb7fwKxf3NgymXiY-9rEVjqGrdVbOA5Sl4_YtEHWpIezgzd_gTTGf20t2-4pil_HYecZAnITGfpazepC7qGcSA2l4dV0LA2uwoSb4sTqLS73XkpFKz-c08I-U1HK0"
var tokenApiSpotify = ""

export const Spotify = ({value, updateWidget, index}) => {
    const [nbPlaylist, setNbPlaylist] = useState(value || "");
    const [isActive, setIsActive] = useState(value === "");
    const [spotifyInfos, setSpotifyInfos] = useState({
        nbTotalPlaylist: "",
        limit: "",
        playlist: "",
        erreur: ""
    });

    // callApi()

    useEffect(() => {
        if(value) {
            callApi();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])


    function addtokenSpotify()
    {
        const hash = window.location.hash
        .substring(1)
        .split("&")
        .reduce(function(initial, item) {
        if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
        }, {});
    
        console.log(hash)
        let token = hash.access_token

        if(token) {
            tokenApiSpotify = hash.access_token;
            localStorage.setItem("tokenSpotify", tokenApiSpotify);
             window.location.hash = "";
        }
        else if(localStorage.getItem("tokenSpotify"))
        {
            tokenApiSpotify = localStorage.getItem("tokenSpotify");
        }
    }

    //methode qui fait un call a l'api meteo pour recuperer les information meteorologique.
    async function callApi() {

        addtokenSpotify()

        fetch("https://api.spotify.com/v1/me/playlists?limit=" + value, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + tokenApiSpotify
        }
    })
    .then(response => response.text())
    .then(result => extraireInfo(result))
    .catch(error => console.log('error', error));
    }

    function extraireInfo(playlist)
    {
        let obj = JSON.parse(playlist)

        if(obj.error != null)
        {
            setSpotifyInfos({
                erreur: obj.error.message
            })
            localStorage.removeItem("tokenSpotify")
        }
        else
        {
            setSpotifyInfos({
                nbTotalPlaylist: obj.total,
                limit: obj.limit > obj.total ? obj.total : obj.limit,
                playlist: obj.items,
                erreur:""
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
            callApi();
        },(document.getElementById("timeActualisation").value * 1000))
    }

    addtokenSpotify()

    return (
        <div className="spotify">
            {tokenApiSpotify === "" && localStorage.getItem("tokenSpotify") === null ? (
                <div id="boutonSpotify" style={{marginTop: "3%", marginBottom: "1.5%"}}>
                    <a
                    className="btnLoginSpotify"
                    href={`https://accounts.spotify.com/authorize?client_id=f71a5661b2f040fa8fbf3ccba57a5cdf&redirect_uri=http://localhost:3000/board/&response_type=token&show_dialog=true`}
                    >
                    LOGIN TO SPOTIFY
                    </a>
                </div>
        ) : (
            !isActive ? (
                <div className="parametreWidgetTwitch">
                    <input id="nbPlaylist" value={nbPlaylist} onChange={(e) => setNbPlaylist(e.currentTarget.value)} type="text" name="name" />
                    <button onClick={() => updateWidget(index, nbPlaylist, "nbPlaylist")}>Changer nombre Playlist</button>
                </div>
            ) : (
                spotifyInfos.erreur !== "" ? (
                    <p style={{color: "red"}} >⚠️ { spotifyInfos.erreur } ⚠️</p>
                    ) : (
                <div className="SpotifyDonnee">
                    <p>nombre total de playlist: {spotifyInfos.nbTotalPlaylist}</p>

                    {(() => {
                    const playlist = [];

                    for (let i = 0; i < spotifyInfos.limit; i++) {
                        playlist.push(
                            <div className="playlistInfo">
                                <div className="logoPlaylist"> 
                                    <a title="Lien playlist" href={spotifyInfos.playlist[i].external_urls.spotify} target="_blank" rel="noreferrer">
                                    {spotifyInfos.playlist[i].images.length !== 0 ? (<img src={spotifyInfos.playlist[i].images[0].url } style={{width: "150px", height: "150px", borderRadius: "10px", backgroundColor: "#282828"}} alt="" ></img>) : (<img src="https://www.shareicon.net/data/512x512/2017/02/01/877519_media_512x512.png" style={{width: "150px", height: "150px", borderRadius: "10px"}} alt="" ></img>)}
                                    </a>
                                </div>

                                <div className="infoPlaylist">
                                    <p>nom: {spotifyInfos.playlist[i].name} </p>
                                    {spotifyInfos.playlist[i].description !== "" ? (<p>description: {spotifyInfos.playlist[i].description}</p>) : ("")}
                                    <p>createur: {spotifyInfos.playlist[i].owner.display_name}</p>
                                    <p>nombre de musique: {spotifyInfos.playlist[i].tracks.total}</p>
                                </div>
                            </div>
                        );
                    }

                    return playlist;
                    })()}

                </div>
                )
            )
            )}
        </div>
    )
}
import React, { useEffect, useState } from "react";
import  "./_Instagram.css"

var tokenApiInstagram = ""

export const Instagram = ({value, updateWidget, index}) => {
    const [nbPlaylist, setNbPlaylist] = useState(value || "");
    const [isActive, setIsActive] = useState(value === "");
    const [spotifyInfos, setSpotifyInfos] = useState({
        nbTotalPlaylist: "",
        limit: "",
        playlist: "",
        erreur: ""
    });

    useEffect(() => {
        if(value) {
            callApi();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    //methode qui fait un call a l'api meteo pour recuperer les information meteorologique.
    async function callApi() {

        // https://api.instagram.com/oauth/authorize?client_id=178936407276538&redirect_uri=localhost:3000/board&scope=user_profile&response_type=code
        fetch(" https://graph.facebook.com/v9.0/me?fields=id%2Cname%2Cposts&access_token=EAAfGeLaKOGUBAFBFag6sY0wKEpT5lp08nc8kHYA2Q3PXLEK0SFyqpivKZBjctmGkDdvK0GW7x8MsmEQE85Bywn98wdyCVIOlb8uItlA2GSAWltyRDJncBIwZCGokqzQBZCG3bm9hRHZAV0ejCpv5k2nPyaq9jL00VtJecPZAtQBgBPn1ZCSauWnhmwz53laMEZD", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenApiInstagram
            }
        })
        .then(response => response.text())
        .then(result => extraireInfo(result))
        .catch(error => console.log('error', error));

    }

    function extraireInfo(playlist)
    {
        let obj = JSON.parse(playlist)

        console.log(obj)

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
                limit: obj.limit,
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

    return (
        <div className="spotify">
            {tokenApiInstagram === "" && localStorage.getItem("tokenInstagram") === null ? (
                <div id="boutonInsta" style={{marginTop: "3%", marginBottom: "1.5%"}}>
                    <a
                    className="btnLoginInsta"
                    href={`https://www.facebook.com/v9.0/dialog/oauth?app_id=178936407276538&scope=public_profile,user_posts&version=v9.0&redirect_uri=http://localhost:3000/board`}
                    >
                    LOGIN TO INSTAGRAM
                    </a>
                </div>
                ) : (
                    <p>TKT le widget arrive</p>
                )}
        </div>
    )
}

/** 
 * {tokenApiInstagram === "" && localStorage.getItem("tokenInstagram") === null ? (
                <div id="boutonInsta" style={{marginTop: "3%", marginBottom: "1.5%"}}>
                    <a
                    className="btnLoginInsta"
                    href={`https://api.instagram.com/oauth/authorize
                            ?client_id=178936407276538,
                            &redirect_uri=http://localhost:3000/board,
                            &response_type=code,
                            &scope=user_profile,user_media`}
                    >
                    LOGIN TO INSTAGRAM
                    </a>
                </div>
                ) : (
                    <p>TKT le widget arrive</p>
                )}
 */

 //AQAjJR0CHPW-ly2zlFGbE88oHv8TCFJhfTuvY0DZq9JLrlecJdAU6yGmnB1tfYhDb_avAhJSrPt9uGMh17WxBZ6BqYoyWiD-JuY_xh55Wi9IeyUAc_-PYEDSJ1nizHRoKt4k9i704KilBnLYbKRiMW5aeAYYZQ18DeteW15wtOR0zYntr-Fj33KDqZz4tc4zEh8y6ZiebQPDvSaYT9Ain-a4OXx-I3mZIdBcH8QQ4l07cdkBbnhVzQ0ZLU8Xssxts3ke8hcQ6tWQ4SVIBYFMNgkK7Kj7-Ci1sbFIra_6YJJYddPaFG4f481P5Rcj_x5gvlTlN-zbiywb20fe14WsXo3q#_=_
 //AQCvHKmDxpitJACiY-kLbB4lbGMIsNDctMVywSCjzdBO8K6baFCCbv6GCi2el6NcJ0G3E3otMIRWi6JvAeHRfTZdXgjbJuPsu3E7ASjbkCMyDlNnRUBskTPMN0Yuprgif_XW8yOeT6sjFh_pMZBEeRMYOFTyt8yiv8n1NVxilZ2qiKbhuwH4wGaKO6bhHZCxyu_HHLM8PiImx-7HC7UMoC9cgk1-DzmuuGPKLS6OlNks1I7yHQJ8Ciks-wt8d206SFRmVXPxEpGNlRs0qxevpDYK4Q8Imu9z4nbmQtmkbPgHZLcDW9PwOabp2WsPa7pfQ3TXJimKTXeklhGG0QVOd7Tt#_=_

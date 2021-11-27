import React, { useEffect, useState } from "react";

//token Connexion Twitter
const tokenApiTwitter = "AAAAAAAAAAAAAAAAAAAAAB24KQEAAAAAZLQVu3e65n%2FRBcEUWk9rTIbsFE8%3DFPpBjVUUFzjg5qqLsSJFT6N3YOpTkreYvIkZ5czeYR1wcKBDf5"

//svg logo certif twitter
const certifLogo = <svg viewBox="0 0 24 24" aria-label="Compte certifié" class="r-jwli3a r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-dnmrzs r-bnwqim r-1plcrui r-lrvibr" style={{width: "20px", fill: "#3498DB"}}><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>

//svg logo compte priver
const protecLogo = <svg viewBox="0 0 24 24" aria-label="Compte protégé" class="r-jwli3a r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-dnmrzs r-bnwqim r-1plcrui r-lrvibr" style={{width: "20px", fill: "red"}}><g><path d="M19.75 7.31h-1.88c-.19-3.08-2.746-5.526-5.87-5.526S6.32 4.232 6.13 7.31H4.25C3.01 7.31 2 8.317 2 9.56v10.23c0 1.24 1.01 2.25 2.25 2.25h15.5c1.24 0 2.25-1.01 2.25-2.25V9.56c0-1.242-1.01-2.25-2.25-2.25zm-7 8.377v1.396c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.396c-.764-.3-1.307-1.04-1.307-1.91 0-1.137.92-2.058 2.057-2.058 1.136 0 2.057.92 2.057 2.056 0 .87-.543 1.61-1.307 1.91zM7.648 7.31C7.838 5.06 9.705 3.284 12 3.284s4.163 1.777 4.352 4.023H7.648z"></path></g></svg>

//convert mois anglais vers francais
const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

//convert jour anglais vers francais
const jours = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]


export const Twitter = ({value, updateWidget, index}) => {
    const [account, setAccount] = useState(value || "");
    const [isActive, setIsActive] = useState(value === "");
    const [accountInfos, setAccountInfos] = useState({
            CompteUrl: "",
            nom: "",
            verified: "",
            protected: "",
            description: "",
            nbFriend: "",
            nbFollow: "",
            nbFav: "",
            localisation: "",
            date: "",
            url: "",
            urlName: "",
            tweet: "",
            dateTweet: "",
            erreur: ""
    });

    useEffect(() => {
        if(value) {
            changeCompte();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])


//methode qui fait un call a l'api meteo pour recuperer les information meteorologique.
function changeCompte() {

    fetch("https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/users/show.json?screen_name=" + value, {
        "method": "GET",
        "headers": {
            "Authorization": "bearer " + tokenApiTwitter,
        }
    })
    .then(response => response.text())
    .then(result => testCompte(result))
    .catch(error => console.log('error', error));

}

function testCompte(compte)
{
    let obj = JSON.parse(compte)

    if(obj.errors != null)
    {
        setAccountInfos({
            erreur: obj.errors[0].message
        })
        setIsActive(true);
        updateWidget(index, )
        refreshWidget()
    }
    else
    {
        extraireInfoCompte(obj)
    }
}

//methode qui extrait les donnée de twitter pour afficher les information sur le compte
function extraireInfoCompte(obj)
{
    const date = new Date(obj.created_at);

    if(obj.status != null)
    {
        const lastTweet = new Date(obj.status.created_at);

        setAccountInfos({
            CompteUrl: `https://twitter.com/${obj.screen_name}`,
            nom: obj.name,
            verified: obj.verified,
            protected: obj.protected,
            description: obj.description,
            nbFriend: obj.friends_count,
            nbFollow: obj.followers_count,
            nbFav: obj.favourites_count,
            localisation: obj.location,
            date: `${ jours[date.getDay() - 1] +" "+ date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear() }`,
            url: obj.url == null ? "" : obj.url,
            urlName: obj.url == null ? "" : obj.entities.url.urls[0].display_url,
            tweet: obj.status.text,
            dateTweet: `${ jours[lastTweet.getDay() - 1] +" "+ lastTweet.getDate() +" "+ months[lastTweet.getMonth()] +" "+ lastTweet.getFullYear() }`,
            erreur: ""
        })
    }
    else{
        setAccountInfos({
            CompteUrl: `https://twitter.com/${obj.screen_name}`,
            nom: obj.name,
            verified: obj.verified,
            protected: obj.protected,
            description: obj.description,
            nbFriend: obj.friends_count,
            nbFollow: obj.followers_count,
            nbFav: obj.favourites_count,
            localisation: obj.location,
            date: `${ jours[date.getDay() - 1] +" "+ date.getDate() +" "+ months[date.getMonth()] +" "+ date.getFullYear() }`,
            url: obj.url == null ? "" : obj.url,
            urlName: obj.url == null ? "" : obj.entities.url.urls[0].display_url,
            tweet: "",
            dateTweet: "",
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
            changeCompte();
        },(document.getElementById("timeActualisation").value * 1000))
    }

    return (
        <div className="twitter">
            {!isActive ? (
                <div className="parametreWidgetTwitter">
                    <input id="nomCompte" value={account} onChange={(e) => setAccount(e.currentTarget.value)} type="text" name="name" />
                    <button onClick={() => updateWidget(index, account, "account")}>Changer compte</button>
                </div>
            ) : (
                accountInfos.erreur !== "" ? (
                    <div className="parametreWidgetTwitter">
                        <p style={{color: "red"}} >⚠️ { accountInfos.erreur } ⚠️</p>
                        <input id="nomCompte" value={account} onChange={(e) => setAccount(e.currentTarget.value)} type="text" name="name" />
                        <button onClick={() => updateWidget(index, account, "account")}>Changer compte</button>
                    </div>
                    ) : (
                    <div className="twitterDonnee">
                        <h1>
                            <a title="Lien du compte" href={accountInfos.CompteUrl} target="_blank" rel="noreferrer" style={{textDecoration: "none", color: "black"}} >
                            { accountInfos.nom } 
                            </a>
                            {accountInfos.verified === true ? ( certifLogo ) : ( "" )} 
                            {accountInfos.protected === true ? ( protecLogo ) : ( "" )} 
                        </h1>

                        <p>{ accountInfos.description }</p>
                        <p>{ accountInfos.nbFriend } abonnements  |  { accountInfos.nbFollow } abonnés  |  { accountInfos.nbFav } tweet liker</p>
                        { accountInfos.localisation === "" ? ( "" ) : ( <p>Localisation: {accountInfos.localisation} </p> )}
                        <p>Compte crée le { accountInfos.date } </p>
                        {accountInfos.url != null ? ( <p>Url: <a title="lien bio twitter" href={accountInfos.url}> {accountInfos.urlName} </a></p> ) : ("")}
                        {accountInfos.tweet === "" ? ( "" ) : (
                            <div className="tweet">
                                <h4>Dernier tweet le {accountInfos.dateTweet} :</h4>
                                <p>➜ {accountInfos.tweet}</p>
                            </div>
                        )}
                    </div>
                )
            )}
        </div>
    )
}




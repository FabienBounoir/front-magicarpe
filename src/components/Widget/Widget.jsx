import React, { useEffect, useState } from "react";

import { Ellipsis } from "../Ellipsis/Ellipsis";
import { widgets } from "./widgets.json";
import { Weather } from "../WidgetWeather/Weather";
import { Twitch } from "../WidgetTwitch/Twitch";
import { YoutubeChannel } from "../WidgetYoutubeChannel/YoutubeChannel";
import { YoutubeTrend } from "../WidgetYoutubeTrend/YoutubeTrend";
import { Steam } from "../WidgetSteam/Steam";
import { Covid } from "../WidgetCovid/Covid";
import { Twitter } from "../WidgetTwitter/Twitter";
import { Spotify } from "../WidgetSpotify/Spotify";
import { Instagram } from "../WidgetInstagram/Instagram";
import { Modal } from "../Modal/Modal";

export const Widget = ({ name, widget, deleteWidget, index, updateWidget }) => {
    const widgetInfos = widgets[name] || null;
    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState(widget.channel || widget.city || widget.country || widget.account || "");
    const [prop, setProp] = useState("");

    useEffect(() => {
        switch (widget.name) {
            case "YOUTUBECHANNEL": case "TWITCH":
                setProp("channel");
                break;
            case "YOUTUBETREND":
                setProp("acronymePays");
                break;
            case "WEATHER":
                setProp("city");
                break;
            case "STEAM": case "TWITTER":
                setProp("account");
                break;
            case "SPOTIFY":
                setProp("nbPlaylist");
                break;
            case "COVID":
                setProp("country");
                break;
            default:
                break;
        }
    }, [widget])

    return (
        <div className="widget">
            {isVisible && (
                <Modal setIsVisible={setIsVisible}>
                    <input value={value} onChange={e => setValue(e.currentTarget.value)} />
                    <button onClick={() => updateWidget(index, value, prop)}>Modifier</button>
                </Modal>
            )}
            <h3 className="widget__title">
                { widgetInfos.title } Widget
            </h3>
            <div 
                className="widget__border"
                style={{
                    background: widgetInfos.color
                }}
            >
                <div className="widget__content">
                    <img src={`/svgs/${name == "youtubechannel" || name == "youtubetrend" ? "youtube" : name }.svg`} className="widget__icon" alt="" />
                    <Ellipsis color={widgetInfos.color} options={[
                        {
                            color: widgetInfos.color,
                            label: "Modifier",
                            action: () => { setIsVisible(true) }
                        },
                        {
                            color: "#F04B4B",
                            label: "Supprimer",
                            action: () => { deleteWidget(widget.id) },
                            icon: "bin"
                        }]} 
                    />

                    {/* <Spotify value={value} index={index} updateWidget={updateWidget} /> */}
                    { renderContent(name, index, updateWidget, widget[prop]) }

                </div>
            </div>
        </div>
    )
}

//choisi le contenue du widget suivant le widget
function renderContent(param, index, updateWidget, value) {
    switch(param) {
    case 'weather':
        return <Weather value={value} index={index} updateWidget={updateWidget} />;
    case 'twitch':
        return <Twitch value={value} index={index} updateWidget={updateWidget} />;
    case 'youtubechannel':
        return <YoutubeChannel value={value} index={index} updateWidget={updateWidget} />;
    case 'youtubetrend':
        return <YoutubeTrend value={value} index={index} updateWidget={updateWidget} />;
    case 'steam':
        return <Steam value={value} index={index} updateWidget={updateWidget} />;
    case 'covid':
        return <Covid value={value} index={index} updateWidget={updateWidget} />;
    case 'twitter':
        return <Twitter value={value} index={index} updateWidget={updateWidget} />;
    case 'spotify':
        return <Spotify value={value} index={index} updateWidget={updateWidget} />;
    case 'instagram':
        return <Instagram value={value} index={index} updateWidget={updateWidget} />;
    default:
        return <p>pas encore fait</p>;
    }
}
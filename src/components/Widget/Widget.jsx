import React from "react";

import { Ellipsis } from "../Ellipsis/Ellipsis";
import { widgets } from "./widgets.json";
import { Weather } from "../WidgetWeather/Weather";
import { Twitch } from "../WidgetTwitch/Twitch";
import { Youtube } from "../WidgetYoutube/Youtube";
import { Steam } from "../WidgetSteam/Steam";
import { Covid } from "../WidgetCovid/Covid";
import { Twitter } from "../WidgetTwitter/Twitter";

export const Widget = ({ name }) => {
    const widgetInfos = widgets[name] || null;
    return (
        <div className="widget">
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
                    <img src={`/svgs/${name}.svg`} className="widget__icon" alt="" />
                    <Ellipsis color={widgetInfos.color} />

                    {/* <Weather /> */}
                    {/* <Twitch /> */}

                    { renderContent(name) }

                </div>
            </div>
        </div>
    )
}

//choisi le contenue du widget suivant le widget
function renderContent(param) {
    switch(param) {
    case 'weather':
        return <Weather />;
    case 'twitch':
        return <Twitch />;
    case 'youtube':
        return <Youtube />;
    case 'steam':
        return <Steam />;
    case 'covid':
        return <Covid />;
    case 'twitter':
        return <Twitter />;
    default:
        return <p>pas encore fait</p>;
    }
}
import React from "react";
import "./_Nav.css";

export const Nav = () => {
    return (
        <header>
            <nav>
                <ul id="menu">
                <li><h3>Magic Dashboard</h3></li>
                <li><p>Temps d'actualisation: <input id="timeActualisation" type="number" min="10" defaultValue="60" /> (seconde)</p></li>
                </ul>
                <button id="connexion" >connection</button>
            </nav>
        </header>
    )
}
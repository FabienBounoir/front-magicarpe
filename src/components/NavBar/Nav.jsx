import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import "./_Nav.css";

export const Nav = () => {

    let { isConnected, setIsConnected } = useContext(userContext);

    const handleDisconnect = () => {
        localStorage.removeItem("token");
        setIsConnected(false);
    }

    return (
        <header>
            <nav>
                <ul id="menu">
                <li><h3>Magic Dashboard</h3></li>
                <li><p>Temps d'actualisation: <input id="timeActualisation" type="number" min="10" defaultValue="60" /> (seconde)</p></li>
                </ul>
                <Link to="/">
                    <button id="accueil">Accueil</button>
                </Link>
                {!isConnected ? (
                    <div>
                        <Link to="/login">
                            <button id="connexion">Connexion</button>
                        </Link>
                        <Link to="/register">
                            <button id="register">Inscription</button>
                        </Link>
                    </div>
                ) : (
                    <div>
                        <Link to="/board">
                            <button id="board" >Board</button>
                        </Link>
                        <button id="deconnexion" onClick={handleDisconnect}>Se déconnecter</button>
                    </div>
                )}
            </nav>
        </header>
    )
}
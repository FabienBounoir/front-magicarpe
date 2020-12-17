import React from "react";

import { Nav } from "../components/NavBar/nav";
import { Login } from "./pages/Login/Login";
import { Widget } from "../components/Widget/Widget";

export const App = () => {
    return (
        <div>
            <Nav />
            <Login />

            <Widget name="weather" />
            <Widget name="twitch" />
            <Widget name="youtube" />
            <Widget name="steam" />
            <Widget name="twitter" />
            <Widget name="covid" />
        </div>
    )
}
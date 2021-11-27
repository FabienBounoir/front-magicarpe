import React, { useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Nav } from "../components/NavBar/Nav";
import { userContext } from "../context/UserContext";
import { Board } from "./pages/Board/Board";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";

export const App = () => {
    let { isConnected } = useContext(userContext);
    
    return (
        <div>
            <BrowserRouter>
                <Nav />
                {!isConnected ? (
                    <div>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                    </div>
                ) : (
                    <Route path="/board">
                        <Board />
                    </Route>
                )}
                <Route path="/">
                    <Home />
                </Route>
            </BrowserRouter>
        </div>
    )
}
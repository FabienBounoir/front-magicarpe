import React from "react";
import { render } from "react-dom";

import { App } from "./app/App";
import { UserProvider } from "./context/UserContext";

import "./style.css";

render(<UserProvider> <App /> </UserProvider>, document.getElementById('root'));
import React, { useState, useContext } from "react";
import { Input } from "../../../components/Input/Input";
import { userContext } from "../../../context/UserContext";
import { useHistory } from "react-router-dom";

export const Login = () => {
    let history = useHistory();

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const { setIsConnected } = useContext(userContext);

    const [error, setError] = useState("");

    const handleChange = (prop, value) => {
        setError("");
        let modifiedUser = {...user};
        modifiedUser[prop] = value;
        setUser(modifiedUser);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let res = await fetch("http://localhost:8080/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .catch(err => console.log(err));

        if(res && res.accessToken) {
            localStorage.setItem("token", `${res.tokenType} ${res.accessToken}`);
            setIsConnected(true);
            history.push("/board");
        }
        else setError("Une erreur est survenue.");
    }

    return (
        <form onSubmit={handleSubmit} className="login">
            <Input value={user.username} onChange={(value) => handleChange("username", value)} placeholder="Username" error={error} />
            <Input value={user.password} onChange={(value) => handleChange("password", value)} placeholder="Password" type="password" error={error} />
            <button type="submit">Se connecter</button>
        </form>
    );
}
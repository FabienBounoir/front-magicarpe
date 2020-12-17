import React, { useState } from "react";
import { Input } from "../../../components/Input/Input";

export const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const handleChange = (prop, value) => {
        let modifiedUser = {...user};
        modifiedUser[prop] = value;
        setUser(modifiedUser);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // let res = await fetch("localhost:8080/api/auth/signup", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(user)
        // })
        // res = res.json();
        // console.log(res);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(user);

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/auth/signin", requestOptions)
        .then(result => console.log(result.json()))
        .catch(error => console.log('error', error));
    }

    return (
        <form onSubmit={handleSubmit} className="login">
            <Input value={user.username} onChange={(value) => handleChange("username", value)} placeholder="Username" />
            <Input value={user.password} onChange={(value) => handleChange("password", value)} placeholder="Password" type="password" />
            <button type="submit">Se connecter</button>
        </form>
    );
}
import React, { useState } from "react";
import { Input } from "../../../components/Input/Input";

export const Register = () => {
    const [newUser, setNewUser] = useState({
        username: "",
        mail: "",
        password: ""
    });

    const handleChange = (prop, value) => {
        let modifiedUser = {...newUser};
        modifiedUser[prop] = value;
        setNewUser(modifiedUser);
    }

    const handleSubmit = () => {

    }

    return (
        <form onSubmit={handleSubmit} className="register">
            <Input value={newUser.username} placeholder="Username" onChange={(value) => handleChange("username", value)} />
            <Input value={newUser.email} placeholder="Email" onChange={(value) => handleChange("email", value)} />
            <Input value={newUser.password} placeholder="Password" type="password" onChange={(value) => handleChange("password", value)} />
            <button type="submit">S'inscrire</button>
        </form>
    )
}
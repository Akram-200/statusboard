import React, { useState } from "react";

function LoginForm({ onJoin }) {
    const [name, setName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (name.trim() === "") {
            alert("Veuillez entrer votre nom");
            return;
        }

        onJoin(name);
    }

    return (
        <div className="login-page">
            <form className="login-box" onSubmit={handleSubmit}>
                <div className="logo">S</div>
                <h2>StatusBoard</h2>
                <p>Entrez votre nom pour rejoindre</p>

                <input
                    type="text"
                    placeholder="Votre nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button type="submit">Rejoindre</button>
            </form>
        </div>
    );
}

export default LoginForm;
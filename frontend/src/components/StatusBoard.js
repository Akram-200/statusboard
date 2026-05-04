import React, { useState } from "react";
import MemberCard from "./MemberCard";

function StatusBoard({
                         name,
                         members,
                         history,
                         messages,
                         onChangeStatus,
                         onSendMessage
                     }) {
    const [message, setMessage] = useState("");

    const onlineCount = members.filter((m) => m.status === "En ligne").length;
    const absentCount = members.filter((m) => m.status === "Absent").length;
    const busyCount = members.filter((m) => m.status === "Occupé").length;

    function handleSend(e) {
        e.preventDefault();

        if (message.trim() !== "") {
            onSendMessage(message);
            setMessage("");
        }
    }

    return (
        <div className="app">
            <header>
                <h1>StatusBoard</h1>
                <p>Connecté : {name}</p>
            </header>

            <div className="layout">
                <aside>
                    <h3>STATUTS</h3>
                    <p className="green">En ligne : {onlineCount}</p>
                    <p className="yellow">Absent : {absentCount}</p>
                    <p className="red">Occupé : {busyCount}</p>
                </aside>

                <main>
                    <h2>Membres connectés</h2>

                    <div className="members">
                        {members.map((member) => (
                            <MemberCard
                                key={member.id}
                                member={member}
                                currentName={name}
                                onChangeStatus={onChangeStatus}
                            />
                        ))}
                    </div>

                    <section>
                        <h2>Message global</h2>

                        <form className="message-form" onSubmit={handleSend}>
                            <input
                                type="text"
                                placeholder="Écrire un message global"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                            <button type="submit">Envoyer</button>
                        </form>

                        <div className="messages">
                            {messages.map((msg, index) => (
                                <p key={index}>{msg}</p>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2>Historique des évènements</h2>

                        <ul className="history">
                            {history.map((event, index) => (
                                <li key={index}>{event}</li>
                            ))}
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default StatusBoard;
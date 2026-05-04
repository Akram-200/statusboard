import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LoginForm from "./components/LoginForm";
import StatusBoard from "./components/StatusBoard";
import "./App.css";

const socket = io("http://localhost:3001");

function App() {
    const [name, setName] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [members, setMembers] = useState([]);
    const [history, setHistory] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("members:update", (data) => {
            setMembers(data);
        });

        socket.on("history:update", (data) => {
            setHistory(data);
        });

        socket.on("messages:update", (data) => {
            setMessages(data);
        });

        return () => {
            socket.off("members:update");
            socket.off("history:update");
            socket.off("messages:update");
        };
    }, []);

    function joinBoard(userName) {
        setName(userName);
        setIsConnected(true);
        socket.emit("user:join", { name: userName });
    }

    function changeStatus(status) {
        socket.emit("status:change", { status });
    }

    function sendMessage(message) {
        socket.emit("message:send", { message });
    }

    return (
        <div>
            {!isConnected ? (
                <LoginForm onJoin={joinBoard} />
            ) : (
                <StatusBoard
                    name={name}
                    members={members}
                    history={history}
                    messages={messages}
                    onChangeStatus={changeStatus}
                    onSendMessage={sendMessage}
                />
            )}
        </div>
    );
}

export default App;
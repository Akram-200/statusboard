const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let members = [];
let history = [];
let messages = [];

function getTime() {
    const now = new Date();
    return now.toLocaleTimeString("fr-CA", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function sendUpdate() {
    io.emit("members:update", members);
    io.emit("history:update", history);
    io.emit("messages:update", messages);
}

io.on("connection", (socket) => {
    console.log("Utilisateur connecté :", socket.id);

    socket.on("user:join", (data) => {
        const name = data.name;

        const member = {
            id: socket.id,
            name: name,
            status: "En ligne"
        };

        members.push(member);

        history.push(`${name} a rejoint le board à ${getTime()}`);

        sendUpdate();
    });

    socket.on("status:change", (data) => {
        const member = members.find((m) => m.id === socket.id);

        if (member) {
            member.status = data.status;
            history.push(`${member.name} a changé son statut vers ${data.status} à ${getTime()}`);
            sendUpdate();
        }
    });

    socket.on("message:send", (data) => {
        const member = members.find((m) => m.id === socket.id);

        if (member && data.message.trim() !== "") {
            messages.push(`${member.name} : ${data.message}`);
            sendUpdate();
        }
    });

    socket.on("disconnect", () => {
        const member = members.find((m) => m.id === socket.id);

        if (member) {
            history.push(`${member.name} a quitté le board à ${getTime()}`);
        }

        members = members.filter((m) => m.id !== socket.id);

        sendUpdate();

        console.log("Utilisateur déconnecté :", socket.id);
    });
});

app.get("/", (req, res) => {
    res.send("StatusBoard backend fonctionne");
});

server.listen(3001, () => {
    console.log("Serveur démarré sur le port 3001");
});
import React from "react";

function MemberCard({ member, currentName, onChangeStatus }) {
    const isMe = member.name === currentName;

    return (
        <div className="member-card">
            <div className="member-top">
                <div className="avatar">{member.name.charAt(0).toUpperCase()}</div>

                <div>
                    <h3>{member.name}</h3>
                    <p>{isMe ? "Vous" : "Membre"}</p>
                </div>
            </div>

            <span className={"status " + member.status.toLowerCase().replace("é", "e")}>
        {member.status}
      </span>

            {isMe && (
                <div className="status-buttons">
                    <button onClick={() => onChangeStatus("En ligne")}>En ligne</button>
                    <button onClick={() => onChangeStatus("Absent")}>Absent</button>
                    <button onClick={() => onChangeStatus("Occupé")}>Occupé</button>
                </div>
            )}
        </div>
    );
}

export default MemberCard;
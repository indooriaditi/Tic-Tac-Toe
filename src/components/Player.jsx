import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onNameChange }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function isEditClicked() {
    setIsEditing((editing) => !editing);
    
    if(isEditing) {
      onNameChange(symbol, playerName);
    }
  }

  function saveChanges(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let buttonvalue = "Edit";

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={saveChanges} />
    );
    buttonvalue = "Save";
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={isEditClicked}>{buttonvalue}</button>
    </li>
  );
}

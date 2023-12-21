import React, {ReactElement, SetStateAction, useState} from "react";

interface PlayerProps {
    initialName: string,
    symbol: string,
    isActive: boolean,
    onChangeName: Function
}

export default function Player({initialName, symbol, isActive, onChangeName}: PlayerProps): React.JSX.Element {
    const [isEditing, setIsEditing]: [boolean, React.Dispatch<SetStateAction<boolean>>] = useState(false);
    const [playerName, setPlayerName]: [string, React.Dispatch<SetStateAction<string>>] = useState(initialName);

    let editablePlayerName: ReactElement;
    function handleEditClick(): void {
        setIsEditing((editing: boolean) => !editing);

        if (isEditing) {
            onChangeName(symbol, playerName);
        }

    }

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setPlayerName(event.target.value)
    }

    if (!isEditing) {
        editablePlayerName = <span className="player-name">{playerName}</span>;
    } else {
        editablePlayerName = <input className="player-input" type="text" required
                                    value={playerName} onChange={handleOnChange}/>
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span id="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}
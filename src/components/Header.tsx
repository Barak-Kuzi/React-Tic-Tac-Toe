import React from 'react';
import logo from "../assets/game-logo.png"

export default function Header(): React.JSX.Element {
    return (
        <header>
            <img src={logo} alt="game-logo"/>
            <h1>Tic-Tac-Toe</h1>
        </header>
    );
}
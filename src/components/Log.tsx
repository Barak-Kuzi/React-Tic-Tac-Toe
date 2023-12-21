import React from "react";

import {Turns} from "../App"

export interface LogProps {
    turns: Turns[]
}

export default function Log({turns}: LogProps): React.JSX.Element {
    return (
      <ol id="log">
          {turns.map((turn: Turns) => (
              <li key={`${turn.square.row},${turn.square.col}`}>
                  {`${turn.playerSymbol} selected ${turn.square.row},${turn.square.col}`}
              </li>
          ))}
      </ol>
    );
}
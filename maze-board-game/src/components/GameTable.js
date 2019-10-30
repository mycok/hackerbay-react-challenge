import React from 'react';

import Game from './Game';

const gamePrompt = (message) => {
    let value = parseInt(prompt(message));
    while (isNaN(value) || value <= 0 || value > 12) {
        value = parseInt(prompt(message))
    }
    return value;
}

const GameTable = () => {
        let rows = gamePrompt('Enter a row number between 1 and 12');
        let columns = gamePrompt('Enter a column number between 1 and 12');

        let newColumns = 0;

        if (columns > rows) {
            newColumns = rows;
            rows = columns;
        } else {
            newColumns = columns;
        }

    return (
        <Game rows={rows || 0} columns={newColumns || 0} />
    ) 
}

export default GameTable;

import React from 'react';
import PropTypes from 'prop-types';

import Box from './Box';
import '../assets/css/board.css';
import player from '../assets/images/transformer.jpg';
import sprite from '../assets/images/sprite.jpg';

const Board = ({
    rows,
    columns,
    forwardRef,
    handleKeyPress,
    userPosition,
    spriteIndices,
    ...props
}) => {
    const rowsArray = Array(rows).fill();
    return (
        rowsArray.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="board">
                <Box
                    {...props}
                    columns={columns}
                    buttonRef={forwardRef}
                    key={`box-${rowIndex}`}
                    value={player}
                    sprite={sprite}
                    rowIndex={rowIndex}
                    userPosition={userPosition}
                    spriteIndices={spriteIndices}
                    handleKeyPress={handleKeyPress}
                />
            </tr>
        ))
    )
};

Board.propTypes = {
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    forwardRef: PropTypes.instanceOf(Object),
    userPosition: PropTypes.instanceOf(Array).isRequired,
    spriteIndices: PropTypes.instanceOf(Object),
    handleKeyPress: PropTypes.func.isRequired,
}

Board.defaultProps = {
    value: null,
    buttonRef: null,
    spriteIndices: {}
};


export default Board;

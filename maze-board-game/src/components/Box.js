import React from 'react';
import PropTypes from 'prop-types';

import '../assets/css/box.css';

const Box = ({
    columns,
    value,
    sprite,
    buttonRef,
    rowIndex,
    userPosition,
    spriteIndices,
    handleKeyPress,
    ...props
}) => {
    const columnsArray = Array(columns).fill();
    return (
        columnsArray.map((column, columnIndex) => (
            <td className="box" key={`column-${columnIndex}`} {...props}>
                <button
                    className="button"
                    onKeyUp={handleKeyPress}
                    ref={rowIndex === userPosition[0] && columnIndex === userPosition[1] ? buttonRef : null}
                >
                    {
                        value && rowIndex === userPosition[0] && columnIndex === userPosition[1] && <img src={value} alt="" style={{ width: '30px', height: '30px' }} />
                    }
                    {
                        sprite && spriteIndices[JSON.stringify([rowIndex, columnIndex])] && <img src={sprite} alt="" style={{ width: '30px', height: '30px' }} />
                    }
                </button>
            </td>
        ))
    )
}

Box.propTypes = {
    value: PropTypes.string,
    columns: PropTypes.number.isRequired,
    sprite: PropTypes.string,
    buttonRef: PropTypes.instanceOf(Object),
    rowIndex: PropTypes.number.isRequired,
    userPosition: PropTypes.instanceOf(Array).isRequired,
    spriteIndices: PropTypes.instanceOf(Object),
    handleKeyPress: PropTypes.func.isRequired,
};

Box.defaultProps = {
    value: null,
    buttonRef: null,
    sprite: '',
    spriteIndices: {}
};

export default Box;

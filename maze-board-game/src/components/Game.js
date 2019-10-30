import React, { Component } from 'react';
import ArrowKeysReact from 'arrow-keys-react';

import Board from './Board';
import popper from '../utils/popper';
import GameTable from './GameTable';
import '../assets/css/container.css';

class Game extends Component {
    constructor(props) {
        super(props);
        const { rows, columns } = props;
        this.localRef = React.createRef();
        this.state = {
            rows,
            columns,
            userPosition: [Math.floor(rows / 2), Math.floor(columns / 2)],
            arrowKeyDirection: '',
            totalMoves: 0,
            spriteIndices: {},
            restart: false,
        };
        ArrowKeysReact.config({
            left: () => {
                this.handleArrowKeys('left');
            },
            right: () => {
                this.handleArrowKeys('right');
            },
            up: () => {
                this.handleArrowKeys('up');
            },
            down: () => {
                this.handleArrowKeys('down');
            }
        });
    }

    randomize = number => Math.floor(Math.random(number) * number + 0);

    componentDidMount() {
        const { rows, columns } = this.props;
        const { userPosition, spriteIndices } = this.state;
        const updatedSpriteIndices = { ...spriteIndices };
        const minValue = Math.min(rows, columns)

        for (let index = 0; index < minValue; index++) {
            const [rowIndex, columnIndex] = this.generateRandomSpriteIndices(rows, columns, userPosition, spriteIndices);
            updatedSpriteIndices[JSON.stringify([rowIndex, columnIndex])] = true;
        }
        this.localRef.current.focus();
        this.setState({ spriteIndices: updatedSpriteIndices });
    }

    generateRandomSpriteIndices = (rows, columns, userPosition, spriteIndices) => {
        const rowIndex = this.randomize(rows);
        const columnIndex = this.randomize(columns);
        const spritePosition = JSON.stringify([rowIndex, columnIndex]);

        if ((userPosition[0] !== rowIndex || userPosition[1] !== columnIndex) && !spriteIndices[spritePosition]) {
            return [rowIndex, columnIndex];
        }
        return this.generateRandomSpriteIndices(rows, columns, userPosition, spriteIndices);
    }

    handleSpriteDisplacement = (position) => {
        const { spriteIndices, totalMoves } = this.state;
        const updatedSpriteIndices = { ...spriteIndices };

        const positionObject = JSON.stringify([position[0], position[1]]);
        if (updatedSpriteIndices[positionObject]) delete updatedSpriteIndices[positionObject];

        if (Object.keys(updatedSpriteIndices).length <= 0) {
            popper(`You won with ${totalMoves} moves!`, 'success', this.restartGame);
        }
        this.setState({ spriteIndices: updatedSpriteIndices });
    }

    handleKeyPress = () => {
        const { arrowKeyDirection, userPosition, totalMoves, rows, columns } = this.state;
        let newUserPosition = userPosition.slice();
        let currentMoves = totalMoves;

        if (arrowKeyDirection === 'up') {
            newUserPosition[0] = newUserPosition[0] - 1 >= 0 ? newUserPosition[0] - 1 : newUserPosition[1];
            currentMoves += 1;

        } else if (arrowKeyDirection === 'down') {
            newUserPosition[0] = newUserPosition[0] + 1 < rows ? newUserPosition[0] + 1 : newUserPosition[1];
            currentMoves += 1;

        } else if (arrowKeyDirection === 'right') {
            newUserPosition[1] = newUserPosition[1] + 1 < columns ? newUserPosition[1] + 1 : newUserPosition[0];
            currentMoves += 1;

        } else {
            newUserPosition[1] = newUserPosition[1] - 1 >= 0 ? newUserPosition[1] - 1 : newUserPosition[0];
            currentMoves += 1;
        }

        this.handleSpriteDisplacement(newUserPosition)
        this.setState({ userPosition: newUserPosition, totalMoves: currentMoves }, () => this.localRef.current.focus());
    }

    handleArrowKeys = (direction) => {
        return this.setState({ arrowKeyDirection: direction });
    }

    restartGame = () => this.setState({ restart: true })

    render() {
        const { rows, columns } = this.props;
        const { userPosition, spriteIndices, restart } = this.state;

        return (
                restart ? <GameTable /> : (
                    <table className="container">
                    <tbody>
                        <Board
                            {...ArrowKeysReact.events}
                            forwardRef={this.localRef}
                            rows={rows}
                            columns={columns}
                            userPosition={userPosition}
                            spriteIndices={spriteIndices}
                            handleKeyPress={this.handleKeyPress}
                        />

                    </tbody>
                </table>
                )
        )
    }
}

export default Game;

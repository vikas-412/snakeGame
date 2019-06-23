import React, { Component } from 'react';
import { LEFT, RIGHT, UP, DOWN, LEFT_KEY_CODE, RIGHT_KEY_CODE, UP_KEY_CODE, DOWN_KEY_CODE } from '../constants';

const snakeAtStart = {
    x: 0,
    y: 0,
    direction: RIGHT
}
class PlayGround1 extends Component {
    constructor() {
        super();
        this.state = {
            rows: 13,
            cols: 20,
            snakePos: {
                ...snakeAtStart
            },
            foodPos : {
                x : null,
                y : null
            }
        }
    }

    moveSnake = () => {
        const { direction, x, y } = this.state.snakePos;
        let nextPos = {};
        switch (direction) {
            case LEFT: {//use break in evry case as if break is not used, it will continue to wait for the other condition which are next
                nextPos = {
                    x: x,
                    y: y - 1
                }
                break;
            }
            case RIGHT: {
                nextPos = {
                    x: x,
                    y: y + 1
                }
                break;
            }
            case UP: {
                nextPos = {
                    x: x - 1,
                    y: y
                }
                break;
            }
            case DOWN: {
                nextPos = {
                    x: x + 1,
                    y: y
                }
                break;
            }
        }
        if (this.checkGameOver(nextPos)) {
            this.resetGame();
            alert("GAME OVER!");
        }
        else {
            this.setState({
                snakePos: {
                    ...nextPos,
                    direction: direction
                }
            })
        }
    }

    resetGame = () => {
        this.setState({//or use Object.assign(this.state{}) when error with this.setState
            snakePos: {
                ...snakeAtStart
            }
        })
    }

    generateFood = () => {
        const { rows, cols } = this.state;
        const x = Math.floor(Math.random() * rows);
        const y = Math.floor(Math.random() * cols);
        this.setState({foodPos:{
            x,
            y
        }})
    }
        

    changeDirection = (event) => {
        const { snakePos } = this.state;
        const keyCode = event.keyCode;
        switch (keyCode) {
            case LEFT_KEY_CODE: {
                if (snakePos.direction === RIGHT) {
                    break;
                }
                    this.setState({ snakePos: { ...snakePos, direction: LEFT } });
                    break;
            }
            case RIGHT_KEY_CODE: {
                if (snakePos.direction === LEFT) {
                    break;
                }
                    this.setState({ snakePos: { ...snakePos, direction: RIGHT } });
                    break;
            }
            case UP_KEY_CODE: {
                if (snakePos.direction === DOWN) {
                    break;
                }
                    this.setState({ snakePos: { ...snakePos, direction: UP } });
                    break;
            }
            case DOWN_KEY_CODE: {
                if (snakePos.direction === UP) {
                    break;
                }
                this.setState({ snakePos: { ...snakePos, direction: DOWN } });
                break;
            }
        }
    }

    checkGameOver = (nextPos) => {
        const { x, y } = nextPos;
        const { rows, cols } = this.state;
        // return x >= rows || x < 0 || y >= cols || y < 0
        return !(x > -1 && x < rows && y > -1 && y < cols);
    }

    startGame = () => {
        window.setInterval(this.moveSnake, 1000)//do not use this.moveSnake() here
    }
    componentDidMount(){
        this.startGame();//can we writewindow.setInterval here? yes
        this.generateFood();
    }
    getClassName=(row,col)=>{
        const { snakePos, foodPos} = this.state;
        // console.log(row,col,snakePos,foodPos)
        let className='cell';
        if(snakePos.x===row && snakePos.y===col){
            className= 'cell snake';
        }
        else if (foodPos.x === row && foodPos.y=== col){
            className = 'cell food';
        }
        return className;
    }

    render() {
        const { rows, cols } = this.state;
        const rowArray = [];
        for (let i = 0; i < rows; i++) {
            rowArray.push(i);
        }
        const colArray = [];
        for (let i = 0; i < cols; i++) {
            colArray.push(i);
        }
        return (//do not use this.changeDirection()
            // <div className='container1'>
                <div className='playground1'  onKeyDown={this.changeDirection} tabIndex={0}>
                    {
                        rowArray.map(row => (
                            <div key={`row-${row}`} id={`row-${row}`} className='row'>
                                {
                                    colArray.map(col => (
                                        <div key={`cell-${row},${col}`} id={`cell-${row},${col}`} className={this.getClassName(row,col)}></div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            // </div>
        )
    }
}
export default PlayGround1;
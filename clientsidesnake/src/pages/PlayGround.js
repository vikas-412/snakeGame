import React, { Component } from 'react';

import {
    LEFT,
    RIGHT,
    UP,
    DOWN,
    LEFT_KEY_CODE,
    RIGHT_KEY_CODE,
    UP_KEY_CODE,
    DOWN_KEY_CODE
} from '../constants';


const initialState = {
    rows: 25,
    cols: 50,
    snakePos: [
        { x: 0, y: 2 },
        { x: 0, y: 1 },
        { x: 0, y: 0 },
    ],
    direction: RIGHT,
    foodPos: {
        x: 4,
        y: 8
    },
    obstacle : {
        x : 8,
        y : 6
    }
}


// extends means PlayGround is inherited from Component class
class PlayGround extends Component {
    constructor() {
        // super call the constructor of parent class Component
        super();
        this.state = {
            ...initialState
        };
        this.timer = null;
    }
    resetState = () => {
        this.setState({ ...initialState });
    }

    moveSnake = () => {
        const { x, y } = this.state.snakePos[0];
        let nextPos = {};
        switch (this.state.direction) {
            case UP: {
                nextPos = {
                    x: x - 1,
                    y
                }
                break;
            }
            case DOWN: {
                nextPos = {
                    x: x + 1,
                    y
                }
                break;
            }
            case LEFT: {
                nextPos = {
                    x,
                    y: y - 1
                }
                break;
            }
            case RIGHT: {
                nextPos = {
                    x,
                    y: y + 1
                }
                break;
            }
        }
        
        let arraySnake = [...this.state.snakePos];
        if (this.checkForGameOver(nextPos,arraySnake)) {
           alert('GAME OVER');
           this.resetState();
        } else {
            arraySnake.unshift(nextPos);
            if (this.state.foodPos.x === nextPos.x && this.state.foodPos.y === nextPos.y){
                this.generateFood();
            }else{
                arraySnake.pop();
            }
            this.setState({
                snakePos: arraySnake
            })
        }
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
    startGame = () => {
        this.timer = window.setInterval(this.moveSnake, 100);
    }
    pauseGame = () => {
        window.clearInterval(this.timer);
    }
    componentDidMount() {
        this.startGame();
    }
    checkForGameOver = (nextPos,arraySnake) => {
        const { rows, cols } = this.state;
        const { x, y } = nextPos;
        for (let data of arraySnake){
            if (data.x===x && data.y===y){
                return true;
            }
        }
        return (x >= rows || x < 0 || y >= cols || y < 0) || (this.state.obstacle.x === x && this.state.obstacle.y === y);
    }
    changeDirection = (event) => {
        const keyCode = event.keyCode;
        event.preventDefault();
        event.stopPropagation();
        switch (keyCode) {
            case LEFT_KEY_CODE: {
                if (this.state.direction === RIGHT) {
                    break;
                }
                else {
                    this.setState({ direction: LEFT })
                    break;
                }
            }
            case RIGHT_KEY_CODE: {
                if (this.state.direction === LEFT) {
                    break;
                }
                else {
                    this.setState({ direction: RIGHT })
                    break;
                }
            }
            case UP_KEY_CODE: {
                if (this.state.direction === DOWN) {
                    break;
                }
                else {
                    this.setState({ direction: UP })
                    break;
                }
            }
            case DOWN_KEY_CODE: {
                if (this.state.direction === UP) {
                    break;
                }
                else {
                    this.setState({ direction: DOWN })
                    break;
                }
            }
        }
    }

    getClassName = (x, y)=>{
        let className='';
        this.state.snakePos.forEach((data,index)=>{
            if(data.x===x && data.y === y){
                className=  index===0 ? 'head' : 'snake';
            }
        })

        if (this.state.foodPos.x === x && this.state.foodPos.y === y){
            className = 'food';
        }
        if (this.state.obstacle.x === x && this.state.obstacle.y === y){
            className = 'obstacle';
        }
        return `cell ${className}` ;
    }

    render() {
        const { rows, cols, snakePos } = this.state;
        const rowsArray = [];//why const.,,,,if const hen no change but here we are changing....ans....we cannot assign a const using = sign but array.push can be done
        for (let i = 0; i < rows; i++) {
            rowsArray.push(i);
        }
        const colsArray = [];
        for (let i = 0; i < cols; i++) {
            colsArray.push(i);
        }
        return (<div>
                <div className="score">{snakePos.length - 3 }</div>
                <div className="playground" onKeyDown={this.changeDirection} tabIndex={0}>
                    {
                        rowsArray.map(x => (
                            <div key={`x-${x}`} className="row">
                                {
                                    colsArray.map(y => (
                                        <div key={`x-${x}-y-${y}`} className= {this.getClassName(x,y)}>
                                            { this.getClassName(x,y).includes('head') ? '⚉' : this.getClassName(x,y).includes('snake') ? '♾' :'' }
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
                </div>
        )
    }
}


export default PlayGround;

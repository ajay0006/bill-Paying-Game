import React, {Component} from "react";
import {ToastContainer, toast} from "react-toastify";

const MyContext = React.createContext();

const defaultState = {
    stage: 1,
    players: [],
    result: ""
}

class MyProvider extends Component {

    state = defaultState

    addPlayerHandle = (playerName) => {
        this.setState((prevState) => ({
            players: [...prevState.players, playerName]
        }))
    }

    removePlayerHandle = (index) => {
        this.setState( (prevState) => ({
            players: prevState.players.filter(player => player !== prevState.players[index])
        }))

    }

    nextStageHandler = () =>{
        const { players } = this.state;
        if (players.length < 2) {
            toast.error("You are going to need more than one player", {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2500
            })
        }
        else{
            this.setState({
                stage:2
            }, () => { setTimeout(() => { this.pickLooser()}, 2000)})
        }
    }

    pickLooser = () => {
        const {players} = this.state;
        this.setState({
            result: players[Math.floor(Math.random()*players.length)]
        })
    }

    resetGame = () =>{
        console.log('reset state')
        this.setState(defaultState)
    }

    render() {
        return (
            <>
                <MyContext.Provider value={{
                    state: this.state,
                    addPlayer: this.addPlayerHandle,
                    removePlayer: this.removePlayerHandle,
                    nextStage: this.nextStageHandler,
                    newLooser: this.pickLooser,
                    resetGame: this.resetGame
                }}>
                    {this.props.children}
                </MyContext.Provider>
                <ToastContainer/>
            </>
        )
    }
}

export {MyContext, MyProvider}
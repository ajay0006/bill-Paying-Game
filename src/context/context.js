import React, {Component} from "react";
import {ToastContainer, toast} from "react-toastify";

// this just simply creates the context
const MyContext = React.createContext();

const defaultState = {
    stage: 1,
    players: [],
    result: ""
}

// this is the myProvider class that will be used to wrap the application/component we wish the data in here ti interact with
class MyProvider extends Component {

    state = defaultState

    // notice the functions here aren't declared, as they are within a class based component

    // this functions adds the player name to the state
    addPlayerHandle = (playerName) => {
        this.setState((prevState) => ({
            players: [...prevState.players, playerName]
        }))
    }

    // this functions removes the player based off the index
    removePlayerHandle = (index) => {
        this.setState((prevState) => ({
            players: prevState.players.filter(player => player !== prevState.players[index])
        }))

    }

    // this changes stage value in state, which in return determines which page will be loaded, i used this method as opposed to using routing, since the application is a simple one
    nextStageHandler = () => {
        // destructure the object state and get the players property
        const {players} = this.state;
        if (players.length < 2) {
            toast.error("You are going to need more than one player", {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2500
            })
        } else {
            this.setState({
                stage: 2
            }, () => {
                setTimeout(() => {
                    this.pickLooser()
                }, 2000)
            })
        }
    }
// picks a random looser from the players array, also checks to make sure what is picked wasn't picked before
    pickLooser = () => {
        const {players} = this.state;
        this.setState((prevState) => {
            let resultCon = ""
            do {
                resultCon= players[Math.floor(Math.random() * players.length)]
            }
            while (resultCon === prevState.result)
                return (
                    {
                        result: resultCon
                    }
                )

            }
        )
    }

    resetGame = () => {
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

//exports the component(MyProvider) that houses the state values and functions needed as we well as the context to access them
export {MyContext, MyProvider}
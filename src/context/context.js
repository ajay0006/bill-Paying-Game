import React, {Component} from "react";

const MyContext = React.createContext();

class MyProvider extends Component {

    state = {
        stage: 1,
        players: []
    }

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

    render() {
        return (
            <>
                <MyContext.Provider value={{
                    state: this.state,
                    addPlayer: this.addPlayerHandle,
                    removePlayer: this.removePlayerHandle
                }}>
                    {this.props.children}
                </MyContext.Provider>
            </>
        )
    }
}

export {MyContext, MyProvider}
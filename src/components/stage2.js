import React, {useContext} from "react";
import {MyContext} from "../context/context";

const Stage2 = () => {
    const context = useContext(MyContext)

    return (
        <>
            <div className="result_wrapper">
                <h3> The Looser is: </h3>
                <div>
                    {context.state.result}
                </div>
                <div className='action_button' onClick={() => context.resetGame()}>
                    Start Over
                </div>
                <div className='action_button btn_2' onClick={() => context.newLooser()}>
                    Get New Looser
                </div>
            </div>
        </>
    )
}

export default Stage2;
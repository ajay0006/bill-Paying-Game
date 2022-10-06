import React, {useContext} from "react";
import {MyContext} from "./context/context";
import Stage1 from "./components/stage1";
import Stage2 from "./components/stage2";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
//import './styles/fullStyle.css';


const App = () => {
    const context = useContext(MyContext)

    return (
        <div className="wrapper">
            <div className="center-wrapper">
                <h1> Who pays the bill</h1>
                {context.state.stage === 1 ?
                <Stage1/>
                :
                <Stage2/>
                }
            </div>
        </div>
    )
}

export default App;
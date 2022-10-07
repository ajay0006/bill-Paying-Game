import React, {useState, useContext, useRef, useEffect} from "react";
import {MyContext} from "../context/context";
import {Alert, Button, Form, FormControl, FormGroup} from "react-bootstrap";
import {v4 as uuidV4} from 'uuid';

const Stage1 = () => {
    // another way of using the event handler in form submissions
    const textPlayerInput = useRef();
    // just another grab of the context
    const context = useContext(MyContext)
    // setting the state that will be used on this page, for the error handling
    const [error, setError] = useState([false, ""])

    useEffect(() => {
        //console.log(context.state.players)
    });

    const handleSubmit = (e) => {
        // prevents default js, where page loads with every click
        e.preventDefault();
        // trim whitespaces
        let textInput = textPlayerInput.current.value.trim();
        // validate the text entered by the user
        const validate = validateTextPlayerInput(textInput);

        // if validation passes
        if (validate) {
            setError([false, ''])
            context.addPlayer(textInput= textInput[0].toUpperCase() + textInput.substring(1))
            textPlayerInput.current.value = "";
        }
    }

    // validation of user input for blanks, < 2 chars and duplicates
    const validateTextPlayerInput = (textInput) => {
        textInput = textInput[0].toUpperCase() + textInput.substring(1)
        if (textInput === "") {
            setError([true, 'Naa Mate you know blanks arent allowed'])
            return false
        }
        if (textInput.length <= 2) {
            setError([true, 'why just two character? do better'])
            return false
        }
        if (context.state.players.indexOf(textInput) > -1) {
            setError([true, 'No duplicates allowed!!!'])
            return false
        }
        return true
    }


    return (
        <>
            <Form onSubmit={handleSubmit} className='mt-4'>
                <FormGroup>
                    <FormControl
                        type='text'
                        name='Player'
                        placeholder="Tender the names of the Players"
                        ref={textPlayerInput}
                    />
                </FormGroup>
                {
                    error[0] ?
                        <Alert variant='danger' className='mt-2'>
                            {error[1]}
                        </Alert>
                        : null
                }
                <Button className='miami mt-2' variant="primary" type='submit'> Add Player</Button>
                {
                    context.state.players && context.state.players.length > 0 ?
                        <>
                            <hr/>
                            <div>
                                <ul className='list-group'>
                                    {context.state.players.map((player, index) => (
                                        <li key={uuidV4()} className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                                            {player}
                                            <span className='badge badge-danger' onClick={() => context.removePlayer(index)}>
                                                x
                                            </span>
                                        </li>
                                    ))}

                                </ul>

                                <div className='action_button' onClick={() => context.nextStage()}>
                                        Next
                                </div>
                            </div>
                        </>

                        : null
                }
            </Form>
        </>
    )
}

export default Stage1
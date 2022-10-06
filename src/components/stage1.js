import React, {useState, useContext, useRef, useEffect} from "react";
import {MyContext} from "../context/context";
import {Alert, Button, Form, FormControl, FormGroup} from "react-bootstrap";
import {v4 as uuidV4} from 'uuid';

const Stage1 = () => {
    const textPlayerInput = useRef();
    const context = useContext(MyContext)
    const [error, setError] = useState([false, ""])

    useEffect(() => {
        console.log(context.state.players)
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const textInput = textPlayerInput.current.value;
        const validate = validateTextPlayerInput(textInput);

        if (validate) {
            setError([false, ''])
            context.addPlayer(textInput)
            textPlayerInput.current.value = "";
        }
    }

    const validateTextPlayerInput = (textInput) => {
        if (textInput === "") {
            setError([true, 'Naa Mate you know blanks arent allowed'])
            return false
        }
        if (textInput.length <= 2) {
            setError([true, 'why just two character? do better'])
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

                                <div className='action_button' onClick={() => alert('Stage 2')}>
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
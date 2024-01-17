import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';

function AnswerFaqHelper(props) {
    const post = props.post;
    const [temp, setTemp] = useState(post)
    const [answer, setAnswer] = useState('')
    const submithandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/admin/faq/' + post._id, { answer })
            .then(() => window.location.reload(false))
            .catch(e => console.log(e))
    }
    const deletehandler = async () => {
        await axios.delete('http://localhost:8080/admin/deletefaq/' + post._id)
            .then(() => window.location.reload(false))
            .catch(e => console.log(e))
    }
    return (
        <div>

            <Form>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Question
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={post.question} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Answer
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control value={answer} onChange={(e) => setAnswer(e.target.value)} type="text" placeholder="Enter Your Answer" />
                        <Button style={{ marginTop: "15px" }} variant="outline-primary" type="Submit" onClick={submithandler}>Submit Answer</Button>
                        <Button style={{ marginTop: "15px", marginLeft: "40px" }} variant="outline-primary" onClick={deletehandler}>Delete Question</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default AnswerFaqHelper

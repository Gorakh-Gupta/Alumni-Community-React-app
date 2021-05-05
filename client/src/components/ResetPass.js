import axios from 'axios';
import React,{useState} from 'react'
import { Button, Form, Jumbotron } from 'react-bootstrap'

function ResetPass() {
    const [mail, setMail] = useState('')
    const [msg, setMsg] = useState('')
    const [btn, setBtn] = useState(true)
    const submithandler=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/users/reset',{mail})
        .then((data)=>{
            setMsg(data.data.msg);
            setBtn(false);
        })
        .catch((err)=>console.log(err))
    }
    return (
        <div style={{width:400,height:50,marginLeft:500,marginTop:200}}>
            <Jumbotron>
                <h3>Reset Your Password</h3>
                <Form onSubmit={submithandler}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label> Email</Form.Label>
                    <Form.Control value={mail} onChange={(e)=>setMail(e.target.value)} />
            </Form.Group>
            {btn && <Button className="btn btn-primary btn-block" type="submit">
                Reset
            </Button>}
            </Form>
            {msg.length>0 && <h3>{msg}</h3>}
            </Jumbotron>
        </div>
    )
}

export default ResetPass

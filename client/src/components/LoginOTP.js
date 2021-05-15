import React,{useState} from 'react'
import { Button, Form, Jumbotron } from 'react-bootstrap'
import axios from 'axios'
function LoginOTP() {
    const [mob, setMob] = useState('')
    const [msg, setMsg] = useState('')
    const [btn, setBtn] = useState(true)
    const submithandler=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/users/reset',{mob})
        .then((data)=>{
            setMsg(data.data.msg);
            setBtn(false);
        })
        .catch((err)=>console.log(err))
    }
    function OTPVerify()
    {
        return (
           
                <Jumbotron>
                    <h3 style={{textAlign:'center'}}>Login Using OTP</h3>
                    <Form onSubmit={submithandler}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label> Mobile Number</Form.Label>
                        <Form.Control value={mob} onChange={(e)=>setMob(e.target.value)} />
                </Form.Group>
                {btn && <Button className="btn btn-primary btn-block" type="submit">
                    Send OTP
                </Button>}
                </Form>
                {msg.length>0 && <h3>{msg}</h3>}
                </Jumbotron>
        )
    }
    return (
        <div style={{width:400,height:50,marginLeft:500,marginTop:200}}>
            <Jumbotron>
                {!msg && <><h3 style={{textAlign:'center'}}>Login Using OTP</h3>
                <Form onSubmit={submithandler}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label> Mobile Number</Form.Label>
                    <Form.Control value={mob} onChange={(e)=>setMob(e.target.value)} />
            </Form.Group>
            {btn && <Button className="btn btn-primary btn-block" type="submit">
                Send OTP
            </Button>}
            </Form> </>}
            
            </Jumbotron>
            {msg.length>0 && <OTPVerify />}
        </div>
    )
}

export default LoginOTP

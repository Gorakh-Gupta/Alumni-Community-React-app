import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Button, Form, Jumbotron } from 'react-bootstrap';

function Reset(props) {
    const token=props.match.params.token;
    const [new1, setNew1] = useState('')
    const [new2, setNew2] = useState('')
    const [msg, setMsg] = useState('');
    const submithandler=(e)=>{
        e.preventDefault();
        if(new1==new2)
        {
            axios.post(`http://localhost:8080/users/resetpass`,{token,pass:new1})
            .then((data)=>{
                setMsg(data.data.msg)
                setInterval(()=>{
                    props.history.push('/');
                },2000)
            })
            .catch((err)=>console.log(err))
        }
    }
    return (
        <div style={{width:400,height:50,marginLeft:500,marginTop:200}}>
            <Jumbotron>
                <h1>Reset Password</h1>
            <Form onSubmit={submithandler}>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Enter New Password</Form.Label>
                    <Form.Control type="password" value={new1} onChange={(e)=>setNew1(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Enter New Password</Form.Label>
                    <Form.Control type="password" value={new2} onChange={(e)=>setNew2(e.target.value)}/>
                </Form.Group>
                {msg.length>0 && <h5>{msg}</h5>}
                <button  type="submit" className="btn btn-primary btn-block">
                    Reset Password
                </button>
            </Form>
            </Jumbotron>
        </div>
    )
}

export default Reset

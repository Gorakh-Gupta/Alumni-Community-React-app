import React, {useState , useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Jumbotron } from 'react-bootstrap'
import axios from 'axios';
function ChangePassword(props) {
    const id=props.match.params.id;
    const [old, setOld] = useState('');
    const [new1, setNew1] = useState('')
    const [new2, setNew2] = useState('')
    const [pop, setPop] = useState(false)
    const [msg, setMsg] = useState('');
    useEffect(() => {
        if(new1==new2)
        {
            setPop(false);
        }
        else{
            setPop(true);
        }
    }, [new2])
    const submithandler=(e)=>{
        e.preventDefault();
        if(new1==new2)
        {
            axios.put(`http://localhost:8080/users/changepassword/${id}`,{old,new1})
            .then((data)=>{
                setMsg(data.data.msg)
                setInterval(()=>{
                    window.location.reload(false);
                },2000)
            })
            .catch((err)=>console.log(err))
        }
    }
    return (
        <div style={{width:400,height:50,marginLeft:500,marginTop:150}}>
            <Jumbotron>
                <h1>Change Password</h1>
            <Form onSubmit={submithandler}>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Enter Old Password</Form.Label>
                    <Form.Control type="password" value={old} onChange={(e)=>setOld(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Enter New Password</Form.Label>
                    <Form.Control type="password" value={new1} onChange={(e)=>setNew1(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Enter New Password</Form.Label>
                    <Form.Control type="password" value={new2} onChange={(e)=>setNew2(e.target.value)}/>
                </Form.Group>
                {pop && <h6>Password does not match</h6>}
                {msg.length>0 && <h5>{msg}</h5>}
                <Button variant="primary" type="submit">
                    Change Password
                </Button>
            </Form>
            </Jumbotron>
        </div>
    )
}

export default ChangePassword

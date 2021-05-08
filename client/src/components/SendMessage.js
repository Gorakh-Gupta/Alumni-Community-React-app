import React from 'react'
import { useState } from 'react'
import { Form, Alert } from 'react-bootstrap';
import axios from 'axios'

function SendMessage() {
    const [mail, setMail] = useState('');
    const [sub, setSub] = useState('');
    const [content, setContent] = useState('');
    const [msg,setMsg]=useState('');
    const submitchange=(e)=>{
        e.preventDefault();
        console.log("Sent");
        axios.post('http://localhost:8080/admin/sendmail',{mail,sub,content})
        .then((data)=>setMsg(data.data.msg))
        .catch((e)=>console.log(e))
    }
    return (
        <div>
            <div style={{width:400,height:300,marginLeft:500,marginTop:100}}>
          <form onSubmit={submitchange}>
                <h3 style={{textAlign:'center'}}>Mail To Alumni</h3>

                <div className="form-group">
                    <label>Alumni Email</label>
                    <input type="email" className="form-control" placeholder="Enter Email" value={mail} onChange={(event)=>setMail(event.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Subject</label>
                    <input type="text" className="form-control" placeholder="Enter Subject" value={sub} onChange={(event)=>setSub(event.target.value)}/>
                </div>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={7} value={content} onChange={(e)=>setContent(e.target.value)}/>
                </Form.Group>
                <button type="submit" className="btn btn-primary btn-block">Send Email</button>
            </form>
            <p></p>
             {msg && <Alert variant="success" >
				<Alert.Heading>{msg}</Alert.Heading>	
	  	    </Alert>} 
            </div>
        </div>
    )
}

export default SendMessage

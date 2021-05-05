import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import { Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
function Login(props) {

const [rollno, setrollno] = useState('');
const [password, setpassword] = useState('');
const [msg, setMsg] = useState(false);
const submitchange=(event)=>{
    event.preventDefault();
         axios.post('http://localhost:8080/users/login',{rollno,password})
        .then((data)=>{
            if(!data.data.msg)
            {
                console.log("sent login page") 
                props.history.push('/dashboard/'+rollno) ;
                //redirected to dashboard
            }
            else
            {
                setMsg(true);
            }   
            
        })
        .catch((err)=>console.log("Failed to send login request  "+err))
}
useEffect(()=>{
    setMsg(false);    // when user changes the input field, Invalid msg is vanished
},[rollno,password])
    return (
        <div>
        
        <div style={{width:400,height:50,marginLeft:500,marginTop:200}}>
          <form onSubmit={submitchange}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Roll Number</label>
                    <input type="number" className="form-control" placeholder="Enter Roll No." value={rollno} onChange={(event)=>setrollno(event.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(event)=>setpassword(event.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                     <a href="/resetpassword">Forgot password?</a>
                </p>
            </form>
            </div>


        {msg && <Alert variant="danger" style={{width:"300px",margin:"20px auto" }}>
				<Alert.Heading>Incorrect Username or Password</Alert.Heading>	
	  	</Alert>}
          
            
    </div>
    )
}

export default Login;

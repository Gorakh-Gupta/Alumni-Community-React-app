import React,{useState} from 'react'
import axios from 'axios'
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
                
                props.history.push('/login');
                console.log(data.data.msg);
                setMsg(true);
            }   
            
        })
        .catch((err)=>console.log("Failed to send login request  "+err))
}
    return (
        <div style={{backgroundColor: "lightblue",height:"240px",width:"300px" ,margin:"110px auto", padding:"20px"}}>
        <p><h1 style={{textAlign:"center"}}>Login</h1></p>
        <form onSubmit={submitchange}>
            Roll No:: : <input type="Number" name="roll" value={rollno} onChange={(event)=>setrollno(event.target.value)}/><br/><br/>
            Password : <input type="Password" name="pass" value={password} onChange={(event)=>setpassword(event.target.value)}/><br/><br/>
            <button type="Submit">Submit</button>
            
        </form>
        {msg && <h6>Incorrect username or password</h6>}         
    </div>
    )
}

export default Login;

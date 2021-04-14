import React, {useState, useEffect} from 'react'
import axios from 'axios'
function Signup(props) {


	const [name, setName] = useState('')
	const [roll, setRoll] = useState('')
	const [mail, setMail] = useState('')
	const [mob, setMob] = useState('')
	const [year, setYear] = useState(2000)	
	const [branch, setBranch] = useState('CSE')
	const [pass, setPass] = useState('')
		const osubmit=(event) => {
			async function fetchMyAPI()
			{
				event.preventDefault();
				// console.log(this.state);
				await axios.post('http://localhost:8080/users/',{name,roll,mail,mob,year,branch,pass})
				.then((data)=>
				{
					console.log("sent"+data+{name,roll,mail,mob,year,branch,pass}) 
					props.history.push('/')
				})
				.catch((err)=>console.log("unable to signup"+err))
			}
			fetchMyAPI()
		}
	return (
		<div>
			<div style={{height:"400px" ,width:"400px" ,margin:"30px auto"}}>
			<h1>Signup</h1>
			<form onSubmit={osubmit} method="Post">
				Name : <input type="text" value={name} onChange={(event)=>setName(event.target.value)}/><br/>
				Roll no. :<input type="number" value={roll} onChange={(event)=>setRoll(event.target.value)}/><br/>
				Email :<input type="email" value={mail} onChange={(event)=>setMail(event.target.value)}/><br/>
				Mob. No: <input type="number" value={mob} onChange={(event)=>setMob(event.target.value)}/><br/>
				Graduation Year <input type="number" value={year} onChange={(event)=>setYear(event.target.value)}/><br/>
				<select value={branch} onChange={(event)=>setBranch(event.target.value)}>
					<option value='CSE'>CSE</option>
					<option value='ME'>ME</option>
					<option value='CE'>CE</option>
					<option value='EE'>EE</option>
					<option value='ECE'>ECE</option>
				</select><br/>
				Password : <input type="password" name="pass" value={pass} onChange={(event)=>setPass(event.target.value)}/><br/>
				<button type="Submit">Submit</button>
			</form>
			
			</div>
		</div>
	)
}

export default Signup

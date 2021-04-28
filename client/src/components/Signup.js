import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
function Signup(props) {


	const [name, setName] = useState('')
	const [roll, setRoll] = useState('')
	const [mail, setMail] = useState('')
	const [mob, setMob] = useState('')
	const [year, setYear] = useState(2000)	
	const [branch, setBranch] = useState('CSE')
	const [pass, setPass] = useState('')
	const [check, setCheck] = useState(false)
	const [success, setSuccess] = useState(false)
		const osubmit=(event) => {
			async function fetchMyAPI()
			{
				event.preventDefault();
				// console.log(this.state);
				console.log("hi");
				await axios.post('http://localhost:8080/users/',{name,roll,mail,mob,year,branch,pass})
				.then((data)=>
				{
					//+{name,roll,mail,mob,year,branch,pass}
					if(!data.data.code)
					{
						setSuccess(true)
						setInterval(()=>{
							props.history.push('/')
						},3000);	
					}
					else{
						setCheck(true);
					}
				})
				.catch((err)=>console.log(err))
			}
			fetchMyAPI()
		}
		useEffect(() => {
			setCheck(false)
		}, [name,roll,mail,mob,year,branch,pass])
	return (
		<div className='container' style={{marginTop:20}}>
			{success && 
			<Alert variant="success">
				<Alert.Heading>Signed Up Successfully. Redirecting to Homepage...</Alert.Heading>
	  		</Alert>}
			{check && 
				<Alert variant="danger">
					<Alert.Heading>Invalid Input | Unable to Sign Up</Alert.Heading>
				</Alert>
			}
            <Form onSubmit={osubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Roll No.</Form.Label>
                    <Form.Control type="name" value={roll} onChange={(e)=>setRoll(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Year of Graduation</Form.Label>
                    <Form.Control type="number" value={year} onChange={(e)=>setYear(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="mail" value={mail} onChange={(e)=>setMail(e.target.value)}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mobile No.</Form.Label>
                    <Form.Control type="tel" value={mob} onChange={(e)=>setMob(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Branch</Form.Label>
                    <Form.Control as="select" value={branch} onChange={(e)=>setBranch(e.target.value)}>
                    <option>CSE</option>
                    <option>CE</option>
                    <option>ME</option>
                    <option>ECE</option>
                    <option>EE</option>
                    </Form.Control>
                </Form.Group>
				<Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={pass} onChange={(e)=>setPass(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
	)
}

export default Signup

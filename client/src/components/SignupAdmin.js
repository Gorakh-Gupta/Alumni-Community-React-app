import React, {useState , useEffect} from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import axios from 'axios'
function SignupAdmin(props) {
    const [name, setName] = useState('')
	const [mail, setMail] = useState('')
	const [mob, setMob] = useState('')	
	const [pass, setPass] = useState('')
	const [check, setCheck] = useState(false)
	const [success, setSuccess] = useState(false)
		const osubmit=(event) => {
			async function fetchMyAPI()
			{
				event.preventDefault();
				await axios.post('http://localhost:8080/admin/',{name,mail,mob,pass})
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
		}, [name,mail,mob,pass])
	return (
		<div className='container'  style={{width:400,height:50,marginLeft:500,marginTop:20}}>
			{success && 
			<Alert variant="success">
				<Alert.Heading>Signed Up Successfully. Redirecting to Homepage...</Alert.Heading>
	  		</Alert>}
			{check && 
				<Alert variant="danger">
					<Alert.Heading>Invalid Input | Unable to Sign Up</Alert.Heading>
				</Alert>
			}
			<h1 style={{textAlign:'center'}}>Admin Sign Up</h1>
            <Form onSubmit={osubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" value={name} onChange={(e)=>setName(e.target.value)}/>
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
               
				<Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={pass} onChange={(e)=>setPass(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" className="btn btn-primary btn-block" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
	)
}

export default SignupAdmin

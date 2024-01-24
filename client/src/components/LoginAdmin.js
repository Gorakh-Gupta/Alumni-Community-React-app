import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import AuthContext from '../context/AuthContext';

function LoginAdmin(props) {
    const [mob, setMob] = useState('');
    const { getLoggedAdmin } = useContext(AuthContext);
    const [password, setpassword] = useState('');
    const [msg, setMsg] = useState(false);
    const submitchange = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/admin/login', { mob, password })
            .then((data) => {
                if (!data.data.msg) {
                    getLoggedAdmin();
                    props.history.push('/admindashboard');
                }
                else {
                    setMsg(true);
                }

            })
            .catch((err) => console.log("Failed to send login request  " + err))
    }
    useEffect(() => {
        setMsg(false);    // when user changes the input field, Invalid msg is vanished
    }, [mob, password])
    return (
        <div>

            <div style={{
                height: '300px',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <form onSubmit={submitchange}>
                    <h3 style={{ width: '400px', flex: '0 0 auto' }}>Admin Sign In</h3>

                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input type="text" className="form-control" placeholder="Enter Mobile Number" value={mob} onChange={(event) => setMob(event.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(event) => setpassword(event.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    {/* <p className="forgot-password text-right">
                     <a href="/admin/loginOTP">Log In Using OTP?</a>
                </p> */}
                </form>
                {msg && <Alert variant="danger" >
                    <Alert.Heading>Incorrect Username or Password</Alert.Heading>
                </Alert>}
            </div>





        </div>
    )
}

export default LoginAdmin

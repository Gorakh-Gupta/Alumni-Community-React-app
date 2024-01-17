import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Dropdown, Image } from 'react-bootstrap';
function Navi() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" >
                <Navbar.Brand href="#">
                    <img
                        alt=""
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFU3vnYVbpYKUeyy2ajOMFVeysF8HWdrfIEw&usqp=CAU"
                        width="35"
                        height="35"
                        className="d-inline-block align-top"
                    />{' '}
                    Alumni Tracking System</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="justify-content-center">
                        <Nav.Link href="/notablealumni">Notable Alumni</Nav.Link>
                        <Nav.Link href="/signup">Signup</Nav.Link>
                        <Nav.Link href="login">Login</Nav.Link>

                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm" style={{ marginTop: 7, marginLeft: 30 }}>
                                Admin
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/admin/login">Log in</Dropdown.Item>
                                <Dropdown.Item href="/admin/signup">Sign up</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Image fluid style={{ height: 350, width: 885, margin: 40, marginLeft: 300 }} src="https://upload.wikimedia.org/wikipedia/commons/3/32/NIT_main_building_Patna.jpg" />
            <Jumbotron>
                <h1 style={{ marginLeft: 300 }}>Welcome Alumni of NIT Patna</h1>
                <p style={{ marginLeft: 300 }}>
                    This is a platform aimed to connect the alumni of our elite Institute. This offers Following features.
                    <ul>
                        <li>Receive frequent Updates about college</li>
                        <li>Get to know fellow Alumni</li>
                        <li>Send Message to other alumni</li>
                        <li>Raise fund for a cause</li>
                    </ul>
                </p>
            </Jumbotron>
        </div>
    )
}

export default Navi

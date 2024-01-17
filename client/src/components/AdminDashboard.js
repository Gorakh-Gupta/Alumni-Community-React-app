import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function AdminDashboard(props) {
  const { getLoggedAdmin } = useContext(AuthContext);
  const outhandler = async () => {
    await axios.get('http://localhost:8080/admin/logout')
      .then(() => {
        getLoggedAdmin();
        props.history.push('/')
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      {/* <Nav.Link href="/searchBY">Search Alumni</Nav.Link>
            <Nav.Link href="/addnotablealumni">Add a Notable Alumni</Nav.Link>
            <Nav.Link href="/sendmessage">Send a Message</Nav.Link>
            <Nav.Link href="#">Post on Timeline (Pending)</Nav.Link>
            <Nav.Link href="#">Upload a notice (Pending)</Nav.Link> */}
      {/* <a href="#" onClick={outhandler}>Logout</a> */}

      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <a href="/searchBy"><button type="button" class="btn btn-danger btn-lg" style={{ margin: '10px', padding: '50px' }}>Search Alumini</button></a>
          <a href="/addnotablealumni"><button type="button" class="btn btn-warning btn-lg" style={{ margin: '10px', padding: '50px' }}>Add notable Alumini</button></a>
          <a href="/sendmessage"><button type="button" class="btn btn-primary btn-lg" style={{ margin: '10px', padding: '50px' }}>Send Message</button></a>
          <a href="/answerfaq"><button type="button" class="btn btn-success btn-lg" style={{ margin: '10px', padding: '50px' }}>Frequently Asked Question</button></a>
          {/* <a href="/uploadnotice"><button type="button" class="btn btn-secondary btn-lg" style={{ margin: '10px', padding: '50px' }}>Upload a notice</button></a> */}
          <button onClick={outhandler} type="button" class="btn btn-secondary btn-lg" style={{ margin: '10px', padding: '50px' }}>Logout</button>
        </div>
        <div style={{ marginTop: "117px" }}>
          <nav class="navbar navbar-dark bg-dark">
            <div class="container-fluid">
              <span class="navbar-text">
                <button class="btn btn-secondary btn-lg" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Know us</button>

                <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                  <div class="offcanvas-header">

                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div class="offcanvas-body">
                    Abhishek | Gorakh <br></br>
                    Alumni Tracking System for NIT Patna ©
                  </div>
                </div>
              </span>
            </div>
          </nav>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard

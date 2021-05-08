import React from 'react'
import { Nav } from 'react-bootstrap'

function AdminDashboard() {
    return (
        <div>
            <Nav.Link href="/searchBY">Search Alumni</Nav.Link>
            <Nav.Link href="/addnotablealumni">Add a Notable Alumni</Nav.Link>
            <Nav.Link href="/sendmessage">Send a Message</Nav.Link>
            <Nav.Link href="#">Post on Timeline (Pending)</Nav.Link>
            <Nav.Link href="#">Upload a notice (Pending)</Nav.Link>
        </div>
    )
}

export default AdminDashboard

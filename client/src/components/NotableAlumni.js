import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Jumbotron } from 'react-bootstrap';
function NotableAlumni() {
    const [notable, setNotable] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/users/notable')
            .then((data) => setNotable(data.data))
            .catch((err) => console.log(err))
    }, [])
    return (
        <div>
            <Jumbotron style={{
                marginBottom: '0',
                padding: '2rem 2rem'
            }}>
                <h1>Notable Alumni</h1>
            </Jumbotron>
            {notable.map((alumni) => {
                return (
                    <div className="profilebody">
                        <div className="page-content page-container" id="page-content">
                            <div className="padding">
                                <div className="row container d-flex justify-content-center">
                                    <div className="col-xl-6 col-md-12">
                                        <div className="card user-card-full">
                                            <div className="row m-l-0 m-r-0">
                                                <div className="col-sm-4 bg-c-lite-green user-profile">
                                                    <div className="card-block text-center text-white">
                                                        <div className="m-b-25"> <img src={alumni.photo} className="img-radius" alt="User-Profile-Image" /> </div>
                                                        <h6 className="f-w-600">{alumni.name}</h6>
                                                        <p>{alumni.designation}</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                    </div>
                                                </div>
                                                <div className="col-sm-8">
                                                    <div className="card-block">
                                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Branch</p>
                                                                <h6 className="text-muted f-w-400">{alumni.branch}</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Year</p>
                                                                <h6 className="text-muted f-w-400">{alumni.year - 4}-{alumni.year}</h6>
                                                            </div>
                                                        </div>
                                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Bio</h6>
                                                        <div className="row" style={{ padding: 0 }}>
                                                            {alumni.bio}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default NotableAlumni

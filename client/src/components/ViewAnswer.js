import React ,{useState,useEffect} from 'react'
import axios from 'axios';
// import { View } from 'react-native';
// import { Jumbotron } from 'react-bootstrap';
// import Button from '@material-ui/core/Button';
// import TextArea from '@material-ui/core/TextareaAutosize';
// import Jumbotron from 'react-bootstrap/Jumbotron'
import Profile from './Profile';

function ViewAnswer() {
    const [posts, setpost] = useState([]);
    function refreshPage() {
        window.location.reload(false);
      }
    useEffect(() => {
        console.log('useEffect');
        axios.get('http://localhost:8080/users/allfaqs')
        .then(
            (data)=>{
                setpost(data.data)
                console.log(data.data);
        })
        .catch((err)=>console.log(err))
    }, [])
    return (
        <div style = {{marginLeft : "300px"}} >


            <div style={{background : "#DDEEFF", height : 800, overflow : 'scroll' ,  width: 900, borderRadius : 10 }}>
            <div className="container" >
                <section className="section">
                    
            <div className="columns" style={{  
                color : "#123123", width : "800px", marginLeft: 30 
            }}>
            <br></br>
            <h1 style={{marginLeft :'120px'}} >Frequently Asked Questions</h1><br/>
            
                {posts.map((post)=>{
                    return (
                        <div >
                            <div className="card" style = {{background : "#FDFEDD"}}>
                                <div className="card-content" style = {{ marginLeft : 20,  marginTop :"14px"}}>
                                    <p> <h5> Question :  </h5 >  
                                        <div style={{
                                            marginLeft : '105px',
                                            marginTop : '-30px',
                                            font : 'caption',
                                            fontSize : '20px'
                                        }}>  {post.question} </div> 
                                    </p>
                                </div>
                                <div className="card-content" style = {{ marginLeft : 20}}>
                                    <p> <h5> Answer :  </h5 >  
                                        <div style={{
                                            marginLeft : '105px',
                                            marginTop : '-30px',
                                            font : 'caption',
                                            fontSize : '20px'
                                        }}>  {post.answer} </div> 
                                    </p>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                    </div>
                </section>
            </div>
                        
        </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />



        </div>

    )
}

export default ViewAnswer;


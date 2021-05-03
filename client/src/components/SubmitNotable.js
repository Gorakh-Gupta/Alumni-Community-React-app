import axios from 'axios';
import React, {useState,useEffect} from 'react'

function SubmitNotable(props) {
    const [notable, setNotable] = useState({name:'',year:'',branch:'',photo:'',bio:'',designation:''})
    const [pop, setPop] = useState(false)
    const submithandler=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/users/notable',notable)
        .then((data)=>{
            setPop(true)
            setInterval(()=>{
                props.history.push('/notablealumni')
            },1500)
        })
        .catch((err)=>console.log(err))
    }
    return (
        <div>
            <h1 className="subs">
                Add a Notable Alumni
            </h1>

            <div className="formnot">
            <form onSubmit={submithandler}>
                <input type="text" name="name" className="formStyle" placeholder="Name (required)" required value={notable.name} onChange={(e)=>setNotable({...notable,name:e.target.value})}/>
                <input type="number" name="name" className="formStyle" placeholder="Year of Graduation(required)" required value={notable.year} onChange={(e)=>setNotable({...notable,year:e.target.value})}/>
                <input type="text" name="name" className="formStyle" placeholder="Branch (required)" required value={notable.branch} onChange={(e)=>setNotable({...notable,branch:e.target.value})}/>
                <input type="text" name="email" className="formStyle" placeholder="Image Url (required)" required value={notable.photo} onChange={(e)=>setNotable({...notable,photo:e.target.value})}/>
                <input type="text" name="email" className="formStyle" placeholder="Designation (required)" required value={notable.designation} onChange={(e)=>setNotable({...notable,designation:e.target.value})}/>
                <textarea rows="5" cols="53" placeholder="Bio" value={notable.bio} onChange={(e)=>setNotable({...notable,bio:e.target.value})}>
                    Bio
                </textarea>
                <button className="formButton">Submit</button>
            </form>
            {pop && <h2>Submitted Successfully</h2>} 
            </div>
        </div>
    )
}

export default SubmitNotable

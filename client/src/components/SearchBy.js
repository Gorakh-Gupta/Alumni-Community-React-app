import React, {useState} from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'
function SearchBy() {
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [branch, setBranch] = useState('')
    const [year, setYear] = useState('')
    const submithandler=(event)=>{
        event.preventDefault();
        async function fetchData()
        {
            let url='http://localhost:8080/admin/searchBy?'
            if(name)
            {
                url+='name='
                url+=name
                url+='&'
            }
            else
            {
                url+='name='
                url+=""
                url+='&'
            }
            if(branch)
            {
                url+='branch='
                url+=branch
                url+='&'
            }
            else{
                url+='branch='
                url+=""
                url+='&'
            }
            if(year)
            {
                url+='year='
                url+=year
            }
            else{
                url+='year='
                url+=""
            }
            await axios.get(url)
            .then((data)=>{
                console.log(data)
                setUsers(data.data)
            })
            .catch((err)=>console.log(err))
        }
        fetchData();
    }
    return (
        
        <div>
            <Form onSubmit={submithandler}>
                <input type="text" placeholder="name" val={name} onChange={e=>setName(e.target.value)}/>
                <input type="text" placeholder="branch" val={branch} onChange={e=>setBranch(e.target.value)}/>
                <input type="text" placeholder="year" val={year} onChange={e=>setYear(e.target.value)}/>
                <button type="submit">Submit</button>
             </Form>
            {users.length>0 && <table id="t01">
                <tr>
                    <th>Name</th>
                    <th>Roll</th>
                    <th>Year</th>
                    <th>Branch</th>
                    <th>Mobile No.</th>
                    <th>Email</th>
                </tr>
                {users.map((user)=>{
                    return (
                        <tr>
                        <td>{user.name}</td>
                        <td>{user.roll}</td>
                        <td>{user.year}</td>
                        <td>{user.branch}</td>
                        <td>{user.mob}</td>
                        <td>{user.mail}</td>
                    </tr>
                    )
                })}
            </table>}
        </div>
    )
}

export default SearchBy
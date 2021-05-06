import React, {useState} from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'
function SearchBy() {
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [branch, setBranch] = useState('')
    const [year, setYear] = useState('')
    var refresh;
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
    const clickhandler=(roll)=>{
        if(window.confirm('Are you sure you want to delete '+roll))
        {   
            axios.delete(`http://localhost:8080/admin/delete/${roll}`)
            .then((data)=>{
                if(data.status==200)
                {
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
            })
            .catch((err)=>console.log(err))
        }
    }
    return (
        
        <div style={{margin:20}}>
            <div style={{width:400,height:200,marginLeft:500,marginTop:10}}>
                <h2 style={{textAlign:'center'}}>Search Alumni</h2>
            <Form onSubmit={submithandler}>
                <input type="text" className="form-control" placeholder="name" val={name} onChange={e=>setName(e.target.value)}/>
                <input type="text" className="form-control" placeholder="branch" val={branch} onChange={e=>setBranch(e.target.value)}/>
                <input type="text" className="form-control" placeholder="year" val={year} onChange={e=>setYear(e.target.value)}/>
                <button type="submit" className="btn btn-primary btn-block">Search</button>
             </Form>
             </div>
            {users.length>0 && <table id="t01">
                <tr>
                    <th>Name</th>
                    <th>Roll</th>
                    <th>Year</th>
                    <th>Branch</th>
                    <th>Mobile No.</th>
                    <th>Email</th>
                    <th>Update</th>
                    <th>Delete</th>
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
                        <td><a href={"/updatebyadmin/"+user.roll}>Update</a></td>
                        <td><a onClick={()=>clickhandler(user.roll)} href="#">Delete</a></td>
                    </tr>
                    )
                })}
            </table>}
        </div>
    )
}

export default SearchBy
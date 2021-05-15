import React,{useState} from 'react'
import {Navlink,History, useHistory,Link} from 'react-router-dom'
// hooks is used to get data from form in useState

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.min.js';



const Notice=()=>{
    let note;
    const GetData=async(e)=>{
        e.preventDefault();
        const res=await fetch('/about',{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          },
        })
        const data = await res.json();
        note=data;
        console.log(data);
        var txt="",x;
        txt += "<table>"
        for (x in data) { 
          var y=parseInt(x)+1;
        txt += "<tr style={{padding:'10vh'}}><td><a href="+data[x].firstname+" download>"+y+"</a> ->"+data[x].lastname +"</td></tr>";
      }
      txt += "</table>"    
      document.getElementById("k").innerHTML = txt;
        window.alert("To get regular notice keep visiting\nYou can also ckeck your email");
      }

  return(
    <div>
      <div class="mx-auto">
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height:"82vh",width:'100%',overflow:"scroll"}}>
        <table id='k' class="table table-dark table-hover">
        </table>
        </div>
       <form method="POST">
  
      <div class="mb-3" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height:'10vh',backgroundColor:"darkgrey"}}>
      <button type="submit" class="btn btn-primary" name='singnup' id='singnup'
         value='register'
         onClick={GetData}>Get Notice</button>
  </div>
</form>
</div>
    </div>
  )
}

export default Notice
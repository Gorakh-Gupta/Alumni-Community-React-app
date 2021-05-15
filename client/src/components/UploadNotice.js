import React ,{useState} from 'react'
import { Alert } from 'react-bootstrap';

function UploadNotice() {
    const [msg, setMsg] = useState('');
    const [title, setTitle] = useState('');
    const [myfile, setMyfile] = useState(null);
    const submitchange=(e)=>{
        e.preventDefault();
        console.log("submit clicked");
    }
    return (
        <div>
            <div style={{width:400,height:300,marginLeft:500,marginTop:200}}>
          <form onSubmit={submitchange}>
                <h3 style={{textAlign:'center'}}>Upload Notice</h3>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" required className="form-control" placeholder="Enter Title of Notice" value={title} onChange={(event)=>setTitle(event.target.value)}/>
                </div>

                <div className="form-group">
                    <label>File to Upload</label>
                    <input type="file" className="form-control" required value={myfile} onChange={(event)=>setMyfile(event.target.value)}/>
                </div>
               {myfile &&  <button type="submit" className="btn btn-primary btn-block">Upload</button>}
            </form>
            {msg && <Alert variant="success" >
				<Alert.Heading>File Uploaded Successfully</Alert.Heading>	
	  	    </Alert>}
            </div>
        </div>
    )
}

export default UploadNotice

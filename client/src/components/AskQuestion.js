import React , {useState}from 'react'
import axios from 'axios';
import {TextArea,Button} from 'react-bootstrap'
function AskQuestion(props) {
    // const user = useSelector(state => state.users)
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("clicked Submitted")
        axios.post('http://localhost:8080/users/faq', {question:Comment})
        .then(response => {
            
            if(response.data.success) {
                setComment("")
                window.location.reload(false);
            } else {
                alert('Failed to save Comment')
            }
        })
    }

    return (
        <div style={{ marginLeft : '300px', background:'' }}>
            <br />
            <br />
            <h2 style={{marginLeft:'200px'}}> Ask any question to Admin </h2>
            <br />
            
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textArea
                    style={{ width: '900px', borderRadius: '8px', height : '90px', fontSize : '25px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="Write Your Question Here"
                ></textArea>
                <Button 
                        style={{ width: '20%', height: '52px', marginTop : ' 120px', marginLeft :'-600px', background : '#AAAAAA' }
                    } onClick={onSubmit}>Submit
                </Button>
            </form>

            <br/>
        

        </div>
    )
}

export default AskQuestion
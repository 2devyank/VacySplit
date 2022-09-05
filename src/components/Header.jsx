import React ,{useState} from 'react'
import { Button, Card, Container, Navbar, OverlayTrigger, Tooltip,Modal,Form ,FloatingLabel} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import img from "../assets/profile.png"
import mon from "../assets/mon.png"
import "../styles/Header.css"
import { useUserAuth } from '../context/UserAuthContext'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

function Header() {
  const navigate=useNavigate();
  const {data}=useUserAuth();

  const [show, setShow] = useState(false);
  const [username, setusername] = useState("");
  const [amount, setamount] = useState("");
  const [description, setdescription] = useState("");

  const share=amount/data.length;
  const recept=amount-share;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
// console.log(data.length);
  const visit=(e)=>{
    e.preventDefault();
    navigate("/home")
  }

  const handleexpense=async(e)=>{
    e.preventDefault();
    try{
        
        await setDoc(doc(db,"expense",Math.random().toString()),{
            name:username,
            amount:amount,
            total:data.length.toString(),
            share:share.toString(),
            recept:recept.toString(),
            description:description,
            capital:"true",
            timestamp:serverTimestamp(),
        });
       setShow(false);
    }catch(err){
        console.log(err)
    }
    // console.log(username,amount,description);
  }

  const renderTooltip = (props) => (
    <Card style={{ width: '18rem' }} {...props}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Img src={mon} style={{width:"20%",height:"20%",alignSelf:"center"}}/>
      <Card.Body style={{alignSelf:"center"}}>
       
        <Card.Text >
         Split shared expenses of your group !
        </Card.Text>
      
      </Card.Body>
    </Card>
  );



  return (
   <>
         <Navbar className='nav'>
    <Container className='bigger'>
      <Navbar.Brand>VacySplit</Navbar.Brand>
      
    <div className='left'>

    <OverlayTrigger
      placement="left"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      
      <Navbar.Text>
        <button  type="Submit"  className='but' onClick={handleShow}>
       Create Expense
      </button>
      </Navbar.Text>
    </OverlayTrigger>
    
      {/* <div className='img'> */}
          <img src={img} style={{width:"8%",height:"20%"}} onClick={visit}/>
         
      {/* </div> */}

      
    </div>
   
    </Container>
  </Navbar>
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleexpense}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="amount"
                placeholder="Amount"
                value={amount}
                onChange={(e)=>setamount(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <FloatingLabel controlId="floatingSelect" label="Paid By">
      <Form.Select aria-label="Floating label select example"  onChange={(e)=>setusername(e.target.value)}>
      <option>name</option>
        {data.map((data,index)=>(
          <option key={index}>{data.name}</option>
        ))}
      
      </Form.Select>
    </FloatingLabel>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control   onChange={(e)=>setdescription(e.target.value)} as="textarea" rows={1} />
            </Form.Group>
            <Button variant="primary" type="Submit">
            Share Expenses
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
         
          
        </Modal.Footer>
      </Modal>
   </>
  )
}

export default Header
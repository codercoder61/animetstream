import React , {useState}from 'react'
import './Footer.css'
import Logo from './logo.png'
import Form from './Form'
function Footer(props) {
  const [form,setForm] = useState(false)
  const handlclick = ()=>{
    setForm(true)
  }
  const handleclick2 = ()=>{
    setForm(false)
  }
  return (
    <div id="footer" style={{textAlign:'center'}}>
        <img src={Logo} style={{height:'80px',width:'80px'}}/><br/>
        <span style={{fontSize:'30px',fontWeight:'bold'}}><span style={{color:'red'}}>A</span>NIMET</span>
        <br/>
        <a target='_blank' href='https://ko-fi.com/codercoder61'><i className="fa-solid fa-hand-holding-dollar"></i></a>
        <i onClick={handlclick} className="fa-solid fa-phone"></i>

       
        <hr/>
        <span>Animet does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</span>
        <br/>
        <span>© {new Date().getFullYear()} AnimetStream™. All Rights Reserved.</span>
        {(form || props.formstate ) && <Form oncl={props.onclick} onclick={handleclick2}/>}
    </div>
  )
}

export default Footer

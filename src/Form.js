import React,{useRef} from 'react'
import emailjs from '@emailjs/browser';

import './Form.css'
function Form(props) {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_0b9trbj', 'template_42po12l', form.current, {
        publicKey: 'JSEsuEUfDer6ONqTS',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
    <div className="form-popup" id="myForm">

  <form ref={form} action="" onSubmit={sendEmail} className="form-container">
    <span onClick={()=>{props.oncl();props.onclick();}} className='closebtn'>X</span> 
    <h1>Contact me</h1>
    
    <span>codercoder61@gmail.com</span><br/>
    <span>Animet Stream</span>
  </form>
</div>
  )
}

export default Form

import React, { useState  } from 'react'
import './Modal.css'


const Modal = (props) => {

  const [signUpState,setSignUp] = useState(true)
  const [loginState,setLogin] = useState(false)
  const handleClick1 = ()=>{
    setSignUp(true)
    setLogin(false)

  }
  const handleClick2 = ()=>{
    setLogin(true)
    setSignUp(false)

  }
  return (
    <>
    <div id="id01" className="modal">
    <span onClick={props.onClick} className="close" title="Close Modal">&times;</span>
        
        {signUpState && <form id="signup" className="modal-content" action="/action_page.php">
            <div id="op">
            <span onClick={handleClick2} className="login">Login</span>
            <span onClick={handleClick1} className="signup">Sign up</span>
        </div>
            <div className="container">
              <h1>Sign Up</h1>
              <p>Please fill in this form to create an account.</p>
              <hr/>
              <label htmlFor="email"><b>Email</b></label><br/>
              <input type="text" placeholder="Enter Email" name="email" required/>
              <br/>
              <label htmlFor="psw"><b>Password</b></label><br/>
              <input type="password" placeholder="Enter Password" name="psw" required/>
              <br/>
              <label htmlFor="psw-repeat"><b>Repeat Password</b></label><br/>
              <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>
              <br/>
              <label>
                <input type="checkbox" checked="checked" name="remember" style={{marginBottom:'15px'}}/> Remember me
              </label>
              <br/>
              <p>By creating an account you agree to our <a href="#" style={{color:'dodgerblue'}}>Terms & Privacy</a>.</p>
        
              <div className="clearfix">
                <button type="submit" className="signupbtn btton">Sign Up</button>
              </div>
            </div>
          </form>
  }
       {loginState && <form id="login" className="modal-content" action="/action_page.php">
       <div id="op">
            <span onClick={handleClick2} className="login">Login</span>
            <span onClick={handleClick1} className="signup">Sign up</span>
        </div>
          <div className="container">
            <h1>Login</h1>
            <p>Please fill in this form to sign in.</p>
            <hr/>
            <label htmlFor="email"><b>Email</b></label><br/>
            <input type="text" placeholder="Enter Email" name="email" required/>
            <br/>
            <label htmlFor="psw"><b>Password</b></label><br/>
            <input type="password" placeholder="Enter Password" name="psw" required/>
            <br/>
            <label>
              <input type="checkbox" checked="checked" name="remember" style={{marginBottom:'15px'}}/> Remember me
            </label>
            <br/>
      
            <div className="clearfix">
              <button type="submit" className="signupbtn btton">Sign In</button>
            </div>
          </div>
        </form>} 
        
      </div>
    </>
  )
};



export default Modal
import React ,{useState} from 'react'
import {forwardRef,useRef} from 'react';

import './Nav.css'
import Modal from './Modal'
import Overlay from "./Overlay";
import Sidenav from "./Sidenav";
import { Link } from 'react-router-dom';


const Nav = forwardRef((props, ref) => {

  const [showModal, setShowModal] = useState(false);
  const [showOverlay, setOverlay] = useState(false)

  const [showSidenav, setSidenav] = useState(0)


  const handleClick2 = () => {
    setOverlay(true);
  };

  const close = () => {
    setShowModal(false);
  };


  const close2 = () => {
    setOverlay(false);
  };

  const handleClick3 = () => {
    setSidenav(250);
  };

  const close3 = () => {
    setSidenav(0);
  };

  
  

  return (
    <nav>
            <i onClick={handleClick3} id="bars" className="fa-solid fa-bars"></i>
            <Link style={{textDecoration:'none',color:'white' ,backgroundColor: 'rgb(29, 27, 27)',borderRadius: '10px',fontSize: '15px',padding: '5px 15px',border: '2px solid #666565',fontWeight: 'bold',letterSpacing: '2px'}}to='/'><span>ANIMET</span></Link>
            <div>
                <i id="glass" onClick={handleClick2} className="fa-solid fa-magnifying-glass"></i>
                {showModal && <Modal onClick={close} />}
                {showOverlay && <Overlay spinnertrue={props.spinner} onclick={close2} onClick={close2}/>}
                {showSidenav && <Sidenav forwardedRef={ref} kl={props.pp} width={showSidenav}  onClick={close3}/>}
            </div>
        </nav>
  )
})

export default Nav

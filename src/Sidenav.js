import React from 'react'
import './Sidenav.css'
import {forwardRef,useEffect,useRef,useState} from 'react';
import Cookies from 'js-cookie';

import { Link } from 'react-router-dom';

const Sidenav = forwardRef((props, ref) => {
  const innerRef = useRef(null);
    const [animeId,setAnimeId] = useState('')

    useEffect(() => {
    const handleClick = () => {
      // Call the callback function passed from the parent
      props.kl();
    };

    // Add event listener to the innerRef
    if (innerRef.current) {
      innerRef.current.addEventListener('click', handleClick);
    }
if(Cookies.get('lastWatchedAnime') !== undefined){
      setAnimeId(Cookies.get('lastWatchedAnime'))
    }
    // Cleanup function
    return () => {
      if (innerRef.current) {
        innerRef.current.removeEventListener('click', handleClick);
      }
    };
  }, [props.kl,Cookies.get('lastWatchedAnime')]);
  return (
    <div id="mySidenav" style={{ width: props.width }} className="sidenav">
        <a href="#" onClick={props.onClick} className="closebtn">&times;</a>
        <Link to='/'>Home</Link>
        <a target='_blank' href="https://ko-fi.com/codercoder61">Support</a>
        <a style={{cursor:'pointer'}} ref={innerRef}>Contact</a>
          {animeId!==""?<Link to={`/Watch/${animeId}`}>Last Watched Anime</Link>:""}

      </div>
  )
})

export default Sidenav

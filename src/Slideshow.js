import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Slideshow.css';
import { Link } from 'react-router-dom';

function Slideshow() {
  const [animep, setAnimes] = useState([]);
  
  let slideIndex = 0;

  const slideRefs = useRef([]);

  const showSlides = (n) => {
    if(n>=animep.length)
        slideIndex = 0
    if(n<0) 
        slideIndex = animep.length-1 
    if(animep.length>0){
        let i;
        for (i = 0; i < animep.length; i++) {
            slideRefs.current[i].style.display = "none";  
        }
        slideRefs.current[slideIndex].style.display = "block";  
    }
};

const plusSlides=(n) =>{
    showSlides(slideIndex+=n);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://proxy-ryan.vercel.app/cors?url=https://hakai-api.vercel.app/api/anilist/most-popular`);
        console.log(response)
        setAnimes(response.data.data.mostPopularAnimes || []);
      } catch (error) {
        alert('Error fetching data:', error);
      }
    };
  
    fetchData();
  
    
  }, []);


  useEffect(() => {
    showSlides(0)
    

  }, [animep]);
  

  

  return (
    <div className="slideshow-container">
          <div class="over"></div>
        {animep.map((anime,index) => (
        <Link key={anime.id} to={`/Watch/${anime.id}`}><div  ref={(ref) => (slideRefs.current[index] = ref)} className="mySlides fade">
          <div className="numbertext">{index+1} / {animep.length}</div>
          <img src={anime.poster} style={{ cursor:'pointer', width: '100%' ,height:'300px',objectFit:'cover'}} alt={anime.name} />
          <div className="text">{anime.name}</div>
        </div></Link>
      ))}
      <a className="prev" onClick={()=>plusSlides(-1)}>❮</a>
      <a className="next" onClick={()=>plusSlides(1)}>❯</a>
    </div>
  );
}

export default Slideshow;



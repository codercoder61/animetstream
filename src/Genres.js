import './Genres.css';
import React,{forwardRef,useRef,useState,useEffect} from 'react';
import Nav from './Nav'
import axios from 'axios'

const Genres = forwardRef((props, ref) => {
  const [genre,setGenre] = useState('Fantasy');
  const [animes,setAnimes] = useState([])
  useEffect(()=>{
    axios.get(`https://consume-mu.vercel.app/meta/anilist/advanced-search?genres/${genre}`)
      .then(response => {
        console.log(response.data)
        setAnimes(response.data.results)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },[genre])
  return (
    <>
      <Nav pp={props.hj} forwardedRef={ref}/>
      <div id="genres" style={{display:'flex',justifyContent:'space-around',width:'90%',margin:'30px auto'}}>
        <span onClick={()=>{setGenre('Fantasy')}}>Fantasy</span>
        <span onClick={()=>{setGenre('Action')}}>Action</span>
        <span onClick={()=>{setGenre('Horror')}}>Horror</span>
        <span onClick={()=>{setGenre('Drama')}}>Drama</span>
        <span onClick={()=>{setGenre('Romance')}}>Romance</span>
        <span onClick={()=>{setGenre('Psychological')}}>Psychological</span>
        <span onClick={()=>{setGenre('Mystery')}}>Mystery</span>
        <span onClick={()=>{setGenre('Thriller')}}>Thriller</span>
        <span onClick={()=>{setGenre('Comedy')}}>Comedy</span>
      </div>

    <div style={{display:'flex',flexWrap:'wrap'}}>
        {
          animes.map(anime=>{
            <div key={anime.id}>
              <img src={anime.image}/>
              <span>{anime.title.english}</span>
            </div>
          })
        }
    </div>
    </>
  );
});
export default Genres;

import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Overlay.css'
import { Link } from 'react-router-dom'
function Overlay(props) {
  const [query,setQuery] = useState('')
  const [animes,setAnimes] = useState([])
  const handleChange = (event)=>{
    setQuery(event.target.value)
  }

 
  useEffect(() => {
    const fetchSearchResults = async (episodeId) => {
      
      	
      try {
   
const response2 = await axios.post('https://proxy-production-ddb5.up.railway.app/fetch-url',{url:`https://anime-alpha-indol.vercel.app/api/v2/hianime/search?q=${query}`});
//console.log(response2.data.data.animes);
        console.log(response2)
setAnimes(response2.data.content.data.animes)
} catch (error) {
  console.error('Error fetching video sources:', error);
}}

fetchSearchResults()
  }, [query]);
  return (
    <div id="myOverlay" className="overlay">
        <span onClick={props.onClick} className="closebtn" title="Close Overlay">×</span>
        <div className="overlay-content">
          <form action="/action_page.php">
            <input id="se" value={query} onChange = {handleChange} type="text" placeholder="Search for anime..." name="search"/><br/>            
          </form>
          
        </div>
        <div id="results">
        {(query !== "" && animes && animes!=[] && animes.length > 0 )? (
              animes.map(anime => (
                <Link key={anime.id} onClick={()=>{props.onclick();props.spinnertrue()}} style={{textDecoration:'none'}} to={`/Watch/${anime.id}`}><div>
                  <img src={anime.poster} style={{witdh:'80px',height:'120px',borderRadius:'50%',objectFit:'cover'}} alt={anime.name}/>
                  <span>{anime.name.length>20?anime.name.slice(0,19)+'...':anime.name}</span>
                </div></Link>
              ))
            ) : (
              <div></div>
            )}
            </div>
      </div>)
      
}

export default Overlay

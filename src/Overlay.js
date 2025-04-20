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
    const options = {
      method: 'POST',
      url: 'https://http-cors-proxy.p.rapidapi.com/',
      headers: {
        'x-rapidapi-key': '2e4139dc3fmshfb131a66e36aa23p1bbef1jsncf62aca0e0bd',
        'x-rapidapi-host': 'http-cors-proxy.p.rapidapi.com',
        'Content-Type': 'application/json',
        Origin: 'https://animetstream.vercel.app/',
        'X-Requested-With': 'https://animetstream.vercel.app/'
      },
      data: {
        url: `https://anime-alpha-indol.vercel.app/api/v2/hianime/search?q=${query}`
      }
    }
const response2 = await axios.request(options);
//console.log(response2.data.data.animes);
setAnimes(response2.data.data.animes)
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

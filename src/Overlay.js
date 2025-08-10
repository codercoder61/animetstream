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
   
const response2 = await axios.post('https://soc-net.info/proxy.php/',{url:`https://hakai-api.vercel.app/api/anilist/search?q=${encodeURIComponent(query)}`});
//console.log(response2.data.data.animes);
        console.log(response2)
setAnimes(response2.data.content.data)
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
                <Link key={anime.anilistId} onClick={()=>{props.onclick();props.spinnertrue()}} style={{textDecoration:'none'}} to={`/Watch/${anime.anilistId}`}><div>
                  <img src={anime.image} style={{borderRadius:'50%',objectFit:'cover'}} alt={anime.title.english || anime.title.romaji|| anime.title.native}/>
                  <span>
  {(() => {
    const { english, romaji, native } = anime.title;
    const title = english || romaji || native || "";
    return title.length > 20 ? title.slice(0, 19) + "..." : title;
  })()}
</span>

                </div></Link>
              ))
            ) : (
              <div></div>
            )}
            </div>
      </div>)
      
}

export default Overlay

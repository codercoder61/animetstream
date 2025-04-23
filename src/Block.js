import React,{useState,useEffect} from 'react'
import './Block.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
function Block(props) {
  const [data, setData] = useState([]);
  const fetchData = async (url) => {
    await axios.get(url).then(dataa=>{
      console.log(dataa)
        setData(dataa.data.data.mostFavoriteAnimes);

    }).catch(error=>{
        console.log(error)
    });
      
    
  };

  const fetchData2 = async (url) => {
    await axios.get(url).then(dataa=>{
      console.log(dataa)
        setData(dataa.data.data.trendingAnimes);

    }).catch(error=>{
        console.log(error)
    });
      
    
  };

  const handleClick3 = ()=>{
        fetchData('https://proxy-ryan.vercel.app/cors?url=https://anime-alpha-indol.vercel.app/api/v2/hianime/home')
  }
  const handleClick4 = ()=>{
        fetchData2('https://proxy-ryan.vercel.app/cors?url=https://anime-alpha-indol.vercel.app/api/v2/hianime/home')
  }
  useEffect(() => {


    fetchData('https://proxy-ryan.vercel.app/cors?url=https://anime-alpha-indol.vercel.app/api/v2/hianime/home')
    
    
  }, []);
  return (
    <>
    

        <div id="div">
            <button onClick={handleClick3}>Trending</button>
            <button onClick={handleClick4}>Popular</button>
        </div>
        <div id="fetched">
                    {
            data.map((anime, index) => (
                <Link key={index} style={{textDecoration:'none'}} to={`/Watch/${anime.id}`}><div style={{display:'flex',flexDirection:'column',textAlign:'center'}} >
                <img src={anime.poster} alt={anime.name} />
<span>{(anime.name && anime.name.length>30)?anime.name.slice(0,30)+"...":anime.name}</span>
  

                </div></Link>
            ))
            }
        </div>
    </>
  )
}

export default Block

import React ,{forwardRef,useState,useEffect,useRef} from 'react'
import { Link, useParams } from 'react-router-dom';
//import Plyr from 'plyr';
import axios from 'axios'
import './Watch.css';
import Nav from './Nav'
import Cookies from 'js-cookie';
import Hls from 'hls.js';
//import videojs from 'video.js';
//import 'video.js/dist/video-js.css';
const pageSize = 10; // Number of items per page

const Watch = forwardRef((props, ref) => {
const [tracks,setTracks]=useState([])
const track = useRef(null);
  //const player = videojs('my-video');
  const playerRef = useRef(null);

	const fetchEpisodeSources = async (episodeId) => {
	setSpinner(true)
	//console.log(episodeId)	
	try {
   
const response2 = await axios.post('https://soc-net.info/proxy.php/', {
  url: `https://aniwatch-gilt.vercel.app/api/v2/hianime/episode/sources?animeEpisodeId=${episodeId}&server=hd-1&category=sub`
}, {
  headers: {
    'Content-Type': 'application/json'
  }
});


console.log(response2);
      const videoUrl = "https://zuhaw-proxy.vercel.app/?url="+response2.data.content.data.sources[0].url;
	//pl//

setTracks(response2.data.content.data.tracks)
//
		
    
      if (Hls.isSupported()) {
        let hls = new Hls({
  enableWorker: true,
  lowLatencyMode: true,
  maxBufferHole: 0.5, // default is 0.5s, tweak if needed
  maxSeekHole: 2,
  liveSyncDuration: 2,
});
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);
	hls.on(Hls.Events.ERROR, function (event, data) {
	console.error('HLS error', data);
	});
        setSpinner(false);
        
      } else {
        // Fallback to native video
        if (videoRef.current) {
          videoRef.current.src = videoUrl;
          videoRef.current.play().catch(err => console.error("Error trying to play the video:", err));
        }
      }
    } catch (error) {
      console.error('Error fetching video sources:', error);
    }
  };

	
const hlsRef = useRef(null);

let response 
let res
  let { animeId } = useParams();
        Cookies.set('lastWatchedAnime', animeId);
  //const videoRef = useRef(null);
//const player = new Plyr('#player', {
  //      captions: {active:true, update: true},
    //});

  const [animeid,setAnimeId] = useState(0)
  const defaultOptions = {};
  const [isLoading,setSpinner] = useState(true)
  const videoRef = useRef(null);
  const spinnerRef = useRef(null)
  const [title,setTitle] = useState('')
  const [poster,setPoster] = useState('')
	
  const [episodeNumber,setEpisodeNumber] = useState()
  const [totalEpisodes,setTotalEpisodes] = useState([])
  const [episodes,setEpisodes] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [totalPages, settotalPages] = useState(0);
  //const [totalEpisodes, settotalEpisodes] = useState();
  const [startIndex,setStartIndex] = useState(0)
  const [endIndex,setEndIndex] = useState(0)
  const [currentItems,setcurrentItems] = useState([])
  const [episodeId,setEpisodeId] = useState('')
  
  useEffect(()=>{
    if(isLoading){
      videoRef.current.style.display = "none"
      spinnerRef.current.style.display = "block"

    }else{
      videoRef.current.style.display = "block"
      spinnerRef.current.style.display = "none"

    }
  },[isLoading])
  useEffect(() => {
    async function fetchData() {
      res = await axios.get(`https://proxy-ryan.vercel.app/cors?url=https://aniwatch-gilt.vercel.app/api/v2/hianime/anime/${animeId}`);
    //console.log(res)
    setPoster(res.data.data.anime.info.poster)
    setTitle(res.data.data.anime.info.name)
    setEpisodeNumber(1)
    }
    fetchData();
  }, [animeId]); // Or [] if effect doesn't need props or state
 
  const spinnerTrue = ()=>{
    setSpinner(true)
  }
   const renderPagination = () => {
    const pages = [];
    // for (let i = 1; i <= totalPages; i++) {
    //   pages.push(
    //     <button className='btn_pag' key={i} onClick={() => handlePageChange(i)}>
    //       {i}
    //     </button>
    //   );
    // }
    return <>
    <button className='btn_pag'  onClick={() => handlePageChange(currentPage-1)}>
          <i class="fa-solid fa-arrow-left"></i>
        </button>
      <button className='btn_pag'  onClick={() => handlePageChange(currentPage+1)}>
      <i class="fa-solid fa-arrow-right"></i>
         </button>
    
    </>;
  };



  useEffect(() => {
    let isMounted = true;
    let hls;
  
    const fetchEpisodes = async () => {
      try {
        const episodesRes = await axios.get(`https://proxy-ryan.vercel.app/cors?url=https://aniwatch-gilt.vercel.app/api/v2/hianime/anime/${animeId}/episodes`);
        const episodeData = episodesRes?.data?.data?.episodes || [];
  
        if (!isMounted || episodeData.length === 0) return;
  
        setEpisodes(episodeData);
        setTotalEpisodes(episodeData.length);
  
        const episodeId = episodeData[0].episodeId;
  
     
	      const sourceRes = await axios.post(
  'https://soc-net.info/proxy.php/',
  { url: `https://aniwatch-gilt.vercel.app/api/v2/hianime/episode/sources?animeEpisodeId=${episodeId}&server=hd-1&category=sub` },
  { headers: { 'Content-Type': 'application/json' } }
);
  
        const sources = sourceRes?.data?.content?.data?.sources || [];
        const tracks = sourceRes?.data?.content?.data?.tracks || [];
  
        if (!isMounted || sources.length === 0) return;
  
        const videoUrl = "https://zuhaw-proxy.vercel.app/?url="+sources[0].url;
  
        // Initialize player if not already
        //
  
        // Handle subtitles
        setTracks(tracks);
  
       //
  
        // HLS support
        if (Hls.isSupported()) {
          hls = new Hls({
  enableWorker: true,
  lowLatencyMode: true,
  maxBufferHole: 0.5, // default is 0.5s, tweak if needed
  maxSeekHole: 2,
  liveSyncDuration: 2,
});
          hlsRef.current = hls;
          hls.loadSource(videoUrl);
          hls.attachMedia(videoRef.current);
	  hls.on(Hls.Events.ERROR, function (event, data) {
	  	console.error('HLS error', data);
	  });
        } else {
          if (videoRef.current) {
            videoRef.current.src = videoUrl;
            videoRef.current.play().catch(err =>
              console.error("Native video play error:", err)
            );
          }
        }
  
        setSpinner(false);
  
      } catch (err) {
        console.error('Error fetching episodes or video sources:', err);
        if (isMounted) setSpinner(false);
      }
    };
  
    fetchEpisodes();
  
    return () => {
      isMounted = false;
  
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      if (hls) {
        hls.destroy();
      }
    };
  }, [animeId]);
  
  useEffect(() => {
    if (totalEpisodes > 0) {
            if(currentPage<1){
        setCurrentPage(1)
      }
     
  
      if(currentPage>totalPages)
        {
          setCurrentPage(totalPages)
     
      }
     

      settotalPages(Math.ceil(totalEpisodes / pageSize));
      setStartIndex((currentPage - 1) * pageSize)
      
      setEndIndex(Math.min(startIndex + pageSize, totalEpisodes))
      setcurrentItems(episodes.slice(startIndex,endIndex))
    }
  }, [totalEpisodes,animeId,currentPage,startIndex,endIndex]);
  useEffect(()=>{
    console.log('Subtitle tracks:', tracks);
  },[tracks])






    const [visible,setVisible] = useState(true)
    const handleClick =()=>{
      setVisible(false)
    }
  return (
    <>

    <Nav pp={props.hj} forwardedRef={ref} spinner={spinnerTrue}/>
   {visible && <div style={{ position:'relative',justifyContent:'space-between', backgroundColor:'rgb(51, 50, 50)',color:'white', padding:'10px 10px'}} >
      <i className="fa-solid fa-hand-holding-dollar"></i> Support
      <span ><a target='_blank' style={{backgroundColor:'black',padding:'0px 10px',color:'white',textDecoration:'none',position:'absolute',right:'20px',marginRight:'10px'}} href='https://ko-fi.com/codercoder61'>Support</a><span 
  style={{cursor:'pointer',color:'white',position:'absolute',right:'10px',bottom:'8px',fontSize:'20px'}} onClick={handleClick}>X</span></span>
  </div>}
  <div className="containerr">
      
<video 
    controls
    preload="auto"
    src=""  
    ref={videoRef}
>
{tracks && tracks.map((track,index)=>{
  return (
    <track 
    key={index}
    kind= 'subtitles'
    src= {`/api/subtitle?url=${encodeURIComponent(track.file)}`}
    label={track.label}
    default={index === 0}  // make the first one default
    />
  )
})}
</video>
    

          <div ref={spinnerRef} className="spinner-container">
            <div className="spinner"></div>
          </div>

  
  <div id="episodeDetails">
    <div style={{display:'flex',flexDirection:'column',alignItems:'start'}}>
      {title?<span >{title}</span>:""}
      <span style={{color:'rgb(161,161,170'}}>Episode {episodeNumber} </span>
    </div>
  </div>
  
  
    <div id="eps" style={{marginTop:'20px',display:'flex',flexDirection:'column',flex:'1',alignItems:'center',flexWrap:'wrap',justifyContent:'center'}}>
    <div  style={{marginBottom:'20px'}}>
        {(totalPages>1 && totalEpisodes>10 )? renderPagination() : ""}
      </div>
      <div style={{display:'flex',flexWrap:'wrap',justifyContent:"center"}}>
    {
  currentItems.length > 0 ? (
    currentItems.map((episode) => (
      <div key={episode.id} onClick={()=>{fetchEpisodeSources(episode.episodeId);setEpisodeId(episode.id);setEpisodeNumber(episode.number);}} style={{display:'flex',flexDirection:'column'}}>
      <img style={{cursor:'pointer',borderRadius:'10px',marginRight:'15px',width:'150px',aspectRatio:'16/9',objectFit:'cover'}} src={poster} alt={episode.title ? episode.title:""} /><span style={{alignSelf:'start',color:'white'}}>{episode.title ? (episode.title.length>19 ? episode.title.slice(0, 16)+'...':episode.title) : "Episode "+episode.number}</span>
	</div>
    ))
  ) : (
    ""
  )
}
</div>
    </div>
  </div>

  
    </>
  )
})

export default Watch



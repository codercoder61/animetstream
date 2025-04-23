
import Watch from "./Watch";

import React ,{useEffect,useState} from 'react';
import { useRef, forwardRef, useImperativeHandle } from 'react';
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import Home from './Home.js'

function App() {
  const [formstate,setFormState] = useState(false)
  const handleClick = () => {
    setFormState(true)
    console.log(formstate)
  };
   const handleFalse = () => {
    setFormState(false)
    console.log(formstate)
  };
  const childRef = useRef(null);
   React.useEffect(() => {
    const handleClickOnRef = () => {
      if (childRef.current) {
        childRef.current.addEventListener('click', handleClick);
      }
    };

    handleClickOnRef();

    // Clean up event listener when component unmounts
    return () => {
      if (childRef.current) {
        childRef.current.removeEventListener('click', handleClick);
      }
    };
  }, []); // Run effect only once on mount
  return (
    <div className="App">

      <Routes>
        <Route exact path='/' element={<Home hj={handleClick} forwardedRef={childRef}/>} />
        <Route exact path='/Watch/:animeId' element={<Watch hj={handleClick} forwardedRef={childRef}/>} />
      </Routes>
      <Footer onclick={handleFalse} formstate={formstate} />
    </div>
  );
}

export default App;

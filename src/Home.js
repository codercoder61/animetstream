import Slideshow from "./Slideshow";
import Block from "./Block";
import React,{forwardRef,useRef} from 'react';
import Nav from './Nav'

const Home = forwardRef((props, ref) => {

  return (
    <>
      <Nav pp={props.hj} forwardedRef={ref}/>
      <Slideshow/>
      <Block/>
    </>
  );
});
export default Home;

import React, { useState } from "react";
import "./HomePage.css";
import {
  background1,
  background2,
  background3,
  background4,
} from "../../utils/importBackground";
import { useEffect } from "react";
let arr = [
    background1,
    background2,
    background3,
    background4,
  ];
  let text=[
    'CHETRANG DESIGNS',
    'SUBHAM DESIGNS',
    'KALWARDIN DESIGNS',
    'RANDOM DESIGNS',
  ]
const HomePage = () => {
  const [styles, setStyles] = useState({
    style: {
      backgroundImage: "",
    },
    rotate: 0,
    bgnum:0
  });
  const [rotateZ, setRotateZ] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
     
      let n = Math.floor(Math.random() * 4);
      setStyles(val=>{return{ 
        ...val, style:{...val.style, backgroundImage:`url(${arr[val.bgnum]})`}, rotate:val.rotate+180 , bgnum:(val.bgnum+1)%arr.length
       }});
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="main">
      <div
        className="core circle absolute-center"
        style={{
          transform: `translate(-50%,-50%) rotateZ(${styles.rotate}deg)`,
        }}
      >
        <InternalDiv styles={styles}/>
      </div>
      <div
        className="mantle circle absolute-center"
        style={{
          transform: `translate(-50%,-50%) rotateZ(${styles.rotate}deg)`,
        }}
      >
        <div className="internal-div absolute-center bg-black60" style={{zIndex:10000}}>sdgfdg</div>
        <InternalDiv styles={styles}/>
      </div>
      <div
        className="surface circle absolute-center"
        style={{
          transform: `translate(-50%,-50%) rotateZ(${styles.rotate}deg)`,
        }}
      >
        <InternalDiv styles={styles}/>
      </div>
      <div className="absolute-center text-container">
            <span className="invisible">Invisible text here</span>
        {text.map((data,index)=>{
            let opacity=0
            let top='100%'
            if(index===arr.length-1 && styles.bgnum===0){
                top='-50%'
            }
            else if(index===styles.bgnum){
                opacity=1
                top='50%'
            }
            else if(index<styles.bgnum){
                top='-50%'
            }
            else if(index===styles.bgnum+1){
                top='100%'
            }
            return(
                <span className="display-text"  style={{opacity:opacity, top:top}} key={"kuchv"+index}>{data}</span>
            )
        })}
      </div>
    </main>
  );
};

export default HomePage;

const InternalDiv=({styles})=>{
    return(
        <>
            {arr.map((data,index)=>{
            let opacity=0
            if(index===styles.bgnum){
                opacity=1
            }
            return (
                <div key={"random"+index}
          className="internal-div absolute-center"
          style={{ backgroundImage: `url(${arr[styles.bgnum]})` ,opacity:opacity }}
        ></div>
            )
        })}
        </>
    )
}
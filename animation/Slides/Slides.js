import React, { useState } from 'react'
import './Slides.css'
import {
    background1,
    background2,
    background3,
    background4,
    background5,
  } from "../../utils/importBackground";

const Slides = () => {
    const [selectedCard, setSelectedCard] = useState(-1)
    const [hoverCard, setHoverCard] = useState(-1)
    const [transformStyle, setTransformStyle] = useState({
        transform:"translateX(0%)",
        width:"5vw"
    })
  return (
    <div className='slide_container' style={{gap:"5vw"}}>
        {arr.map((data,index)=>{
            let styleCont={},styleCard={},hoverStyle={},spanOpacity=0

            if(hoverCard!==index && hoverCard!==-1)hoverStyle={opacity:0.2}
            if(hoverCard===index && selectedCard===-1)spanOpacity=1
            if(selectedCard!==-1){
                if(selectedCard!==index)styleCont={width:"5vw",height:"10vw",opacity:0}
                if(selectedCard===index){
                    
                    styleCard={transform:transformStyle.transform,zIndex:10000}
                    styleCont={width:transformStyle.width}
                }
                spanOpacity=0
            }
            return( 
                <div className="card" style={{...styleCard , ...hoverStyle }}
                        onMouseEnter={e=>mouseEnterCard(index,e,setHoverCard,selectedCard)}  
                        onMouseLeave={e=>mouseLeaveCard(index,e,setHoverCard,selectedCard)}
                        onClick={e=>onClickCard(e,index,setSelectedCard,setTransformStyle,selectedCard)}
                >
                    <div className="image_container"  style={{...styleCont}} >
                    {selectedCard!==-1 && <div className="close" onClick={e=>closeSelectedTab(e,setSelectedCard)}>X</div>}
                        <section className="background_image_ic" style={{backgroundImage:`url(${data['backgroundImage']})`}}></section>
                    </div>

                        <span style={{opacity:spanOpacity}} id={'child'+index}>{index+1}</span>
                </div>
            )
        })}
    </div>
  )
}

export default Slides

const arr=[
    {
        backgroundImage:background1
    },
    {
        backgroundImage:background2
    },
    {
        backgroundImage:background3
    },
    {
        backgroundImage:background4
    },
    {
        backgroundImage: background5
    },
]
const mouseEnterCard=(index,e,setHoverCard,selectedCard)=>{
    setHoverCard(val=>index)
    e.stopPropagation();
    if(selectedCard!==-1)return
    document.getElementById('child'+index).classList.add('load_up_text_animation')
}
const mouseLeaveCard=(index,e,setHoverCard)=>{
    e.stopPropagation();
    setHoverCard(val=>-1)
    document.getElementById('child'+index).classList.remove('load_up_text_animation')
}
const onClickCard =(e,index,setSelectedCard,setTransformStyle,selectedCard)=>{
    e.stopPropagation()
    let element=createCursorElement(e);
    console.log(e.target)
    e.target.append(element)
    setTimeout(function() {
        e.target.removeChild(element);
    }, 1200);
    if(selectedCard!==-1)return
    setSelectedCard(val=>index)
    setTransformStyle(val=>{return {transform:`translateX(${-index*(15)-(arr.length-index-1)*(5)}vw)`}})
                    setTimeout(()=>{
                        setTransformStyle(val=>{return {transform:`translateX(${-index*(15)-(arr.length-index-1)*(5)+40}vw)`,width:"90vw"}})  
                    },1000)
}
const closeSelectedTab=(e,setSelectedCard)=>{
    setSelectedCard(val=>-1)
}
function createCursorElement(e){
    let element=document.createElement('div')
    element.className='cursor_circle'
    const elementRect = e.target.getBoundingClientRect();
    const distanceFromTop = elementRect.top;
    const distanceFromLeft = elementRect.left;
    element.style.top=(e.clientY-distanceFromTop)+"px"
    element.style.left=(e.clientX-distanceFromLeft)+"px"
    return element
}
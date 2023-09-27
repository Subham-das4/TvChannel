import React, { useEffect, useState } from 'react'
import './LoginPage.css'
import {BiSolidUserCircle} from 'react-icons/bi'
import {MdLock} from 'react-icons/md'
import {PiEyeClosedFill , PiEyeFill} from 'react-icons/pi'
import SplitType from 'split-type'
import gsap from 'gsap'

const LoginPage = () => {
    const [formState, setFormState] = useState({
        showPassword:false,
        username:"",
        password:"",
        error:false
    })
    const onChangeHandler=(e)=>{
        let name= e.target.name 
        let value= e.target.value 
        setFormState(val=>{return{...val,[name]:value}})
    }
    useEffect(() => {
        fadeSplitTypeAnimation()
        displayFromRight()
        displayFromLeft()
      return () => {}
    }, [])
    
    const onSubmithandler=(e)=>{
        e.preventDefault();
        if(formState.username===''){
            setFormState(val=>{return{...val,error:true}})
            setTimeout(() => {
                setFormState(val=>{return{...val,error:false}})
            }, 750);
            return
        }
    }
  return (
    <div className="login_container">
        <section className='login_section'>
            <h3 className='fade_from_right'>Hello, User!</h3>
            <span className='fade_from_right'>Sign in to your account</span>
            <form onSubmit={e=>onSubmithandler(e)} >
                <section className={(formState.error?"error-shadow":"box-shadow")}>
                    <span> <BiSolidUserCircle className='input-icon' fill='#3E187A'  /></span>
                    <input type="text" placeholder='Username' name="username" value={formState.username}  onChange={e=>onChangeHandler(e)} />
                </section>
                <section className='box-shadow'>
                    <span><MdLock className='input-icon' fill='#3E187A' /></span>
                    <input type={formState.showPassword?"text":"password"} name="password" value={formState.password} onChange={e=>onChangeHandler(e)} placeholder='Password' />
                    {formState.showPassword? 
                    <span className='eye' onClick={e=>changeEyeState(setFormState)} ><PiEyeFill className='input-icon' fill='#3E187A' /></span> : 
                    <span className='eye' onClick={e=>changeEyeState(setFormState)} ><PiEyeClosedFill className='input-icon ' fill='#3E187A' /></span>
                    }
                </section>
                <section>
                    <button type="submit">Sign in</button>
                </section>
            </form>
            <section className='rights_span fade_from_left'> &copy; 1996 - 2023 InfyTV.  All Rights Reserved. </section>
        </section>
        <section className='text_section'>
            <h2 className='fade_from_right'>Welcome Back!</h2>
            <p className='fade_split_type'>We invite you to embark on an extraordinary journey through the captivating world of television. As a premier destination for all things entertainment, we are dedicated to providing you with an unparalleled viewing experience that transcends boundaries and enriches your life.
            </p>
            <span className='family_signature fade_from_left' >~ Infy Family</span>
        </section>
    </div>
  )
}

export default LoginPage

const changeEyeState=(setFormState)=>{
    setFormState(val=>{
        return {
            ...val , showPassword: !val.showPassword
        }
    })
}

const fadeSplitTypeAnimation=()=>{
    let splitTypes= document.querySelectorAll('.fade_split_type')
    
    splitTypes.forEach(type=>{
        let text = new SplitType(type,2, {types:'chars'})
        gsap.from(text.chars,{
            opacity:0,
            stagger:0.025,
            duration:0.025
        })
    })
}
const displayFromRight=()=>{
    let splitTypes= document.querySelectorAll('.fade_from_right')
    
    splitTypes.forEach(type=>{
        let text = new SplitType(type, {types:'chars'})
        gsap.from(text.chars,{
            x:-10,
            opacity:0,
            stagger:0.025,
            duration:0.5
        })
    })
}
const displayFromLeft=()=>{
    let splitTypes= document.querySelectorAll('.fade_from_left')
    
    splitTypes.forEach(type=>{
        let text = new SplitType(type, {types:'chars'})
        gsap.from(text.chars,{
            x:10,
            opacity:0,
            stagger:0.025,
            duration:0.5
        })
    })
}
import React,{useState} from 'react'

import styled from "styled-components";


//-------Styles--------
const InputOuterBorder = styled.div`
    position: relative;
    background: linear-gradient(140deg, rgb(161,140,209), rgb(251,194,235));
    background-size: 100%;
    padding: 3px;
    border-radius: 23px;
`
const InputInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #F3F3F3;
  /* border-radius: 20px; */
  transition: all 0.1s ease;
  border-radius: 23px;
`

const Placeholder = styled.span`
    position: absolute;
    letter-spacing: 1px;
    font-size: 19px;
    opacity: 0.4;
    padding: 2px 5px;
    transform: translateY(-50%);
    top: 50%;
    left: 15%;
    transition: all .5s;
    border-radius: 5px;
`

const StyledInput = styled.input`
    padding: 10px 15px;
    font-size: 20px;
    width: 100%;
    position: relative;
    background-color: transparent;
    border:transparent;
    z-index: 2;
    color:#959595;
    &:focus{
        outline: none;
    }
    &:focus ~ ${Placeholder}{
        transform: scale(0.90) translateY(-160%) translateX(-28%);
        background: white;
        opacity: 1;
        color:rgba(0, 0, 0, 0.6);
    }
    &:focus ~ ${InputInner}{
        background: white;
        width: 98%;
        height: 91%;
    }
`



function Input(props) {
const [isFilled, setIsFilled] = useState(false)


  const handleOnInput = (e)=> {
          if(e.target.value.length > 0){
            setIsFilled(true)
         }else if(e.target.value.length < 1){
             setIsFilled(false)
         }
  }
    
  const placeholderStyle = {
      filled: {
        transform: "scale(0.90) translateY(-160%) translateX(-28%)",
        background: "white",
        opacity: 1,
        color:"rgba(0, 0, 0, 0.6)"
      },
      notFilled: {
        transform: 'translateY(-50%)',
        background: "transparent",
        opacity: 0.4,
      }
  }
  const inputStyle = {
      filled: {
        background: "white",
        width: "98%",
        height: '91%'
      },
      notFilled: {
        width: "100%",
        height: "100%",
        background: '#F3F3F3'
      }
  }

  function onFocusOut(e){
    
    if(e.target.value.length > 0){
      setIsFilled(true)
   }else if(e.target.value.length < 1){
       setIsFilled(false)
   }
  }
    return (
        <InputOuterBorder>
                <StyledInput onBlur={(e)=> onFocusOut(e)} tabIndex={props.tabIndex} onKeyPress={props.onKeyPress} name={props.name} onChange={props.onChange} onFocus={()=>setIsFilled(true)} onInput={(e)=> handleOnInput(e)} />
                <InputInner  style={isFilled ? inputStyle.filled : inputStyle.notFilled}/>
                <Placeholder style={isFilled ? placeholderStyle.filled : placeholderStyle.notFilled}>{props.placeholder}</Placeholder>
        </InputOuterBorder>
    )
}

export default Input;

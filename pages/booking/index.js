import React, {useEffect, useState} from 'react'

//-------Style--------
import styles from '../../styles/Booking.module.css'

import DrawerComponent from '../../components/DrawerComponent';
import Input from "../../components/input/Input"
import NextButton from "../../components/buttons/NextButton"
import Image from 'next/image'

//-------Date Picker--------
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { motion,AnimatePresence} from "framer-motion"


import { useRouter } from 'next/router';

const cards = [
    {title: "Manicure", id:1, image: "manicure.png" },
    {title: "Pedicure", id:2, image: "pedicure.png" },
    {title: "Treatment", id:3, image: "treatment.png" },
    {title: "Podiatry", id:4, image: "podiatry.png" },
]

const detailsFields = [
    {name:'name',placeholder:'Your name'},
    {name:'lastname',placeholder:'Your last name'},
    {name:'email',placeholder:'Your email'}
]


const Booking = () =>  {
    const router = useRouter()
    const query = router;
    const [proceed , setProceed] = useState(false);
    const [isFilled, setIsFilled] = useState({name:false, lastname:false, email:false, date:false, services:false, details: false, index:0})
    const [bookingDetails, setBookingDetails] = useState({
        name:"",
        lastname:"",
        email: "",
        date: "",
        services:[],
    })
    const [dateValue, setDateValue] = useState(null);
    const [bookingState, setBookingState] = useState(0)
    const steps = ['services', 'date', 'details'];
    
    
    useEffect(()=> {
        setIsFilled({...isFilled, [steps[bookingState]]:false})
      if(steps[bookingState] != ""){
          
      }

      if(bookingDetails.services.length > 0){
         setIsFilled({...isFilled, [steps[bookingState]]:true})
      }else{
          
      }
    },[bookingDetails])
    
    
    const handleBackButton = ()=> {
       setBookingState((state)=> state -1)
    }

    const handleInputFields = (e) => {
        const inputName = e.target.name;
        const value = e.target.value;
        setBookingDetails({...bookingDetails, [inputName]:value})
    }
   
    const handleInputFocusOut = (field, target) => {
        if(target.target.value != ""){
            setIsFilled({...isFilled, [field]:true, index:isFilled.index+1})
        }
        if(isFilled.index == 2){
            setProceed(true)
        }else{
            setProceed(false)
        }
    }
    
    const handleClearInputs = (field)=> {
        setIsFilled({...isFilled,[field]:false,  index:isFilled.index-1})
        setProceed(false)
        setBookingDetails({...bookingDetails, [field]:''})
    }
   
    const handleSelectServices =(e)=> {
        if(bookingDetails.services.includes(e.target.offsetParent.id)){
            setBookingDetails({...bookingDetails, services: bookingDetails.services.filter(function(service){
                return service !== e.target.offsetParent.id
            })})
        }else{
            const serviceSelected = e.target.offsetParent.id;
            const addService = bookingDetails.services.concat(serviceSelected);
            setBookingDetails({...bookingDetails, services: addService});
        }
        
    }

    const handleRemoveService = (serviceToRemove) => {
        setBookingDetails({...bookingDetails, services: bookingDetails.services.filter(function(service){
            return service !== serviceToRemove
        })})
        if(bookingDetails.services.length < 2){
            setBookingState(0)
        }
    }

    const handleGetDate = (value) => {
        setIsFilled({...isFilled,   date:true})
        setDateValue(value)
        setBookingDetails({...bookingDetails, date:value})
    }

    const handleNext = (state) => {
       if(isFilled[state]){
           setBookingState(()=> bookingState + 1)
       }else{
           console.log('cant proceed')
       }
    }
   
  
    return (
        <DrawerComponent 
        title="Book your session"
        animate={{height:"100%"}}
        initial={{height:"100%"}}
        childAnimate={{x:0}}
        childInitial={{x:1000}}
        childTransition={{duration:.5}}
        onClickBackButton={()=> handleBackButton()}
        >   
            {/* chosen services */}
            {bookingDetails.services.length > 0  ? 
                <p className={styles.bookingDetailsTittle}>Services</p>
            : null}

            <div className={styles.userInputs}>
                <div className={styles.servicesContainer}>
                    {bookingDetails.services.map((service,index)=> (
                        <div key={index} id={service} className={styles.serviceTag}>
                            {service}
                            <Image onClick={()=> handleRemoveService(service)} className={styles.tagXicon} src="/x-icon.svg" width="20px" height="20px"/>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Chosen Date */}
            {bookingDetails.date != "" ? 
                <>
                    <p className={styles.bookingDetailsTittle}>Date</p>
                    <div>{bookingDetails.date.getDate()}</div>
                </>
            : null}

                    <div>
                        {(() => {
                          switch (steps[bookingState]) {
                            ///   CHOOSE SERVICES
                            case 'services':
                              return (
                                <div className={styles.chooseService}>
                                <p>Pick the services you wish to book</p>
                               
                                <div className={styles.cards}>
                                    {cards.map((item)=> 
                                        <motion.div 
                                        className={`${styles.card} ${bookingDetails.services.includes(item.title) ? styles.cardSelected : null}`}
                                        id={`${item.title}`}
                                        accessKey={item.id} 
                                        exit={{opacity:0}} 
                                        key={item.id} 
                                        transition={{duration:0.2}}
                                        whileTap={{scale:0.96}}
                                        onTap={(e)=> handleSelectServices(e)}
                                        >
                                            <motion.span id={item.title} className={styles.cardImage} style={{backgroundImage:`url(/${item.image})`}}></motion.span>
                                            <h3 className={styles.cardTitle}>{item.title}</h3>
                                        </motion.div>
                                    )}
                                </div>
                                </div>
                              );

                             /// CHOSE DATE 
                            case 'date':
                              return (
                                <div className={styles.datePickerContainer}>
                                <p>Choose the date & time</p>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                     <MobileDateTimePicker
                                        value={dateValue}
                                       renderInput={(props) => <TextField {...props} />}
                                       label="Pick a date for your session"
                                       onChange={(newValue) => {
                                         handleGetDate(newValue);
                                       }}
                                     />
                                 </LocalizationProvider>
                                </div>
                              );

                               /// ENTER DETAIS 
                            case 'details':
                              return (
                                <div className={styles.bookingInputs}>
                                {/* ---UserDetails---- */}
                                   <p>Your details</p>
                                   {detailsFields.map((field)=> {
                                       let i=0;
                                      if(isFilled[field.name]){
                                          return (
                                            <>
                                               <div>{field.name}: {bookingDetails[field.name]}   -------------   <span onTouchEnd={()=>handleClearInputs(field.name)}>X</span></div> 
                                               <br/>
                                            </>
                                          )
                                      }else{
                                          return (
                                                <div className={styles.input}>
                                                    <Input tabIndex={i++} onChange={(value)=> handleInputFields(value)} onBlur={(target)=>handleInputFocusOut(field.name, target) } name={field.name} placeholder={field.placeholder}/>
                                                </div>
                                        )
                                     }
                                  })}
                              
                                   <button onTouchEnd={()=> console.log(bookingDetails)}>LOG</button>
                                </div>
                              );
                            default:
                              return null;
                          }
                        })()}
                    </div>
                    <NextButton onTouchEnd={()=> handleNext(steps[bookingState])} animate={proceed ? {x:-12} : {x:0}} initial={bookingDetails.services.length ? {x:[0,-12]} : null} transition={bookingDetails.services.length ? {duration:0.8, repeat:Infinity, ease: "linear"} : null}/>   {/*animate={bookingDetails.services.length ? {x:-12} : {x:0}} initial={bookingDetails.services.length ? {x:[0,-12]} : null} transition={bookingDetails.services.length ? {duration:0.8, repeat:Infinity, ease: "linear"} : null} */}
        </DrawerComponent>
    )
}

export default Booking;

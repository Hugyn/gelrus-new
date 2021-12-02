import React, {useEffect, useState} from 'react'

import { motion } from "framer-motion"
//-------Style--------
import styles from '../../styles/Booking.module.css'

//-------Components--------
import DrawerComponent from '../../components/DrawerComponent';


const Booking = () =>  {
    const [bookingStateIndex, setBookingStateIndex] = useState(1);
    const [service, setService] = useState({data:null, canProceed:false});
    const [date, setDateData] = useState({data:null, canProceed:false});
    const [userDetails, setUserDetails] = useState({data:null, canProceed:false});

    
    return(
        <DrawerComponent bookingSteps={<BookingSteps onClick={(t)=> console.log(t)} current={bookingStateIndex}/>} animate={{height:'100%'}}>
            {bookingStateIndex == 1 ?  
             <Service proceedOnClick={()=> setBookingStateIndex( bookingStateIndex + 1)} canProceed={service.canProceed}/> 
            : 
            bookingStateIndex == 2 ? 
            <Date canProceed={date.canProceed}/> 
            : 
            bookingStateIndex == 3 ? 
            <UserDetails canProceed={userDetails.canProceed}/> 
            : 
            null}
        </DrawerComponent>
    )
}

export default Booking;



const Service = (props) => {
    const [canProceed, setCanProceed] = useState(null);
    const [services, setServices] = useState([]);
    
    const cards = [
        {title: "Manicure", id:1, image: "manicure.png" },
        {title: "Pedicure", id:2, image: "pedicure.png" },
        {title: "Treatment", id:3, image: "treatment.png" },
        {title: "Podiatry", id:4, image: "podiatry.png" },
    ]
    
   const handleServices = (item) => {
        setServices([...services, item]);
    }
    
    useEffect(()=> {
        services.length  > 0 ? setCanProceed(true)  : setCanProceed(false)
    },[services])

    return (
         <>
            <div>choose Service</div>
            <div className={styles.cards}>
                {cards.map((item)=> 
                    <motion.div 
                        className={`${styles.card}`}
                        id={`${item.title}`}
                        accessKey={item.id} 
                        exit={{opacity:0}} 
                        key={item.id} 
                        transition={{duration:0.2}}
                        whileTap={{scale:0.96}}
                        onClick={()=> handleServices(item.title)}
                    >
                        <motion.span id={item.title} className={styles.cardImage} style={{backgroundImage:`url(/${item.image})`}}></motion.span>
                        <h3 className={styles.cardTitle}>{item.title}</h3>
                    </motion.div>
                )}
            </div>
            
            {canProceed ? 
                <button onClick={props.proceedOnClick}>Next</button> 
                : 
                null
            }
         </>
     )
 }

 const Date = (props) => {
    
    return(
        <div>choose Date</div>
    )
}


const UserDetails = (props) => {
    return(
        <div>Enter Details</div>
    )
}


const BookingSteps = (props) => {
    const steps = [1, 2, 3];
    return(
        <div className={styles.bookingStepsContainer}>
            {steps.map((_i, step)=> (
                <div onClick={props.onClick} key={_i} className={`${styles.step} ${ props.current >= _i ? styles.active : null}`}>
                    {step}
                </div>
                )
            )}
        </div>
    )
}
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useBetween } from 'use-between'
import { motion } from "framer-motion"

//-------Style--------
import styles from '../../styles/Booking.module.css'

//-------Components--------
import DrawerComponent from '../../components/DrawerComponent';
import NextButton from '../../components/buttons/NextButton'

//-------Date--------
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import CalendarPicker from '@mui/lab/CalendarPicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


const cards = [
    {title: "Manicure", id:1, image: "manicure.png"},
    {title: "Pedicure", id:2, image: "pedicure.png"},
    {title: "Treatment", id:3, image: "treatment.png"},
    {title: "Podiatry", id:4, image: "podiatry.png"},
]


const ComponentStates = () => {
    const [services, setServices] = useState([]);

    return {
      services, setServices
    };
};

const useSharedState = () => useBetween(ComponentStates);



const Booking = (props) =>  {
    const router = useRouter();
    const [bookingStateIndex, setBookingStateIndex] = useState(1);

    const {services} = useSharedState();

    useEffect(() => {
        
    },[]);

    const handleBookingState = (target) => {
        setBookingStateIndex(target.target.id)
    }

    const handleNextBookingState = () => {
        if(router.query.book == "services" && services.length > 0){
           setBookingStateIndex(()=> bookingStateIndex <= 3 ? bookingStateIndex + 1 : null);
        }
    }

    return (
        <DrawerComponent breadcrumb={<BookingSteps onClick={(target)=> handleBookingState(target)} current={bookingStateIndex}/>} animate={{height:'100%'}}>
            {bookingStateIndex == 1 ?  
            <Service proceedOnClick={()=> proceedOnClick()}/> 
            : 
            bookingStateIndex == 2 ? 
            <Date /> 
            : 
            bookingStateIndex == 3 ? 
            <UserDetails /> 
            : 
            null}
            <NextButton onClick={()=> handleNextBookingState()}/>
        </DrawerComponent>
    )
}

export default Booking;



const Service = (props) => {
    const {services, setServices} = useSharedState();
    const router = useRouter();
    const queryString = "services";

    const handleServices = (item) => {
        //When press on card, add the product to the services array
        //if product does not exist in array add else remove product
        if(services && !services.includes(item)){
            setServices([...services, item])
            sessionStorage.setItem(queryString, JSON.stringify([...services,item]));
        } else {
            setServices(services.filter(function(service){
                return service !== item
            }))
            sessionStorage.setItem(queryString, JSON.stringify(services.filter(function(service){
                return service !== item
            })));
        }
    }
    

    useEffect(()=> {
        router.push({query: {book: queryString}})
        // Get session and store in the services state
        const servicesFromSession = JSON.parse(sessionStorage.getItem("services"));
        setServices(servicesFromSession || []);
        
    },[])
    
    
    return (
         <>
            <div>choose Service</div>
            <div className={styles.servicesPickContainer}>
                {services.map((service,index)=> (
                    <div onClick={()=> handleServices(service)} key={index} id={service} className={styles.serviceTag}>
                        <span>{service}</span>
                        <Image className={styles.tagXicon} src="/x-icon.svg" width="20px" height="20px"/>
                    </div>
                ))}
            </div>
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
         </>
     )
 }

 const Date = (props) => {
    const router = useRouter();
    const queryString = "date";
    const [date, setDate] = useState(null);
    const timesAvailiable = ["8:00", "9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"];

    async function get( ){
        const res = await fetch('http://localhost:3000/api/calendar')
        const posts = await res.json()
        return posts
    }

    useEffect(() => {
        router.push({query: {book: queryString}})
        var date = new window.Date();
        setDate(()=> date && date)

        // console.log(get())
    },[])

    return(
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
            </LocalizationProvider>

            <div className={styles.timesContainer}>
                {timesAvailiable.map((time ,_i)=> (
                    <div key={_i} className={styles.timeSlot}>{time}</div>
                ))} 
            </div>
            
        </>
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
            {steps.map((step, _i)=> (
                <div onClick={props.onClick} key={_i} id={step} className={`${styles.step} ${ props.current >= step ? styles.active : null}`}>
                    {step}
                </div>
                )
            )}
        </div>
    )
}

const ButtonProceed = (props) => {
    return (
        <div>

        </div>
    )
}
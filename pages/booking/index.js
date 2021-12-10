import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useBetween } from 'use-between'
import { motion } from "framer-motion"
import absoluteUrl from 'next-absolute-url'

//-------Style--------
import styles from '../../styles/Booking.module.css'

//-------Components--------
import DrawerComponent from '../../components/DrawerComponent';
import NextButton from '../../components/buttons/NextButton'

//-------Date--------
import LocalizationProvider from '@mui/lab/LocalizationProvider';
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
    const [date, setDate] = useState(null);

    return {
      services, setServices, date, setDate
    };
};

const useSharedState = () => useBetween(ComponentStates);



const Booking = (props) =>  {
    const router = useRouter();
    const steps = ['services', 'date', 'user_detais'];
    const {services, date} = useSharedState();
    

    useEffect(() => {
        const bookingStage = router.query.book
        if(services.length > 0 ){
            router.push({query: {book: "date"}})
        }else{
            router.push({query: {book: "services"}})
        }
    },[]);

    const handleBookingState = (target) => {
        console.log(steps[target.target.id-1])
        router.push({query:{book:[steps[target.target.id-1]]}})
    }

    const handleNextBookingState = () => {
        //Services
        if(router.query.book == 'services'){
            if(services.length > 0){
               router.push({query:{book: 'date'}})
            }else{
                alert('choose a service')
            }
        }
        if(router.query.book == 'date'){
            
        }
    }

    return (
        <DrawerComponent title="Book Now" breadcrumb={<BookingSteps onClick={(target)=> handleBookingState(target)} current={steps.indexOf(router.query.book)+1}/>} animate={{height:'82%'}}>
            {router.query.book == 'services' ?  
            <Service /> 
            : 
            router.query.book == 'date' ? 
            <Date /> 
            : 
            router.query.book == 'user_detais' ? 
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
                    <motion.div  key={`service_${index}`} animate={{opacity: 1}} initial={{opacity: 0}} onClick={()=> handleServices(service)} id={service} className={styles.serviceTag}>
                        <span>{service}</span>
                        <Image className={styles.tagXicon} src="/x-icon.svg" width="20px" height="20px"/>
                    </motion.div>
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
    // const { origin } = absoluteUrl(req, "localhost:3000")
    const {date, setDate} = useSharedState(null);
    const [loading, setLoading] = useState(false);
    const [timesBooked, setTimesBooked] = useState([]);
    const timesAvailiable = ["8:00", "9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"];

    useEffect(() => {
        router.push({query: {book: queryString}})
        var date = new window.Date();
        setDate(()=> date && date)
    },[])

    const handleGetBookings = (newDate) => {
        setLoading(true);
        // Get times availiable from dates
        setDate(newDate)
        const dateDay = ('0' + newDate.getDate()).slice(-2);
        const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
        const year = newDate.getFullYear();

        fetch(`/api/calendar?date=${year}-${month}-${dateDay}`)
        .then(response => {
            if(response.ok){
                return response.json()
            }
            throw response
        }).then(data => {
            setTimesBooked(data.timesBooked)
            setLoading(false);
            console.log(timesBooked)
        })
    }
    
    return(
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CalendarPicker date={date} onChange={(newDate) => handleGetBookings(newDate)} />
            </LocalizationProvider>
        
            <div className={styles.timesContainer}>
                {timesAvailiable.map((time ,_i)=> (
                    
                    <div key={_i} className={`${styles.timeSlot}`}>
                        {loading && loading ? <div className={styles.loading}></div> : null}
                        {time}
                    </div>
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
import React, {useEffect, useState, Fragment} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useBetween } from 'use-between'
import { motion, AnimatePresence} from "framer-motion"
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
import Input from '../../components/input/Input'


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
    const steps = ['services', 'date', 'user_details'];
    const {services, date} = useSharedState();
    
    const bookingStage = router.query.book;
    let innerHeight;
    
    useEffect(() => {
        innerHeight = window.innerHeight
        console.log(innerHeight)
        if(services.length > 0 ){
            router.push({query: {book: "date"}})
        }else{
            router.push({query: {book: "services"}})
        }
    },[]);

    const handleBookingState = (target) => {
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
            if(date){
                // console.log(date)
                router.push({query:{book: 'user_details'}})
            }else{
                alert('please choose time')
            }
        }
    }
    
    return (
        <Fragment>
        <DrawerComponent title="Book Now" breadcrumb={<BookingSteps date={date} onClick={(target)=> handleBookingState(target)} current={steps.indexOf(router.query.book)+1}/>} initial={{height:0}} animate={{height:'82%'}}>
            <AnimatePresence exitBeforeEnter>
                {bookingStage == 'services' ?  
                    <Service exit={{x:-300}} animate={{x:0}} initial={bookingStage == 'date' ? {x:300} : {x:-300}} transition={{stiffness:100, duration:0.5}}/> 
                : null}
            </AnimatePresence>

            <AnimatePresence >
                {bookingStage == 'date'  ? 
                    <Date exit={{x:300, opacity:0}} animate={{x:0}} initial={{x:300}} transition={{stiffness:100, duration:.4}}/> 
                : null}
            </AnimatePresence>

            <AnimatePresence exitBeforeEnter>
                {bookingStage == 'user_details' ? 
                <UserDetails /> 
                : null}
            </AnimatePresence>
            <NextButton text={bookingStage == 'user_details' ? 'CONFIRM BOOKING' : null} onClick={()=> handleNextBookingState()}/>
        </DrawerComponent>
        </Fragment>
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
        <motion.div exit={props.exit} transition={props.transition} initial={props.initial} animate={props.animate}>
            <motion.div>choose Service</motion.div>
            <div className={styles.servicesPickContainer}>
                {services.map((service,index)=> (
                    <motion.div key={`service_${index}`} exit={{opacity:0}} animate={{opacity: 1}} initial={{opacity: 0}} onClick={()=> handleServices(service)} id={service} className={styles.serviceTag}>
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
         </motion.div>
     )
 }

 const Date = (props) => {
    const router = useRouter();
    const queryString = "date";
    // const { origin } = absoluteUrl(req, "localhost:3000")
    const [dateObj, setDateObj] = useState(null);
    const [loading, setLoading] = useState(false);
    const {date, setDate} = useSharedState(null);
    const [timesBooked, setTimesBooked] = useState([]);
    const timesAvailiable = ["8:00", "9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"];

    useEffect(() => {
        router.push({query: {book: queryString}})
        var date = new window.Date();
        setDateObj(()=> date && date)
    },[])

    const handleGetBookings = (newDate) => {
        setDate(null)
        setLoading(true);
        // Get times availiable from dates
        setDateObj(newDate)
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
        })
    }

    const handleSelectDateAndTime = (time) => {
        setDate({time:time, date:dateObj})
        router.push({query:{book:'user_details'}})
    }

    return(
        <motion.div  exit={props.exit} transition={props.transition} initial={props.initial} animate={props.animate}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CalendarPicker date={dateObj} onChange={(newDate) => handleGetBookings(newDate)} />
            </LocalizationProvider>

            <div className={styles.timesContainer}>
                {timesAvailiable.map((time ,_i)=> (
                    <div onClick={()=> handleSelectDateAndTime(time)} key={_i} className={`${styles.timeSlot} ${timesBooked.includes(time) ? styles.booked : ""}`}>
                        {loading && loading ? <motion.div animate={{opacity:1}} initial={{opacity:0}} className={styles.loading}></motion.div> : null}
                        {time}
                    </div>
                ))} 
            </div>
            
        </motion.div>
    )
}


const UserDetails = (props) => {
    return(
        <Fragment>
            <Input placeholder="Name"/>
            <br/>
            <Input placeholder="Surname"/>
            <br/>
            <Input placeholder="Email"/>
            <br/>
            <Input placeholder="Confirm Email"/>
        </Fragment>
    )
}


const BookingSteps = (props) => {
    const steps = [1, 2, 3];
    return(
        <div className={styles.bookingStepsContainer}>
            {steps.map((step, _i)=> (
                <div>
                    <div onClick={props.onClick} key={_i} id={step} className={`${styles.step} ${ props.current >= step ? styles.active : null}`}>
                        {step}
                    </div>
                    <span>
                        {step == 1 ? props.services : step == 2 ? props.date : step == 3 ? props.user_details : null}
                    </span>
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
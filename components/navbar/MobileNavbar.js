import {useState, React, useEffect} from 'react'
import { useRouter } from 'next/router';

//-------Framer Motion--------
import { motion } from "framer-motion"

//-------Components--------
import BurgerMenu from './Burger';
import MenuItem from './MenuItem';

//-------Style--------
import styles from "./Navbar.module.css"


import Link from 'next/link'



//-------Motion--------
const MobileNavVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
  }



const spring = {
  type: "spring",
  stiffness: 200,
  damping: 30
};

const variants = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },  y: 0,
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    }
  };

const linksVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -90 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

  const navItems = [{name:"Home", link:"/"},
  {name:"Gelru's work", link: "gelrus-work"},
   {name:"Services & prices", link: "services"},
   {name:"Book a session", link:"booking"},
   {name: "About Gelru's", link:"about"},
   {name:'Contact', link:"contact"},
   {name: "Cancel Session", link:"cancel-booking"}];

function MobileNavbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    
    useEffect(()=> {
      if(isOpen){
        setIsOpen(false)
      }
    }, [router.asPath])

    return (
        <div className={styles.mobileNavbar}>
            <BurgerMenu action={()=> setIsOpen(!isOpen)}/>
            {/* <motion.div
            className={styles.mobileLogo}
            animate={isOpen ? "open" : "closed"}
            variants={logoVariants}
            transition={spring}
            > */}
              {/* <img src="/Logo.svg" alt="Gelru's Logo" width="100px"/> */}
            {/* </motion.div> */}
           {/* Navbar Links */}
            <motion.div
                className={styles.mobileNavLinksContainer}
                initial={"closed"}
                animate={isOpen ? "open" : "closed"}
                variants={MobileNavVariants}
                transition={spring}
            >
                <motion.div variants={variants} animate={isOpen ? "open" : "closed"}  className={styles.mobileNavLinksOuter}>
                  <img src="/Logo.svg" alt="Gelru's Logo" width="100px"/> 
                    {navItems.map((item,index)=> 
                        <MenuItem className={styles.mobileNavLinks} link={item.link}>
                            <motion.span key={`navlink_${index+1}`} variants={linksVariants}>{item.name}</motion.span>
                          </MenuItem>
                    )}
                </motion.div>
            </motion.div>
        </div>
    )
}


  

export default MobileNavbar;

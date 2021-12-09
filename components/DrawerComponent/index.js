import React from 'react'
import Image from 'next/image'
//-------Style--------
import styles from "./DrawerComponent.module.css";

//-------Framer Motion--------
import { motion, AnimatePresence } from "framer-motion"

import { Container } from '@material-ui/core';
import { useRouter } from 'next/router';


function DrawerComponent(props) {
  const router = useRouter()
    return (
      <AnimatePresence exitBeforeEnter>
            <Container key="DrwerComponent">
              <motion.h3 
              className={styles.title}
              animate={{opacity:1, x:20}}
              transition={{ ease: "easeOut", duration:1 }}
              >
                {props.title}
              </motion.h3>
              {props.breadcrumb}
            </Container>
            
            <motion.div 
            className={styles.bookNowContent}
            exit={props.childExit}
            animate={props.childAnimate}
            initial={props.childInitial}
            transition={props.childTransition}
            >
              <Container>
                {props.children}
              </Container>
            </motion.div>
        </AnimatePresence>
   
   
    );
}

export default DrawerComponent;

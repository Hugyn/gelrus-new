import React from 'react'
import Image from 'next/image'
//-------Style--------
import styles from "./BookNowComponent.module.css";

//-------Framer Motion--------
import { motion, AnimatePresence } from "framer-motion"

import { Container } from '@material-ui/core';
import { useRouter } from 'next/router';

import BackButton from '../buttons/BackButton';

function DrawerComponent(props) {
  const router = useRouter()
  console.log(router.pathname)
    return (
      <AnimatePresence exitBeforeEnter>
          <motion.div  onPan={props.onPan} className={styles.bookNowPage}
          initial={props.initial}
          animate={props.animate}
          transition={props.transition}
          exit={props.exit}
          >
            <BackButton onClick={props.onClickBackButton}/>

            <Container>
              <motion.h3 
              className={styles.title}
              animate={{opacity:1, x:20}}
              transition={{ ease: "easeOut", duration:1 }}
              >
                {props.title}
              </motion.h3>
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
          </motion.div>
        </AnimatePresence>
   
   
    );
}

export default DrawerComponent;

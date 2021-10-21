import React, { useState, useRef }  from 'react'

import { Scrollama, Step } from 'react-scrollama';

//-------Framer Motion--------
import { motion, useAnimation, useElementScroll } from 'framer-motion'

//-------Style--------
import styles from "./CirclesGuide.module.css"


//-------Animation--------    
const containerVariants = {
    hidden: {
        opacity: 0
    }, 
    visible: {
        opacity: 1,
        transition:{
            duration: 0.5
        } 
    },
}

const circleVariants = {
    hidden: {
        opacity: 0
    }, 
    visible: {
        opacity: 1,
        transition:{
            duration: 0.3
        } 
    },
}


function CirclesDesktop() {
    const controls = useAnimation();
    const [currentStepIndex, setCurrentStepIndex] = useState(null);
    const ref = useRef()
    const { scrollYProgress } = useElementScroll(ref)
    // This callback fires when a Step hits the offset threshold. It receives the
    // data prop of the step, which in this demo stores the index of the step.
    const onStepEnter = ( {data} ) => {
      setCurrentStepIndex(data);
    };

    controls.start((i)=> {
        switch(currentStepIndex){
            case i:
                return {opacity:1}
                break;
            default:
                return currentStepIndex >= i ? {opacity:1}: {opanicty:0}
        }   
    })

//  console.log(Math.round(scrollYProgress.current *100))
    return (

        <div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className={styles.circlesContainer}>
            <div style={{width:`${Math.round(scrollYProgress.current *100)+10}%`}} className={styles.progressBar}>&nbsp;</div>
            <div style={{ position: 'sticky', top:"0", zIndex: 2}}>
                <svg viewBox="0 0 1210 439" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* CONNECTIONS */}
                    <path d="M302.538 102.271C292.304 122.026 256.121 160.811 193.261 157.905C130.401 154.999 124.274 207.961 129.068 234.805" stroke="url(#paint3_linear)" strokeWidth="5"/>
                    <path d="M389 56.8525C410.774 61.2021 457.973 85.1714 472.571 146.252C487.17 207.333 539.649 198.56 564.065 186.539" stroke="url(#paint2_linear)" strokeWidth="5"/>
                    <path d="M672.124 147.139C690.847 159.159 726.113 198.779 717.397 261.099C708.681 323.42 760.848 334.426 788.02 332.139" stroke="url(#paint4_linear)" strokeWidth="5"/>
                    <path d="M908.426 363.147C929.258 355.462 972.151 324.439 977.065 261.83C981.98 199.222 1035.19 199.72 1061.17 207.795" stroke="url(#paint0_linear)" strokeWidth="5"/>
                    {/* Circles */}
                    <motion.circle variants={circleVariants} initial="hidden" animate={controls} custom={1} cx="80.6088" cy="257.939" r="65.0424" transform="rotate(-73.7965 80.6088 257.939)" fill="url(#paint8_linear)"/>
                    <motion.circle variants={circleVariants} initial="hidden" animate={controls} custom={2} cx="342.112" cy="80.6088" r="65.0424" transform="rotate(-73.7965 342.112 80.6088)" fill="url(#paint6_linear)"/>
                    <motion.circle variants={circleVariants} initial="hidden" animate={controls} custom={3} cx="614.636" cy="165.311" r="65.0424" transform="rotate(-73.7965 614.636 165.311)" fill="url(#paint5_linear)"/>
                    <motion.circle variants={circleVariants} initial="hidden" animate={controls} custom={4} cx="850.487" cy="347.422" r="65.0424" transform="rotate(39.3402 850.487 347.422)" fill="url(#paint7_linear)"/>
                    <motion.circle variants={circleVariants} initial="hidden" animate={controls} custom={5} cx="1123.34" cy="223.614" r="65.0424" transform="rotate(-155.221 1123.34 223.614)" fill="url(#paint1_linear)"/>
                    <defs>
                    <linearGradient id="paint0_linear" x1="909.082" y1="364.857" x2="1045.29" y2="207.438" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F4BEE9"/>
                    <stop offset="0.618379" stopColor="#A18CD1"/>
                    <stop offset="1" stopColor="#F9C1EA"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear" x1="1058.3" y1="223.614" x2="1188.38" y2="223.614" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A18CD1"/>
                    <stop offset="1" stopColor="#FBC2EB"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear" x1="389.381" y1="55.0617" x2="548.434" y2="189.363" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F4BEE9"/>
                    <stop offset="0.618379" stopColor="#A18CD1"/>
                    <stop offset="1" stopColor="#F6BFEA"/>
                    </linearGradient>
                    <linearGradient id="paint3_linear" x1="304.156" y1="103.135" x2="130.69" y2="218.972" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A18CD1"/>
                    <stop offset="1" stopColor="#F6BFEA"/>
                    </linearGradient>
                    <linearGradient id="paint4_linear" x1="673.134" y1="145.608" x2="772.406" y2="329.058" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A18CD1"/>
                    <stop offset="1" stopColor="#F6BFEA"/>
                    </linearGradient>
                    <linearGradient id="paint5_linear" x1="549.593" y1="165.311" x2="679.678" y2="165.311" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A18CD1"/>
                    <stop offset="1" stopColor="#FBC2EB"/>
                    </linearGradient>
                    <linearGradient id="paint6_linear" x1="277.07" y1="80.6088" x2="407.155" y2="80.6088" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A18CD1"/>
                    <stop offset="1" stopColor="#FBC2EB"/>
                    </linearGradient>
                    <linearGradient id="paint7_linear" x1="785.445" y1="347.422" x2="915.53" y2="347.422" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A18CD1"/>
                    <stop offset="1" stopColor="#FBC2EB"/>
                    </linearGradient>
                    <linearGradient id="paint8_linear" x1="15.5664" y1="257.939" x2="145.651" y2="257.939" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A18CD1"/>
                    <stop offset="1" stopColor="#FBC2EB"/>
                    </linearGradient>
                    </defs>
                </svg>
            </div>
            
                <Scrollama offset="0.8" onStepEnter={onStepEnter}>
                    {[1,2,3,4,5].map((stepIndex)=> (
                        <Step 
                        data={stepIndex}
                        key={stepIndex}
                        >
                            <div className={[styles.circleImages]}
                                style={{
                                    position: currentStepIndex === stepIndex ? "sticky" : "relative",
                                    top: currentStepIndex === stepIndex ? "10px" : "unset",
                                    opacity: currentStepIndex === stepIndex ? 0.4 : 0.3,
                                    transform: currentStepIndex === stepIndex ? "scale(1.2)" : "scale(1)"
                                }}
                            >
                                <img src="/podiatry.png"/>
                            </div>
                        </Step>
                    ))}
                </Scrollama>
                        
        </div>
       
        
    )
}

export default CirclesDesktop;
